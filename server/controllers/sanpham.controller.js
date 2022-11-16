const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');
const { getNow } = require('../globals/globals');
module.exports = {
    getAlls: async (req, res) => {
        try {
            let { _limit, _page } = req.query;
            let { filterBy, shortBy, searchBy, wishList } = req.query;
            // console.log(filterBy)
            // console.log(shortBy)
            filterBy = filterBy ? JSON.parse(filterBy) : {};
            shortBy = shortBy ? JSON.parse(shortBy) : '';
            let sql_filter = '';
            for (const [key, value] of Object.entries(filterBy)) {
                if (value?.length > 0) {
                    sql_filter += `AND ${key === 'MS_MAMAU' ? 'F' : 'A'}.${key} 
                    
                    ${key === 'SP_GIAGOC' ? `BETWEEN ${value[0]} AND  ${value[1]}` : `IN (${JSON.stringify(value).replace('[', '').replace(']', '')})`}  `
                }
            }

            let searchCondition = '';
            if (searchBy) {
                searchCondition = ` AND ( A.SP_TEN LIKE '%${searchBy}%' OR B.LSP_TENLOAI LIKE '%${searchBy}%' OR C.TH_TENTHUONGHIEU LIKE '%${searchBy}%') `
            }
            wishList = wishList ? JSON.parse(wishList) : ''
            let wishListCondition = ''
            if (wishList) {
                wishListCondition = `AND G.TV_ID = '${wishList.TV_ID}'`
            }
            // sql diem dg       AVG((E.BL_SOSAO,0)) AS DIEMTB
            const sql = `
                        SELECT A.SP_MA, A.LSP_MALOAI, A.TH_MATHUONGHIEU, A.SP_TEN, A.SP_GIABAN, A.SP_GIAGOC, A.SP_GIANHAP, A.SP_CHATLIEU, A.SP_KICHTHUOC, 
                        A.SP_SONGAN, A.SP_TINHNANG, A.SP_CANNANG, A.SP_NGAYTAO, B.LSP_TENLOAI, C.TH_TENTHUONGHIEU, D.HASP_DUONGDAN,G.YT_MA,COALESCE(AVG(E.BL_SOSAO),0) as DIEM_TB, COALESCE(SUM(F.CTMS_SOLUONG),0) as TONGSOLUONGKHO
                        FROM sanpham A 
                        LEFT JOIN loaisanpham B ON A.LSP_MALOAI = B.LSP_MALOAI
                        LEFT JOIN thuonghieu C ON A.TH_MATHUONGHIEU = C.TH_MATHUONGHIEU
                        LEFT JOIN (SELECT * FROM hinhanhsanpham GROUP BY SP_MA) as D ON A.SP_MA = D.SP_MA
                        LEFT JOIN binhluandanhgia E ON A.SP_MA = E.SP_MA
                        LEFT JOIN chitietmausac F ON A.SP_MA = F.SP_MA
                        LEFT JOIN yeuthich G ON A.SP_MA = G.SP_MA
                        WHERE 1=1
                        ${sql_filter}
                        ${searchCondition}
                        ${wishListCondition}
                        GROUP BY A.SP_MA 
                        ${shortBy ? `ORDER BY ${shortBy.fieldName} ${shortBy.fieldValue}` : ''}
                        ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            // console.log(sql);
            const sanphams = await executeQuery(sql);
            // ${filterBy ? 'AND A.' + filterBy + "='" + req.query[filterBy] + "' " : ''}
            //             ${filterBrand ? 'AND A.' + filterBrand + " IN (" + req.query[filterBrand]?.replace('[', '')?.replace(']', '') + ") " : ''}
            const sql_count = ` SELECT COUNT(SP_MA) as total 
                                FROM sanpham A
                                INNER JOIN loaisanpham B ON A.LSP_MALOAI = B.LSP_MALOAI
                                INNER JOIN thuonghieu C ON A.TH_MATHUONGHIEU = C.TH_MATHUONGHIEU
                                WHERE 1=1
                                `;
            const data = await executeQuery(sql_count);

            res.json({
                result: sanphams,
                totalRecords: data[0].total,
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!" })
        }
    },
    get: async (req, res) => {
        try {
            const { IDsanpham } = req.params;
            const sql = `
                        SELECT A.SP_MA, A.LSP_MALOAI, A.TH_MATHUONGHIEU, A.SP_TEN, A.SP_GIABAN, A.SP_GIAGOC,A.SP_GIANHAP, A.SP_CHATLIEU, A.SP_KICHTHUOC, 
                        A.SP_SONGAN, A.SP_TINHNANG, A.SP_CANNANG, A.SP_NGAYTAO, B.LSP_TENLOAI, C.TH_TENTHUONGHIEU, COALESCE(AVG(E.BL_SOSAO),0) as DIEM_TB
                        FROM sanpham A 
                        LEFT JOIN loaisanpham B ON A.LSP_MALOAI = B.LSP_MALOAI
                        LEFT JOIN thuonghieu C ON A.TH_MATHUONGHIEU = C.TH_MATHUONGHIEU
                        LEFT JOIN hinhanhsanpham D ON A.SP_MA = D.SP_MA
                        LEFT JOIN binhluandanhgia E ON A.SP_MA = E.SP_MA
                        WHERE A.SP_MA = '${IDsanpham}'`;
            // console.log(sql)
            const sanphams = await executeQuery(sql);

            const sql_anh = `SELECT * FROM hinhanhsanpham A, mausac B WHERE SP_MA='${IDsanpham}' AND A.MS_MAMAU = B.MS_MAMAU`;
            const anhsanphams = await executeQuery(sql_anh);
            const sql_mau = `SELECT * FROM chitietmausac WHERE SP_MA='${IDsanpham}'`;
            let mausanphams = await executeQuery(sql_mau);
            const mau = {}
            mausanphams.forEach(element => {
                mau[element.MS_MAMAU] = element.CTMS_SOLUONG
            })
            const chitietsp = {};
            anhsanphams.forEach(element => {
                chitietsp[element.MS_MAMAU] = {
                    tenmau: element.MS_TENMAU,
                    soluong: mau[element.MS_MAMAU],
                    duongdanhinh: [... (chitietsp[element.MS_MAMAU]?.duongdanhinh || []), element.HASP_DUONGDAN]
                }
            });
            let arraySP = [];
            for (const [key, value] of Object.entries(chitietsp)) {
                arraySP.push({
                    ...value,
                    mamau: key,
                });
            }
            // {
            //  IDmaudo: {
            //      tenmau: red,
            //       soluong: 123,
            //       duongdanhinh: []
            //  },
            //  IDmauvang: {
            //      tenmau: yellow,
            //       soluong: 123,
            //       duongdanhinh: []
            //  },
            //}
            sanphams[0].THONGTINSP = arraySP;

            res.json({
                result: sanphams[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { MALOAI, MATHUONGHIEU, TEN, GIAGOC, GIABAN, CHATLIEU, KICHTHUOC, SONGAN, CANNANG, TINHNANG } = req.body;
            let listFile = req.files.map((e) => e.path);
            let { ColorInfo } = req.body;
            ColorInfo = JSON.parse(ColorInfo);
            ColorInfo = ColorInfo?.map((data) => {
                const hinhanh = listFile.splice(0, data.soluonganh)
                return ({
                    ...data,
                    hinhanh
                })
            })
            // console.log(listFile)
            console.log(ColorInfo)
            console.log(req.body)
            // return
            const SP_MA = randomString();
            const CAPNHAT = getNow();
            const TRANGTHAI = 'Còn hàng';
            const sql = `INSERT INTO sanpham(SP_MA, LSP_MALOAI, TH_MATHUONGHIEU, SP_TEN, SP_GIAGOC, SP_GIABAN ,SP_CHATLIEU, SP_KICHTHUOC, SP_SONGAN, SP_CANNANG, SP_TINHNANG,SP_NGAYTAO,SP_TRANGTHAI)
            VALUES('${SP_MA}', '${MALOAI}','${MATHUONGHIEU}', '${TEN}', '${GIAGOC}','${GIABAN}', '${CHATLIEU}', '${KICHTHUOC}', '${SONGAN}', '${CANNANG}', '${TINHNANG}','${CAPNHAT}','${TRANGTHAI}')`;

            // console.log(sql);
            await executeQuery(sql);

            const processes = ColorInfo?.map(data => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const sql_insert_color = `INSERT INTO chitietmausac (SP_MA, MS_MAMAU, CTMS_SOLUONG) VALUES('${SP_MA}','${data.id}','${data.soluong}')`
                        await executeQuery(sql_insert_color);
                        const processes_sub = data.hinhanh?.map(e => {
                            return new Promise(async (resolve_sub, reject_sub) => {
                                try {
                                    const HASP_MAHINHANH = randomString();
                                    const sql = `INSERT INTO hinhanhsanpham(HASP_MAHINHANH,SP_MA,MS_MAMAU,HASP_DUONGDAN) VALUES('${HASP_MAHINHANH}','${SP_MA}','${data.id}','${e}')`
                                    await executeQuery(sql);
                                    resolve_sub(true);
                                } catch (error) {
                                    console.log({ error })
                                    reject_sub(error);
                                }
                            })
                        })
                        await Promise.all(processes_sub);
                        resolve(true);
                        console.log({ status: 'Done: ' + data })
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });

            await Promise.all(processes);
            res.json({ message: 'Thêm sản phẩm thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDsanpham } = req.params;
            const data = {
                SP_TEN: req.body.TEN, LSP_MALOAI: req.body.MALOAI, TH_MATHUONGHIEU: req.body.MATHUONGHIEU, SP_GIAGOC: req.body.GIAGOC,
                SP_CHATLIEU: req.body.CHATLIEU, SP_KICHTHUOC: req.body.KICHTHUOC, SP_CANNANG: req.body.CANNANG, SP_SONGAN: req.body.SONGAN,
                SP_TINHNANG: req.body.TINHNANG
            };
            // console.log(data);
            const isExist = await checkIsExist('sanpham', 'SP_MA', IDsanpham);
            if (!isExist) return res.status(400).json({ message: "sản phẩm không tồn tại." });

            const sql1 = `UPDATE sanpham SET ? WHERE SP_MA = '${IDsanpham}'`;
            await executeUpdateQuery(sql1, { ...data });

            let listFile = req.files.map((e) => e.path);
            let { ColorInfo } = req.body;
            ColorInfo = JSON.parse(ColorInfo);
            console.log(ColorInfo)
            ColorInfo = ColorInfo?.map((data) => {
                const hinhanh = listFile.splice(0, data.soluonganh - data.anhcu.length)
                return ({
                    ...data,
                    hinhanh: [...data.anhcu, ...hinhanh]
                })
            })
            console.log(ColorInfo)
            // console.log(listFile)
            // return;
            const DETELE_IMG_COLOR = req.body.DETELE_IMG_COLOR ? JSON.parse(req.body.DETELE_IMG_COLOR) : [];
            const sql = `DELETE FROM hinhanhsanpham WHERE SP_MA='${IDsanpham}'`;
            await executeQuery(sql);
            let colorDetete = [];
            const processes = ColorInfo?.map(data => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const sql_insert_color = `CALL checkExistColorInfo('${IDsanpham}','${data.id}',${data.soluong})`
                        // console.log(sql_insert_color)
                        await executeQuery(sql_insert_color);
                        colorDetete.push(`"${data.id}"`);
                        const processes_sub = data.hinhanh?.map(e => {
                            return new Promise(async (resolve_sub, reject_sub) => {
                                try {
                                    const HASP_MAHINHANH = randomString();
                                    const sql = `INSERT INTO hinhanhsanpham(HASP_MAHINHANH,SP_MA,MS_MAMAU,HASP_DUONGDAN) VALUES('${HASP_MAHINHANH}','${IDsanpham}','${data.id}','${e}')`
                                    await executeQuery(sql);
                                    resolve_sub(true);
                                } catch (error) {
                                    console.log({ error })
                                    reject_sub(error);
                                }
                            })
                        })
                        await Promise.all(processes_sub);
                        resolve(true);
                        const sql = `DELETE FROM chitietmausac WHERE SP_MA='${IDsanpham}' AND MS_MAMAU NOT IN (${colorDetete.join(',')})`;
                        await executeQuery(sql);
                        // console.log(sql)
                        console.log({ status: 'Done: ' + data })
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });

            await Promise.all(processes);

            res.json({ message: 'Cập nhật sản phẩm thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDsanpham } = req.params;
            const isExist = await checkIsExist('sanpham', 'SP_MA', IDsanpham);
            if (!isExist) return res.status(400).json({ message: "sản phẩm không tồn tại." });

            const sql = `DELETE FROM sanpham WHERE SP_MA = '${IDsanpham}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa sản phẩm thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}