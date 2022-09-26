const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT * FROM loaisanpham ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const loaisanphams = await executeQuery(sql);
            // console.log(sql);
            const sql_count = `SELECT COUNT(LSP_MALOAI) as total FROM loaisanpham`;
            const data = await executeQuery(sql_count);

            res.json({
                result: loaisanphams,
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
            const { IDloaisanpham } = req.params;
            const sql = `SELECT * FROM loaisanpham WHERE LSP_MALOAI = '${IDloaisanpham}'`;
            const loaisanphams = await executeQuery(sql);
            res.json({
                result: loaisanphams[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { LSP_TENLOAI } = req.body;
            const LSP_MALOAI = randomString();

            const sql = `INSERT INTO loaisanpham(LSP_MALOAI, LSP_TENLOAI, )
            VALUES('${LSP_MALOAI}', '${LSP_TENLOAI}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm loại sản phẩm thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDloaisanpham } = req.params;
            const isExist = await checkIsExist('loaisanpham', 'LSP_MALOAI', IDloaisanpham);
            if (!isExist) return res.status(400).json({ message: "loại sản phẩm không tồn tại." });

            const sql = `UPDATE loaisanpham SET ? WHERE LSP_MALOAI = '${IDloaisanpham}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật loại sản phẩm thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDloaisanpham } = req.params;
            const isExist = await checkIsExist('loaisanpham', 'LSP_MALOAI', IDloaisanpham);
            if (!isExist) return res.status(400).json({ message: "loại sản phẩm không tồn tại." });

            const sql = `DELETE FROM loaisanpham WHERE LSP_MALOAI = '${IDloaisanpham}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa loại sản phẩm thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}