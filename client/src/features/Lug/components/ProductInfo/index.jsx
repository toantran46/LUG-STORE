import React from 'react';
import PropTypes from 'prop-types';
import './ProductInfo.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from 'features/Lug/userSlice';
import { toastSucsess } from 'utils/notification';
import { format } from 'assets/global/FormatMoney';
import { Button, Col, Input, InputNumber } from 'antd';
import { StarFilled } from '@ant-design/icons';

ProductInfo.propTypes = {
    product: PropTypes.object,
    loadImages: PropTypes.func,
};
ProductInfo.defaultProps = {
    product: {},
    loadImages: null,
}

function ProductInfo(props) {
    const { product, loadImages } = props;
    const [quantity, setQuantity] = React.useState(1);
    const [colorInfo, setColorInfo] = React.useState({});
    const [colorClick, setColorClick] = React.useState();
    const [imageProduct, setImageProduct] = React.useState();
    const dispatch = useDispatch();
    console.log(product);
    const percentSale = Math.round((product.SP_GIAGOC - product.SP_GIABAN) * 100 / product.SP_GIAGOC);
    const moneySave = product.SP_GIAGOC - product.SP_GIABAN;

    const handleAddToCart = () => {
        console.log(colorInfo);
        dispatch(addCart({ product, quantity, colorInfo, imageProduct, colorClick }));
        toastSucsess("Đã thêm sản phẩm vào giỏ hàng");
    }
    const handleQuantityValue = (e) => {
        console.log(e)
    }

    const handleClickColor = (data) => {
        setColorClick(data);
        loadImages(data.duongdanhinh);
        setImageProduct(data.duongdanhinh[0])
        setColorInfo({
            MAMAU: data.mamau,
            TENMAU: data.tenmau,
        })
        console.log(data)
    }
    React.useEffect(() => {
        if (!colorClick && product?.THONGTINSP?.length > 0) handleClickColor(product?.THONGTINSP[0])
    }, [colorClick, product])
    return (
        <div className='product-info'>
            <div className="product-info__name">
                <span>{product.SP_TEN}</span>
            </div>
            <div className="product-info__brand">
                Thương hiệu: <Link to="">{product.TH_TENTHUONGHIEU}</Link>
            </div>
            <div className="product-info__rate">
                Đánh giá:  <a style={{ color: '#FB6E2E' }}>{product.DIEM_TB !== 0 ? product.DIEM_TB : 'Chưa có'} <StarFilled /></a>
            </div>
            <div className="product-info__price">
                {
                    product.SP_GIABAN ?
                        <div>
                            <span className='standar'>{format(product?.SP_GIAGOC)}₫</span>
                            <span className='discounted'>{format(product?.SP_GIABAN)}₫</span>
                        </div>
                        : <span className='discounted'>{format(product?.SP_GIAGOC)}₫</span>
                }
                {percentSale !== 100 ? <span className='perSale'>-{percentSale}%</span> : ''}

            </div>
            <div className="product-info__color">
                <div className="menu__color">
                    <p>Màu sắc</p>
                    <div className="swatch-list-color">
                        <ul className='list-color'>
                            {product.THONGTINSP?.map((data) =>
                                <li key={data.mamau} onClick={() => handleClickColor(data)} className={`swatch ${colorClick?.mamau === data.mamau ? 'active' : ''}`}>
                                    <p style={{ backgroundColor: data.tenmau }} title={`${data.tenmau}`}></p>
                                </li>

                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="product-info__quantity">
                <span>Số lượng: {colorClick?.soluong}</span>
                <div className='btn-quantity'>
                    <Button onClick={() => setQuantity(prev => prev - 1)} disabled={quantity < 2} >-</Button>
                    <Col span={2}>
                        <Input value={quantity} onChange={handleQuantityValue} />
                    </Col>
                    <Button onClick={() => setQuantity(prev => prev + 1)} disabled={colorClick?.soluong <= quantity}>+</Button>
                </div>
            </div>
            <div className="product-info__button">
                <button onClick={handleAddToCart} disabled={colorClick?.soluong == 0 ? true : false} className={`btn btn-danger btn-block`}>
                    {colorClick?.soluong != 0 ? <div>
                        <span>THÊM VÀO GIỎ HÀNG</span><br />
                        {moneySave !== product.SP_GIAGOC ? <span>TIẾT KIỆM ĐẾN {format(moneySave)}₫</span> : ''}
                    </div> : <span>HẾT HÀNG HOẶC KHÔNG CÓ SẴN</span>}

                </button>
            </div>
        </div>
    );
}

export default ProductInfo;