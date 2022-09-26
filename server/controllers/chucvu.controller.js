const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT * FROM chucvu ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const chucvus = await executeQuery(sql);
            // console.log(sql);
            const sql_count = `SELECT COUNT(CV_MA) as total FROM chucvu`;
            const data = await executeQuery(sql_count);

            res.json({
                result: chucvus,
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
            const { IDchucvu } = req.params;
            const sql = `SELECT * FROM chucvu WHERE CV_MA = '${IDchucvu}'`;
            const chucvus = await executeQuery(sql);
            res.json({
                result: chucvus[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { CV_TEN, CV_DIENGIAI } = req.body;
            const CV_MA = randomString();

            const sql = `INSERT INTO chucvu(CV_MA, CV_TEN, CV_DIENGIAI )
            VALUES('${CV_MA}', '${CV_TEN}','${CV_DIENGIAI}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm chức vụ thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDchucvu } = req.params;
            const isExist = await checkIsExist('chucvu', 'CV_MA', IDchucvu);
            if (!isExist) return res.status(400).json({ message: "chức vụ không tồn tại." });

            const sql = `UPDATE chucvu SET ? WHERE CV_MA = '${IDchucvu}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật chức vụ thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDchucvu } = req.params;
            const isExist = await checkIsExist('chucvu', 'CV_MA', IDchucvu);
            if (!isExist) return res.status(400).json({ message: "chức vụ không tồn tại." });

            const sql = `DELETE FROM chucvu WHERE CV_MA = '${IDchucvu}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa chức vụ thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}