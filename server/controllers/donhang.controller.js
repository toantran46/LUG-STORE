const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');
const { getNow } = require("../globals/globals");
const moment = require("moment/moment");
const { sendMail } = require("../globals/mailService");
const { mailHtml } = require("../globals/mailRender");

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page, action, TV_ID, SP_MA, status, searchBy } = req.query;
            if (action === 'check_order') {
                const sql = `SELECT COUNT(a.DH_MA) as total
                             FROM donhang A, chitietdonhang B 
                             WHERE A.TV_ID='${TV_ID}' AND A.DH_TRANGTHAI=3 AND A.DH_MA=B.DH_MA AND B.SP_MA='${SP_MA}'`;
                // console.log(sql);
                let data = await executeQuery(sql);
                return res.json({
                    // result: data,
                    available: data[0].total > 0 ? true : false,
                    message: 'Thành công'
                });
            }
            let searchCondition = '';
            if (searchBy) {
                searchCondition = ` AND ( A.DH_PHUONGTHUCTT LIKE '%${searchBy}%' OR B.TV_HOTEN LIKE '%${searchBy}%') `
            }
            let { filterDate } = req.query;
            filterDate = filterDate ? JSON.parse(filterDate) : '';
            let filterDateContition = ''
            if (filterDate) {
                filterDateContition = `AND A.DH_THOIGIANDAT BETWEEN '${moment(filterDate?.DON_HANG_TU_NGAY || '1-1-1970').format('YYYY-MM-DD') + ' 00:00:00'}' AND '${moment(filterDate?.DON_HANG_DEN_NGAY || moment()).format('YYYY-MM-DD') + ' 23:59:59'}'`
            }
            // console.log(req.query);
            const sql = `SELECT A.DH_MA ,A.DH_DIACHIGIAOHANG, A.DH_THOIGIANDAT, A.DH_TRANGTHAI, A.DH_TONGTIEN, A.DH_PHUONGTHUCTT, A.DH_GHICHU, A.DH_PHISHIP, B.TV_HOTEN, B.TV_EMAIL
                         FROM donhang A
                         LEFT JOIN thanhvien B ON A.TV_ID = B.TV_ID
                         WHERE 1=1
                         ${searchCondition}
                         ${filterDateContition}
                         ${action === 'get_order' ? ` AND A.TV_ID ='${TV_ID}'` : ''}
                         ORDER BY A.DH_TRANGTHAI ASC, A.DH_THOIGIANDAT DESC
            
            ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            // console.log(status)
            const donhangs = await executeQuery(sql);
            const sql_count = `SELECT COUNT(DH_MA) as total 
                               FROM donhang A 
                               WHERE 1=1
                               ${action === 'get_order' ? ` AND TV_ID ='${TV_ID}'` : ''}
                               ${status == 1 ? ` AND DH_TRANGTHAI =${status}` : ''}
            `;
            // console.log(sql_count)
            const data = await executeQuery(sql_count);
            // select chitietdonhang
            const processes = donhangs?.map((dh, idx) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const sql_detail = `SELECT A.DH_MA, A.CTDH_SOLUONG, A.CTDH_GIA, B.SP_MA, B.SP_TEN, C.HASP_DUONGDAN, D.MS_TENMAU
                        FROM chitietdonhang A , sanpham B, hinhanhsanpham C, mausac D
                        WHERE A.SP_MA = C.SP_MA AND A.MS_MAMAU = C.MS_MAMAU AND A.SP_MA = B.SP_MA AND A.MS_MAMAU = D.MS_MAMAU AND A.DH_MA ='${dh.DH_MA}'
                        GROUP BY A.SP_MA, A.MS_MAMAU`;
                        // console.log(sql_detail);
                        donhangs[idx].SAN_PHAM = await executeQuery(sql_detail);
                        resolve(true);
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });

            await Promise.all(processes);
            res.json({
                result: donhangs,
                totalRecords: data[0].total,
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!" })
        }
    },
    post: async (req, res) => {
        try {
            let { isMomoPayment, data } = req.body
            // console.log(Buffer.from(data, 'base64').toString('utf8'));
            const { TV_EMAIL, TV_SODIENTHOAI } = req.user?.data;
            let { CART, DH_DIACHIGIAOHANG, DH_GHICHU, DH_PHUONGTHUCTT, DH_TONGTIEN, TV_ID, DH_PHISHIP, DH_MA: dh_ma } = isMomoPayment ? JSON.parse(Buffer.from(data, 'base64').toString('utf8')) : req.body;
            const DH_MA = isMomoPayment ? dh_ma : randomString();
            CART = JSON.parse(CART);
            // console.log(CART);
            const DH_THOIGIANDAT = getNow();
            // trang thai 1: chờ xử lý, 2: đang vận chuyển, 3: đã nhận được hàng, 4: đã hủy
            const DH_TRANGTHAI = 1;
            const sql = `INSERT INTO donhang(DH_MA, TV_ID, DH_DIACHIGIAOHANG, DH_TRANGTHAI, DH_TONGTIEN, DH_PHUONGTHUCTT, DH_GHICHU, DH_THOIGIANDAT, DH_PHISHIP)
                VALUES('${DH_MA}', '${TV_ID}','${DH_DIACHIGIAOHANG}', '${DH_TRANGTHAI}', '${DH_TONGTIEN}', '${DH_PHUONGTHUCTT}', '${DH_GHICHU}', '${DH_THOIGIANDAT}', '${DH_PHISHIP}')`;
            // await executeQuery(sql);
            // console.log(sql)
            const processes = CART?.map(sp => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const sqlDetail = `INSERT INTO chitietdonhang(DH_MA,SP_MA, CTDH_SOLUONG, CTDH_GIA,MS_MAMAU, SP_GIANHAP) VALUES ('${DH_MA}','${sp.SP_MA}',${sp.CTDH_SOLUONG},${sp.CTDH_GIA},'${sp.MS_MAMAU}',${sp.SP_GIANHAP})`;
                        // await executeQuery(sqlDetail);
                        // console.log(sqlDetail);
                        resolve(true);
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });
            await Promise.all(processes);
            const orderInfo = {
                DH_MA: DH_MA,
                DH_TONGTIEN: DH_TONGTIEN,
                DH_PHISHIP: DH_PHISHIP,
                DH_PHUONGTHUCTT: DH_PHUONGTHUCTT,
                DH_DIACHIGIAOHANG: DH_DIACHIGIAOHANG,
                TV_SODIENTHOAI: TV_SODIENTHOAI,
                SAN_PHAM: CART,
            }
            await sendMail({
                to: TV_EMAIL, subject: '[LUG STORE]-Thông báo đặt hàng thành công tại LUG STORE', html: mailHtml(orderInfo)
            })
            res.json({ message: 'Thêm đơn hàng thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDdonhang } = req.params;
            const { DH_TRANGTHAI } = req.body;
            const isExist = await checkIsExist('donhang', 'DH_MA', IDdonhang);
            if (!isExist) return res.status(400).json({ message: "đơn hàng không tồn tại." });

            const sql = `UPDATE donhang SET ? WHERE DH_MA = '${IDdonhang}'`;
            // console.log(sql)
            await executeUpdateQuery(sql, { DH_TRANGTHAI: DH_TRANGTHAI });

            res.json({ message: 'Cập nhật trạng thái đơn hàng thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDdonhang } = req.params;
            const isExist = await checkIsExist('donhang', 'DH_MA', IDdonhang);
            if (!isExist) return res.status(400).json({ message: "đơn hàng không tồn tại." });

            const sql = `DELETE FROM donhang WHERE DH_MA = '${IDdonhang}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa đơn hàng thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    payment: async (request, response) => {
        try {
            //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
            //parameters
            let { data } = request.query;
            data = JSON.parse(data);
            const IdDonHang = randomString();
            data = { ...data, DH_MA: IdDonHang }
            console.log(data);
            var accessKey = process.env.API_MOMO_ACCESSKEY;
            var secretKey = process.env.API_MOMO_SECRETKEY;
            var orderInfo = 'Thanh toán với Momo';
            var partnerCode = 'MOMO';
            var redirectUrl = 'http://localhost:3000/?redirectto=payment/success';
            var ipnUrl = 'http://localhost:5000';
            var requestType = "payWithMethod";
            var amount = data.DH_TONGTIEN;
            var orderId = IdDonHang;
            var requestId = orderId;
            var extraData = Buffer.from(JSON.stringify(data)).toString('base64');
            // var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
            var orderGroupId = '';
            var autoCapture = true;
            var lang = 'vi';

            // console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))

            //before sign HMAC SHA256 with format
            //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
            var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
            //signature
            const crypto = require('crypto');
            var signature = crypto.createHmac('sha256', secretKey)
                .update(rawSignature)
                .digest('hex');

            //json object send to MoMo endpoint
            const requestBody = JSON.stringify({
                partnerCode: partnerCode,
                partnerName: "LUG - BALO TÚI XÁCH",
                storeId: "MomoTestStore",
                requestId: requestId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: redirectUrl,
                ipnUrl: ipnUrl,
                lang: lang,
                requestType: requestType,
                autoCapture: autoCapture,
                extraData: extraData,
                orderGroupId: orderGroupId,
                signature: signature
            });
            //Create the HTTPS objects
            const https = require('https');
            const options = {
                hostname: 'test-payment.momo.vn',
                port: 443,
                path: '/v2/gateway/api/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
            }
            //Send the request and get the response
            const req = https.request(options, res => {
                res.setEncoding('utf8');
                res.on('data', (body) => {

                    response.json({
                        result: JSON.parse(body),
                    })

                });
            })
            req.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
            });
            req.write(requestBody);
            req.end();

        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}