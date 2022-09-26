const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT * FROM khuyenmai ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const khuyenmais = await executeQuery(sql);
            const sql_count = `SELECT COUNT(KM_MAKM) as total FROM khuyenmai`;
            const data = await executeQuery(sql_count);

            res.json({
                result: khuyenmais,
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
            const { IDkhuyenmai } = req.params;
            const sql = `SELECT * FROM khuyenmai WHERE KM_MAKM = '${IDkhuyenmai}'`;
            const khuyenmais = await executeQuery(sql);
            res.json({
                result: khuyenmais[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { KM_PHANTRAMKM } = req.body;
            const KM_MAKM = randomString();

            const sql = `INSERT INTO khuyenmai(KM_MAKM, KM_PHANTRAMKM, )
            VALUES('${KM_MAKM}', '${KM_PHANTRAMKM}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm khuyến mãi thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDkhuyenmai } = req.params;
            const isExist = await checkIsExist('khuyenmai', 'KM_MAKM', IDkhuyenmai);
            if (!isExist) return res.status(400).json({ message: "khuyến mãi không tồn tại." });

            const sql = `UPDATE khuyenmai SET ? WHERE KM_MAKM = '${IDkhuyenmai}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật khuyến mãi thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDkhuyenmai } = req.params;
            const isExist = await checkIsExist('khuyenmai', 'KM_MAKM', IDkhuyenmai);
            if (!isExist) return res.status(400).json({ message: "khuyến mãi không tồn tại." });

            const sql = `DELETE FROM khuyenmai WHERE KM_MAKM = '${IDkhuyenmai}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa khuyến mãi thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}