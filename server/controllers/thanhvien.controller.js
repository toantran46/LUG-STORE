const { executeQuery, checkIsExist, executeUpdateQuery } = require("../mysql");
var randomString = require('random-string');
const { generateToken, generateRefreshToken, hashString, compareString } = require("../globals/globals");

module.exports = {
    getAlls: async (req, res) => {
        try {
            const { _limit, _page } = req.query;
            const sql = `SELECT * FROM thanhvien ${(_page && _limit) ? ' LIMIT ' + _limit + ' OFFSET ' + _limit * (_page - 1) : ''}`;
            const thanhviens = await executeQuery(sql);
            // console.log(sql);
            const sql_count = `SELECT COUNT(TV_ID) as total FROM thanhvien`;
            const data = await executeQuery(sql_count);

            res.json({
                result: thanhviens,
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
            const { IDthanhvien } = req.params;
            const sql = `SELECT * FROM thanhvien WHERE TV_ID = '${IDthanhvien}'`;
            const thanhviens = await executeQuery(sql);
            res.json({
                result: thanhviens[0],
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    post: async (req, res) => {
        try {
            const { MATKHAU, TV_HOTEN, TV_GIOITINH, TV_DIACHI, TV_SODIENTHOAI, TV_AVATAR, TV_EMAIL } = req.body;
            const TV_ID = randomString();

            const isExist = await checkIsExist('thanhvien', 'TV_EMAIL', TV_EMAIL);
            if (isExist) return res.status(400).json({ message: "Email đã được sử dụng." });

            console.log(req.body);
            const avatarUrl = req.file?.path || TV_AVATAR;
            const MAT_KHAU_HASHED = await hashString(MATKHAU);
            const sql = `INSERT INTO thanhvien(TV_ID, TV_MATKHAU, TV_HOTEN, TV_GIOITINH, TV_DIACHI, TV_SODIENTHOAI, TV_AVATAR, TV_EMAIL )
                        VALUES('${TV_ID}','${MAT_KHAU_HASHED}','${TV_HOTEN}','${TV_GIOITINH}','${TV_DIACHI}','${TV_SODIENTHOAI}','${avatarUrl || ""}','${TV_EMAIL}')`;
            // console.log(sql);
            await executeQuery(sql);
            res.json({ message: 'Đăng kí thành viên thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    patch: async (req, res) => {
        try {
            const { IDthanhvien } = req.params;
            const isExist = await checkIsExist('thanhvien', 'TV_ID', IDthanhvien);
            if (!isExist) return res.status(400).json({ message: "thành viên không tồn tại." });

            let data = { ...req.body };
            const avatarUrl = req.file?.path;
            console.log(avatarUrl);
            // return;
            data = avatarUrl ? { ...data, TV_AVATAR: avatarUrl } : data

            console.log(data);

            const sql = `UPDATE thanhvien SET ? WHERE TV_ID = '${IDthanhvien}'`;
            console.log(sql);
            await executeUpdateQuery(sql, data);

            res.json({ message: 'Cập nhật thành viên thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    delete: async (req, res) => {
        try {
            const { IDthanhvien } = req.params;
            const isExist = await checkIsExist('thanhvien', 'TV_ID', IDthanhvien);
            if (!isExist) return res.status(400).json({ message: "thành viên không tồn tại." });

            const sql = `DELETE FROM thanhvien WHERE TV_ID = '${IDthanhvien}'`;
            await executeQuery(sql);

            res.json({ message: 'Xóa thành viên thành công.' });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    login: async (req, res) => {
        try {
            const { EMAIL, MATKHAU } = req.body;
            console.log(req.body);
            let user;
            let response;
            const isExist = await checkIsExist('thanhvien', 'TV_EMAIL', EMAIL)
            if (!isExist) {
                const isExist_employee = await checkIsExist('nhanvien', 'NV_EMAIL', EMAIL);
                if (!isExist_employee) return res.status(400).json({ message: "Tài khoản không tồn tại." });
                const sql = `SELECT * FROM nhanvien a, chucvu b WHERE a.NV_EMAIL='${EMAIL}' AND a.CV_MA = b.CV_MA`;
                console.log(sql);
                response = await executeQuery(sql);
            } else {
                const sql = `SELECT * FROM thanhvien WHERE TV_EMAIL='${EMAIL}'`;
                response = await executeQuery(sql);
            }
            user = response[0];
            console.log({ user });

            const isValid = await compareString(MATKHAU, user.MATKHAU)
            if (!isValid) return res.status(400).json({ message: `Email hoặc mật khẩu không chính xác.` });

            const token = await generateToken(user);
            const refreshToken = await generateRefreshToken(user);

            res.json({ message: 'Đăng nhập thành công.', result: { token, refreshToken } });
        }
        catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!!" })
        }
    },
    getMe: async (req, res) => {
        try {
            const { TV_ID, NV_ID } = req.user.data;
            const sql = TV_ID ? `SELECT * FROM thanhvien WHERE TV_ID='${TV_ID}'` : `SELECT * FROM nhanvien a, chucvu b WHERE a.NV_ID='${NV_ID}' AND a.CV_MA = b.CV_MA`;
            // console.log(sql)
            const data = await executeQuery(sql);
            res.json({
                result: data[0],
                message: 'Getme thành công'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Đã xảy ra lỗi! Hãy thử lại sau." })
        }
    },
    getNewToken: async (req, res) => {
        try {
            const { TV_ID } = req.body;
            const sql = `SELECT * FROM thanhvien WHERE TV_ID='${TV_ID}'`;
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
    userInfoLoginSocial: async (req, res) => {
        try {
            const { TV_HOTEN, TV_SODIENTHOAI, TV_EMAIL, TV_AVATAR, TV_LOAITAIKHOAN } = req.body;
            const isExist = await checkIsExist('thanhvien', `TV_LOAITAIKHOAN = 'google_mxh' OR TV_LOAITAIKHOAN = 'facebook_mxh' AND TV_EMAIL`, TV_EMAIL);
            let sql;
            if (isExist) {
                sql = `UPDATE thanhvien SET ? WHERE TV_LOAITAIKHOAN = 'google_mxh' OR TV_LOAITAIKHOAN = 'facebook_mxh' AND TV_EMAIL='${TV_EMAIL}'`;
                await executeUpdateQuery(sql, { TV_HOTEN, TV_SODIENTHOAI, TV_EMAIL, TV_AVATAR, TV_LOAITAIKHOAN });
            } else {
                const TV_ID = randomString();
                sql = `INSERT INTO thanhvien(TV_ID,TV_HOTEN, TV_SODIENTHOAI, TV_EMAIL, TV_AVATAR, TV_LOAITAIKHOAN) VALUES ('${TV_ID}','${TV_HOTEN}','${TV_SODIENTHOAI}','${TV_EMAIL}','${TV_AVATAR}','${TV_LOAITAIKHOAN}')`;
                await executeQuery(sql);
            }

            const sql_getInfo = `SELECT * FROM thanhvien WHERE TV_LOAITAIKHOAN = 'google_mxh' OR TV_LOAITAIKHOAN = 'facebook_mxh' AND TV_EMAIL='${TV_EMAIL}'`;
            const data = await executeQuery(sql_getInfo);
            const user = data[0];
            console.log({ sql_getInfo, user });
            const token = await generateToken(user);
            const refreshToken = await generateRefreshToken(user);

            res.json({ message: 'Lưu tài khoản thành công.', result: { token, refreshToken } });

        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Đã xảy ra lỗi! Hãy thử lại sau." })
        }
    },
}