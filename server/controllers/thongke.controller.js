const { executeQuery } = require("../mysql");

module.exports = {
    thongkes: async (req, res) => {
        try {
            let result = {};
            const today = new Date().toJSON().slice(0, 10);
            const sql_array = [
                { sql: `SELECT COUNT(DH_MA) as total FROM donhang`, saveTo: 'TONGDH' },
                { sql: `SELECT COUNT(TV_ID) as total FROM thanhvien`, saveTo: 'TONGTV' },
                { sql: `SELECT SUM(DH_TONGTIEN) as total FROM donhang WHERE DH_TRANGTHAI != 4`, saveTo: 'TONGDOANHTHU' },
                { sql: `SELECT COALESCE(SUM(DH_TONGTIEN),0) as total FROM donhang WHERE DH_THOIGIANDAT BETWEEN '${today + ' 00:00:00'}' AND '${today + ' 23:59:59'}'  AND DH_TRANGTHAI != 3`, saveTo: 'DOANHTHUHOMNAY' },
            ]
            const processes = sql_array.map(item => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const data = await executeQuery(item.sql);
                        result[item.saveTo] = data;
                        resolve(true);
                        // console.log({ status: 'Done: ' + item.saveTo })
                    } catch (error) {
                        console.log({ error })
                        reject(error);
                    }
                })
            });
            await Promise.all(processes);
            res.json({
                result: {
                    TONGDH: result.TONGDH[0]?.total,
                    TONGTV: result.TONGTV[0]?.total,
                    TONGDOANHTHU: result.TONGDOANHTHU[0]?.total,
                    DOANHTHUHOMNAY: result.DOANHTHUHOMNAY[0]?.total,
                },
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!" })
        }
    },
    thongkedashboards: async (req, res) => {
        try {
            let { by } = req.query;
            // console.log(by)

            switch (by) {
                case 'day': {
                    groupBy = `DATE_FORMAT(A.DH_THOIGIANDAT,'%Y-%m-%d')`;
                    fieldName = `CONCAT('Ngày ',DATE_FORMAT(A.DH_THOIGIANDAT,'%d-%m-%Y'))`
                    break;
                }
                case 'week': {
                    groupBy = `CONCAT(YEAR(A.DH_THOIGIANDAT), '/', WEEK(A.DH_THOIGIANDAT))`;
                    fieldName = `CONCAT('Tuần ', WEEK(A.DH_THOIGIANDAT),'-',YEAR(A.DH_THOIGIANDAT) )`
                    break;
                }
                case 'month': {
                    groupBy = `YEAR(A.DH_THOIGIANDAT),MONTH(A.DH_THOIGIANDAT)`;
                    fieldName = `CONCAT('Tháng ',MONTH(A.DH_THOIGIANDAT),'-',YEAR(A.DH_THOIGIANDAT))`;
                    break;
                }
                case 'quater': {
                    groupBy = `YEAR(A.DH_THOIGIANDAT), QUARTER(A.DH_THOIGIANDAT)`;
                    fieldName = `CONCAT('Quý ',QUARTER(A.DH_THOIGIANDAT),'-',YEAR(A.DH_THOIGIANDAT) )`
                    break;
                }
                case 'year': {
                    groupBy = `YEAR(A.DH_THOIGIANDAT)`;
                    fieldName = `CONCAT('Năm ',YEAR(A.DH_THOIGIANDAT))`
                    break;
                }
            }

            const sql = `SELECT ${fieldName} as TEN_THONG_KE, SUM(B.CTDH_GIA) as DOANHTHU, SUM(B.SP_GIANHAP * B.CTDH_SOLUONG) as TIEN_VON
                         FROM donhang A, chitietdonhang B
                         WHERE A.DH_MA=B.DH_MA  
                               AND A.DH_TRANGTHAI != 4
                               GROUP BY ${groupBy}`
            // console.log(sql)
            const thongkedashboards = await executeQuery(sql);

            res.json({
                result: thongkedashboards,
                message: 'Success'
            });
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ message: "Error !!" })
        }
    },

}