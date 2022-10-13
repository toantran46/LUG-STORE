const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT * FROM thuonghieu ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const thuonghieus = await executeQuery(sql);
            // console.log(sql);
            const sql_count = `SELECT COUNT(TH_MATHUONGHIEU) as total FROM thuonghieu`;
            const data = await executeQuery(sql_count);

            res.json({
                result: thuonghieus,
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
            const { IDthuonghieu } = req.params;
            const sql = `SELECT * FROM thuonghieu WHERE TH_MATHUONGHIEU = '${IDthuonghieu}'`;
            const thuonghieus = await executeQuery(sql);
            res.json({
                result: thuonghieus[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { TH_TENTHUONGHIEU } = req.body;
            const TH_MATHUONGHIEU = randomString();

            const sql = `INSERT INTO thuonghieu (TH_MATHUONGHIEU, TH_TENTHUONGHIEU)
            VALUES('${TH_MATHUONGHIEU}', '${TH_TENTHUONGHIEU}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm thương hiệu thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDthuonghieu } = req.params;
            const isExist = await checkIsExist('thuonghieu', 'TH_MATHUONGHIEU', IDthuonghieu);
            if (!isExist) return res.status(400).json({ message: "thương hiệu không tồn tại." });

            const sql = `UPDATE thuonghieu SET ? WHERE TH_MATHUONGHIEU = '${IDthuonghieu}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật thương hiệu thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDthuonghieu } = req.params;
            const isExist = await checkIsExist('thuonghieu', 'TH_MATHUONGHIEU', IDthuonghieu);
            if (!isExist) return res.status(400).json({ message: "thương hiệu không tồn tại." });

            const sql = `DELETE FROM thuonghieu WHERE TH_MATHUONGHIEU = '${IDthuonghieu}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa thương hiệu thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}