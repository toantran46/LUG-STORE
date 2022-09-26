const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT * FROM diachithanhvien DCTV, thanhvien TV
                         WHERE DCTV.TV_EMAIL = TV.TV_EMAIL
                        ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const diachithanhviens = await executeQuery(sql);
            // console.log(sql);
            const sql_count = `SELECT COUNT(DCTV_MA) as total FROM diachithanhvien DCTV, thanhvien TV
                                WHERE DCTV.TV_MA = TV.TV_MA`;
            const data = await executeQuery(sql_count);

            res.json({
                result: diachithanhviens,
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
            const { IDdiachithanhvien } = req.params;
            const sql = `SELECT * FROM diachithanhvien WHERE DCTV_MA = '${IDdiachithanhvien}'`;
            const diachithanhviens = await executeQuery(sql);
            res.json({
                result: diachithanhviens[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { DCTV_TINH, TV_EMAIL, DCTV_HUYEN, DCTV_XA, DCTV_SONHA } = req.body;
            const DCTV_MA = randomString();

            const sql = `INSERT INTO diachithanhvien(DCTV_MA, TV_EMAIL, DCTV_TINH, DCTV_HUYEN, DCTV_XA, DCTV_SONHA )
            VALUES('${DCTV_MA}','${TV_EMAIL}','${DCTV_TINH}','${DCTV_HUYEN}','${DCTV_XA}','${DCTV_SONHA}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm địa chỉ thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDdiachithanhvien } = req.params;
            const isExist = await checkIsExist('diachithanhvien', 'DCTV_MA', IDdiachithanhvien);
            if (!isExist) return res.status(400).json({ message: "địa chỉ không tồn tại." });

            const sql = `UPDATE diachithanhvien SET ? WHERE DCTV_MA = '${IDdiachithanhvien}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật địa chỉ thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDdiachithanhvien } = req.params;
            const isExist = await checkIsExist('diachithanhvien', 'DCTV_MA', IDdiachithanhvien);
            if (!isExist) return res.status(400).json({ message: "địa chỉ không tồn tại." });

            const sql = `DELETE FROM diachithanhvien WHERE DCTV_MA = '${IDdiachithanhvien}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa địa chỉ thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}