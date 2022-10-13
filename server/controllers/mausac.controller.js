const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page, action, IDsanpham } = req.query;
            if (action == 'getAllColorByProductId') {
                const sql = `SELECT A.MS_MAMAU, B.MS_TENMAU, A.CTMS_SOLUONG FROM chitietmausac A
                             INNER JOIN mausac B ON A.MS_MAMAU = B.MS_MAMAU
                             WHERE SP_MA = '${IDsanpham}'`
                const colorArray = await executeQuery(sql);

                const processes = colorArray.map((sp, idx) => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const sql = `SELECT HASP_MAHINHANH,HASP_DUONGDAN FROM hinhanhsanpham WHERE SP_MA='${IDsanpham}' AND MS_MAMAU ='${sp.MS_MAMAU}' `
                            const anhsanphams = await executeQuery(sql);
                            colorArray[idx].hinhanh = anhsanphams;
                            resolve(true);
                        } catch (error) {
                            console.log({ error })
                            reject(error);
                        }
                    })
                });

                await Promise.all(processes);

                return res.json({
                    result: colorArray,
                    message: 'Success'
                });
            }
            const sql = `SELECT * FROM mausac ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const mausacs = await executeQuery(sql);
            // console.log(sql);
            const sql_count = `SELECT COUNT(MS_MAMAU) as total FROM mausac`;
            const data = await executeQuery(sql_count);

            res.json({
                result: mausacs,
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
            const { IDmausac } = req.params;
            const sql = `SELECT * FROM mausac WHERE MS_MAMAU = '${IDmausac}'`;
            const mausacs = await executeQuery(sql);
            res.json({
                result: mausacs[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { MS_TENMAU } = req.body;
            const MS_MAMAU = randomString();

            const sql = `INSERT INTO mausac (MS_MAMAU, MS_TENMAU)
            VALUES('${MS_MAMAU}', '${MS_TENMAU}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm màu sắc thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDmausac } = req.params;
            const isExist = await checkIsExist('mausac', 'MS_MAMAU', IDmausac);
            if (!isExist) return res.status(400).json({ message: "màu sắc không tồn tại." });

            const sql = `UPDATE mausac SET ? WHERE MS_MAMAU = '${IDmausac}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật màu sắc thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDmausac } = req.params;
            const isExist = await checkIsExist('mausac', 'MS_MAMAU', IDmausac);
            if (!isExist) return res.status(400).json({ message: "màu sắc không tồn tại." });

            const sql = `DELETE FROM mausac WHERE MS_MAMAU = '${IDmausac}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa màu sắc thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}