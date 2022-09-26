const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT A.YT_MA, A.SP_MA, B.SP_TEN, B.SP_GIA, C.HASP_DUONGDAN 
                        FROM yeuthich A, sanpham B, hinhanhsanpham C
                        WHERE A.TV_ID = '${req.body.TV_ID}'
                        AND A.SP_MA = B.SP_MA
                        AND B.SP_MA = C.SP_MA
                        ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const yeuthichs = await executeQuery(sql);

            res.json({
                result: yeuthichs,
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!" })
        }
    },
    get: async (req, res) => {
        try {
            const { IDyeuthich } = req.params;
            const sql = `SELECT * FROM yeuthich WHERE YT_MA = '${IDyeuthich}'`;
            const yeuthichs = await executeQuery(sql);
            res.json({
                result: yeuthichs[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { SP_MA } = req.body;
            const YT_MA = randomString();

            const sql = `INSERT INTO yeuthich (YT_MA, TV_ID, SP_MA )
            VALUES('${YT_MA}', '${req.body.TV_ID}', '${SP_MA}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm yêu thích thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDyeuthich } = req.params;
            const isExist = await checkIsExist('yeuthich', 'YT_MA', IDyeuthich);
            if (!isExist) return res.status(400).json({ message: "yêu thích không tồn tại." });

            const sql = `UPDATE yeuthich SET ? WHERE YT_MA = '${IDyeuthich}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật yêu thích thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDyeuthich } = req.params;
            const isExist = await checkIsExist('yeuthich', 'YT_MA', IDyeuthich);
            if (!isExist) return res.status(400).json({ message: "yêu thích không tồn tại." });

            const sql = `DELETE FROM yeuthich WHERE YT_MA = '${IDyeuthich}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa yêu thích thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
}