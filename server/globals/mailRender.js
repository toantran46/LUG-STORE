module.exports = {
    mailHtml: (ORDER) => {
        console.log(ORDER)
        return `
        <html>
            <head>
                <style>
                    .img-success {
                        width: 200px;
                        height: 150px;
                    }
                    .img-logo{
                    margin-top: 10px;
                    width: 200px;
                    height: 200px;
                    }
                    .price-style{
                        color: #E9252C;
                    }

                </style>
            </head>
            <body>
                <div classname="header">
                <img src="https://i.pinimg.com/originals/91/36/df/9136df0949a40e6567c6f4f7a6343672.gif" class="img-success" />
                    <h4>Đơn hàng #${ORDER?.DH_MA} của bạn đã đặt hàng thành công, cửa hàng sẽ xác nhận đơn hàng sớm nhất </h4>
                </div>
                    <p>Tổng tiền: <span class="price-style">${ORDER?.DH_TONGTIEN}đ</span></p>
                    <p>Phí ship: <span class="price-style">${ORDER?.DH_PHISHIP}đ</span></p>
                    <p>Hình thức thanh toán: ${ORDER?.DH_PHUONGTHUCTT}</p>
                    <p>Địa chỉ giao hàng: ${ORDER?.DH_DIACHIGIAOHANG}</p>
                    <p>Số điện thoại liên hệ: ${ORDER?.TV_SODIENTHOAI}</p>
                    <h4>Đơn hàng gồm:<h4/>
                    <div>
                        <ul> ${ORDER?.SAN_PHAM?.map((data) => (`
            
                <li>${data.SP_TEN} x${data.CTDH_SOLUONG} ${data.CTDH_GIA}đ</li>
            `
        ))}
                        </ul>
                    </div>
                    <div>
                        Cám ơn bạn đã tin tưởng và ủng hộ LUG-STORE
                    </div>
                    <img src="https://lh3.googleusercontent.com/a/ALm5wu1N-RnRXK_hRf-arBOjHCXKoLQGoBKOiWlMxTSF=s360-p-rw-no" class="img-logo" /> 
            </body>
        </html>
`
    }
}