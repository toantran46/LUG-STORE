const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT * FROM nhanvien NV, chucvu CV
                         WHERE NV.CV_MA = CV.CV_MA
                        ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const nhanviens = await executeQuery(sql);
            // console.log(sql);
            const sql_count = `SELECT COUNT(NV_ID) as total FROM nhanvien NV, chucvu CV 
                                WHERE NV.CV_MA = CV.CV_MA`;
            const data = await executeQuery(sql_count);

            res.json({
                result: nhanviens,
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
            const { IDnhanvien } = req.params;
            const sql = `SELECT * FROM nhanvien WHERE NV_ID = '${IDnhanvien}'`;
            const nhanviens = await executeQuery(sql);
            res.json({
                result: nhanviens[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { CV_MA, NV_MATKHAU, NV_HOTEN, NV_GIOITINH, NV_NAMSINH, NV_DIACHI, NV_SODIENTHOAI } = req.body;
            const NV_ID = randomString();

            const sql = `INSERT INTO nhanvien(NV_ID, CV_MA, NV_MATKHAU, NV_HOTEN, NV_GIOITINH, NV_NAMSINH, NV_DIACHI, NV_SODIENTHOAI )
            VALUES('${NV_ID}','${CV_MA}', '${NV_MATKHAU}','${NV_HOTEN}','${NV_GIOITINH}','${NV_NAMSINH}','${NV_DIACHI}','${NV_SODIENTHOAI}')`;
            await executeQuery(sql);
            res.json({ message: 'Thêm nhân viên thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDnhanvien } = req.params;
            const isExist = await checkIsExist('nhanvien', 'NV_ID', IDnhanvien);
            if (!isExist) return res.status(400).json({ message: "nhân viên không tồn tại." });

            const sql = `UPDATE nhanvien SET ? WHERE NV_ID = '${IDnhanvien}'`;
            await executeUpdateQuery(sql, { ...req.body });

            res.json({ message: 'Cập nhật nhân viên thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDnhanvien } = req.params;
            const isExist = await checkIsExist('nhanvien', 'NV_ID', IDnhanvien);
            if (!isExist) return res.status(400).json({ message: "nhân viên không tồn tại." });

            const sql = `DELETE FROM nhanvien WHERE NV_ID = '${IDnhanvien}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa nhân viên thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    get_new_token: async (req, res) => {
        try {
            const { NV_ID } = req.user.data;
            const sql = `SELECT * FROM nhanvien a, chucvu b WHERE a.NV_ID='${NV_ID}' AND a.CV_MA = b.CV_MA`;
            const data = await executeQuery(sql);
            const token = await generateToken(data[0]);
            const refreshToken = await generateRefreshToken(data[0]);
            res.json({
                result: { token, refreshToken },
                message: 'Thành công'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Đã xảy ra lỗi! Hãy thử lại sau." })
        }
    },
}