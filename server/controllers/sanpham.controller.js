const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');
const { getNow } = require('../globals/globals');
module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page, filterBy } = req.query;
            const { groupBy, tableName } = req.query;
            if (groupBy) {
                let sql;
                if (groupBy === 'GIA') {
                    sql = `SELECT MIN(SP_GIAGOC) AS GIA_TU, MAX(SP_GIAGOC) AS GIA_DEN FROM sanpham`;

                } else {
                    sql = `SELECT COUNT(A.SP_MA) as quantity, A.${groupBy} as id ${tableName ? ',B.' + (tableName === 'loaisanpham' ? 'LSP_TENLOAI' : tableName) + ' as label' : ' ,A.' + groupBy + ' as label'} 
                                FROM SAN_PHAM A${tableName ? ',' + tableName + ' B' : ''} 
                                ${tableName ? 'WHERE A.' + groupBy + '=B.' + groupBy : ''}
                                GROUP BY A.${groupBy}
                                    `;
                }

                // const sanphams = await executeQuery(sql);
                // return res.json({
                //     groupBy,
                //     result: sanphams,
                //     message: 'Thành công'
                // });
            }
            // console.log(req.query);
            // sql diem dg       AVG((E.BL_SOSAO,0)) AS DIEMTB
            const sql = `
                        SELECT A.SP_MA, A.LSP_MALOAI, A.TH_MATHUONGHIEU, A.SP_TEN, A.SP_GIABAN, A.SP_GIAGOC, A.SP_CHATLIEU, A.SP_KICHTHUOC, 
                        A.SP_SONGAN, A.SP_TINHNANG, A.SP_CANNANG, A.SP_TRANGTHAI, A.SP_NGAYTAO, B.LSP_TENLOAI, C.TH_TENTHUONGHIEU, D.HASP_DUONGDAN
                        FROM sanpham A 
                        LEFT JOIN loaisanpham B ON A.LSP_MALOAI = B.LSP_MALOAI
                        LEFT JOIN thuonghieu C ON A.TH_MATHUONGHIEU = C.TH_MATHUONGHIEU
                        LEFT JOIN hinhanhsanpham D ON A.SP_MA = D.SP_MA
                        LEFT JOIN binhluandanhgia E ON A.SP_MA = E.SP_MA
                        WHERE 1=1
                        ${filterBy ? 'AND A.' + filterBy + "='" + req.query[filterBy] + "' " : ''}
                        GROUP BY A.SP_MA 
                        ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            console.log(sql);
            const sanphams = await executeQuery(sql);
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
                        SELECT A.SP_MA, A.LSP_MALOAI, A.TH_MATHUONGHIEU, A.KM_MAKM, A.SP_TEN, A.SP_GIABAN, A.SP_GIAGOC, A.SP_CHATLIEU, A.SP_KICHTHUOC, 
                        A.SP_SONGAN, A.SP_TINHNANG, A.SP_CANNANG, A.SP_TRANGTHAI, A.SP_NGAYTAO, B.LSP_TENLOAI, C.TH_TENTHUONGHIEU, D.CTMS_MAMAU, AVG((E.BL_SOSAO,0)) AS DIEMTB
                        FROM sanpham A 
                        INNER JOIN loaisanpham B ON A.LSP_MA = B.LSP_MA
                        INNER JOIN thuonghieu C ON A.TH_MATHUONGHIEU = C.TH_MATHUONGHIEU
                        INNER JOIN chitietmausac D ON A.SP_MA = D.SP_MA
                        INNER JOIN binhluandanhgia E ON A.SP_MA = E.SP_MA
                        WHERE SP_MA = '${IDsanpham}'`;

            const sanphams = await executeQuery(sql);

            const sql_anh = `SELECT * FROM hinhanhsanpham WHERE SP_MA='${IDsanpham}'`;
            const anhsanphams = await executeQuery(sql_anh);
            sanphams[0].HASP_DUONGDAN = anhsanphams;

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
            const { MALOAI, MATHUONGHIEU, TEN, GIAGOC, CHATLIEU, KICHTHUOC, SONGAN, CANNANG, TINHNANG } = req.body;
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
            const sql = `INSERT INTO sanpham(SP_MA, LSP_MALOAI, TH_MATHUONGHIEU, SP_TEN, SP_GIAGOC, SP_CHATLIEU, SP_KICHTHUOC, SP_SONGAN, SP_CANNANG, SP_TINHNANG,SP_NGAYTAO,SP_TRANGTHAI)
            VALUES('${SP_MA}', '${MALOAI}','${MATHUONGHIEU}', '${TEN}', '${GIAGOC}', '${CHATLIEU}', '${KICHTHUOC}', '${SONGAN}', '${CANNANG}', '${TINHNANG}','${CAPNHAT}','${TRANGTHAI}')`;

            console.log(sql);
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
            console.log(data);
            const isExist = await checkIsExist('sanpham', 'SP_MA', IDsanpham);
            if (!isExist) return res.status(400).json({ message: "sản phẩm không tồn tại." });

            // const sql = `UPDATE sanpham SET ? WHERE SP_MA = '${IDsanpham}'`;
            // await executeUpdateQuery(sql, { ...req.body });

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

            const DETELE_IMG_COLOR = req.body.DETELE_IMG_COLOR ? JSON.parse(req.body.DETELE_IMG_COLOR) : [];
            const processes_remove = DETELE_IMG_COLOR?.map(data => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const sql = `DELETE FROM hinhanhsanpham WHERE MA_ANH='${data.id}'`;
                        await executeQuery(sql);
                        resolve(true);
                        console.log({ status: 'Done: ' + data.id })
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });

            console.log("removing ...")
            await Promise.all(processes_remove);
            console.log("Removing done.")


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