const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT * FROM nhacungcap ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const nhacungcaps = await executeQuery(sql);
            const sql_count = `SELECT COUNT(NCC_MA) as total FROM nhacungcap`;
            const data = await executeQuery(sql_count);

            res.json({
                result: nhacungcaps,
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
            const { IDnhacungcap } = req.params;
            const sql = `SELECT * FROM nhacungcap WHERE NCC_MA = '${IDnhacungcap}'`;
            const nhacungcaps = await executeQuery(sql);
            res.json({
                result: nhacungcaps[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { NCC_TEN, NCC_SODIENTHOAI, NCC_DIACHI } = req.body;
            const NCC_MA = randomString();

            const sql = `INSERT INTO nhacungcap(NCC_MA, NCC_TEN, NCC_SODIENTHOAI, NCC_DIACHI)
            VALUES('${NCC_MA}', '${NCC_TEN}','${NCC_SODIENTHOAI}', '${NCC_DIACHI}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm nhà cung cấp thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDnhacungcap } = req.params;
            const isExist = await checkIsExist('nhacungcap', 'NCC_MA', IDnhacungcap);
            if (!isExist) return res.status(400).json({ message: "nhà cung cấp không tồn tại." });

            const sql = `UPDATE nhacungcap SET ? WHERE NCC_MA = '${IDnhacungcap}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật nhà cung cấp thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDnhacungcap } = req.params;
            const isExist = await checkIsExist('nhacungcap', 'NCC_MA', IDnhacungcap);
            if (!isExist) return res.status(400).json({ message: "nhà cung cấp không tồn tại." });

            const sql = `DELETE FROM nhacungcap WHERE NCC_MA = '${IDnhacungcap}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa nhà cung cấp thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}