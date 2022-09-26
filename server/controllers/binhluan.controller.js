const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT A.BL_MA, A.SP_MA, A.BL_NOIDUNG, A.BL_SOSAO, A.BL_THOIGIAN, B.TV_HOTEN, B.TV_AVATAR
                        FROM binhluan A, thanhvien B, sanpham C
                        WHERE B.TV_ID = '${req.body.TV_ID}'
                        AND A.SP_MA = C.SP_MA
                        ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            // console.log(sql);
            const binhluans = await executeQuery(sql);
            res.json({
                result: binhluans,
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!" })
        }
    },
    get: async (req, res) => {
        try {
            const { IDbinhluan } = req.params;
            const sql = `SELECT * FROM binhluan WHERE BL_MA = '${IDbinhluan}'`;
            const binhluans = await executeQuery(sql);
            res.json({
                result: binhluans[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { SP_MA, BL_SOSAO, BL_NOIDUNG, BL_THOIGIAN } = req.body;
            const BL_MA = randomString();

            const sql = `INSERT INTO binhluan (BL_MA, TV_ID, SP_MA, BL_SOSAO, BL_NOIDUNG, BL_THOIGIAN )
            VALUES('${BL_MA}', '${req.body.TV_ID}', '${SP_MA}', '${BL_SOSAO}', '${BL_NOIDUNG}', '${BL_THOIGIAN}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm bình luận thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDbinhluan } = req.params;
            const isExist = await checkIsExist('binhluan', 'BL_MA', IDbinhluan);
            if (!isExist) return res.status(400).json({ message: "bình luận không tồn tại." });

            const sql = `UPDATE binhluan SET ? WHERE BL_MA = '${IDbinhluan}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật bình luận thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDbinhluan } = req.params;
            const isExist = await checkIsExist('binhluan', 'BL_MA', IDbinhluan);
            if (!isExist) return res.status(400).json({ message: "bình luận không tồn tại." });

            const sql = `DELETE FROM binhluan WHERE BL_MA = '${IDbinhluan}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa bình luận thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}