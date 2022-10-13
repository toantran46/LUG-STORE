const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors')
const { conn } = require('./mysql');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 6000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', cors(), (req, res) => {
    res.send('Hello World!')
})

const khuyenmaiRouter = require('./routes/khuyenmai.route');
const thuonghieuRouter = require('./routes/thuonghieu.route');
const chucvuRouter = require('./routes/chucvu.route');
const loaisanphamRouter = require('./routes/loaisanpham.route');
const nhacungcapRouter = require('./routes/nhacungcap.route');
const diachithanhvienRouter = require('./routes/diachithanhvien.route');
const nhanvienRouter = require('./routes/nhanvien.route');
const mausacRouter = require('./routes/mausac.route');
const yeuthichRouter = require('./routes/yeuthich.route');
const binhluanRouter = require('./routes/binhluan.route');
const phieunhapRouter = require('./routes/phieunhap.route');
const thanhvienRouter = require('./routes/thanhvien.route');
const sanphamRouter = require('./routes/sanpham.route');

app.use('/api/khuyenmais', khuyenmaiRouter);
app.use('/api/thuonghieus', thuonghieuRouter);
app.use('/api/chucvus', chucvuRouter);
app.use('/api/loaisanphams', loaisanphamRouter);
app.use('/api/nhacungcaps', nhacungcapRouter);
app.use('/api/diachithanhviens', diachithanhvienRouter);
app.use('/api/nhanviens', nhanvienRouter);
app.use('/api/mausacs', mausacRouter);
app.use('/api/yeuthichs', yeuthichRouter);
app.use('/api/binhluans', binhluanRouter);
app.use('/api/phieunhaps', phieunhapRouter);
app.use('/api/thanhviens', thanhvienRouter);
app.use('/api/sanphams', sanphamRouter);



// connect to DB
conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})