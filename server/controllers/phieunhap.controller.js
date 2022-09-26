const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT A.PN_MA, A.NV_ID, B.NV_HOTEN, C.NCC_TEN, A.PN_TONGTIEN, A.PN_GHICHU
                        FROM phieunhap A, nhanvien B, nhacungcap C
                        WHERE  A.NV_ID = B.NV_ID
                                AND A.NCC_MA = C.NCC_MA
                        ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const phieunhaps = await executeQuery(sql);
            // console.log(sql);
            const sql_count = `SELECT COUNT(PN_MA) as total FROM phieunhap A, nhanvien B, nhacungcap C
                                WHERE  A.NV_ID = B.NV_ID
                                        AND A.NCC_MA = C.NCC_MA`;
            console.log(sql_count);
            const data = await executeQuery(sql_count);

            //CHI TIẾT PHIẾU NHẬP
            const processes = phieunhaps?.map((sp, idx) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const sql_detail = `SELECT A.SP_MA, A.CTN_SOLUONG, A.CTN_STONGTIEN, B.SP_TEN 
                                            FROM chitietphieunhap A , sanpham B
                                            WHERE A.SP_MA = B.SP_MA AND A.PN_MA='${sp.PN_MA}'`;
                        phieunhaps[idx].SAN_PHAM = await executeQuery(sql_detail);
                        resolve(true);
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });

            await Promise.all(processes);

            res.json({
                result: phieunhaps,
                records: data[0].total,
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!" })
        }
    },
    get: async (req, res) => {
        try {
            const { IDphieunhap } = req.params;
            const sql = `SELECT * FROM phieunhap A, chitietphieunhap B WHERE A.PN_MA = B.PN_MA AND PN_MA = '${IDphieunhap}'`;
            const phieunhaps = await executeQuery(sql);
            res.json({
                result: phieunhaps[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { TV_ID, NCC_MA, PN_TONGTIEN, PN_GHICHU } = req.body;
            const { SAN_PHAM } = req.body;
            const PN_MA = randomString();

            const sql = `INSERT INTO phieunhap (PN_MA, TV_ID, NCC_MA, PN_TONGTIEN, PN_GHICHU, )
            VALUES('${PN_MA}', '${TV_ID}', '${NCC_MA}', '${PN_TONGTIEN}', '${PN_GHICHU || ''}')`;
            await executeQuery(sql);

            //POST CHI TIET PHIEU NHAP
            const processes = SAN_PHAM?.map(sp => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const sql_detail = `INSERT INTO chitietphieunhap(PN_MA, SP_MA, CTN_TONGTIEN, CTN_SOLUONG, CTN_NGAYNHAP)
                                        VALUES ('${PN_MA}','${sp.SP_MA}','${sp.CTN_TONGTIEN}','${sp.CTN_SOLUONG}','${getNow()}')`;
                        await executeQuery(sql_detail);
                        console.log({ status: 'Done: ' + sp.SP_MA })
                        resolve(true);
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });
            console.log("detail ...")
            await Promise.all(processes);
            console.log("Save done.")

            res.json({ message: 'Thêm phiếu nhập thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDphieunhap } = req.params;
            const { SAN_PHAM } = req.body;
            const isExist = await checkIsExist('phieunhap', 'PN_MA', IDphieunhap);
            if (!isExist) return res.status(400).json({ message: "phiếu nhập không tồn tại." });

            const sql = `UPDATE phieunhap SET ? WHERE PN_MA = '${IDphieunhap}'`;
            await executeUpdateQuery(sql, { ...req.body });

            // remove old products
            const sql_remove = `DELETE FROM chitietphieunhap WHERE PN_MA='${IDphieunhap}'`;
            await executeQuery(sql_remove);
            console.log({ status: 'Removed.' })

            //update chitietphieunhap
            const processes = SAN_PHAM?.map(sp => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const sql_detail = `INSERT INTO chitietphieunhap(PN_MA,SP_MA, CTN_SOLUONG, CTN_TONGTIEN)
                            VALUES ('${IDphieunhap}','${sp.SP_MA}','${sp.CTN_SOLUONG}','${sp.CTN_TONGTIEN}')`;
                        await executeQuery(sql_detail);
                        console.log({ status: 'Done (add): ' + sp.SP_MA })
                        resolve(true);
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });
            console.log("detail ...")
            await Promise.all(processes);
            console.log("Saved.")

            res.json({ message: 'Cập nhật phiếu nhập thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDphieunhap } = req.params;
            const isExist = await checkIsExist('phieunhap', 'PN_MA', IDphieunhap);
            if (!isExist) return res.status(400).json({ message: "phiếu nhập không tồn tại." });

            const sql = `DELETE FROM phieunhap WHERE PN_MA = '${IDphieunhap}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa phiếu nhập thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}