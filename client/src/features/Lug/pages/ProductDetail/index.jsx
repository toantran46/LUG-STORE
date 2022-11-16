import { useParams } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from 'components/BreadCrumb';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './ProductDetail.scss';
import { Col, Rate, Row } from 'antd';
import SlidePicture from 'features/Lug/components/SlidePicture';
import ProductInfo from 'features/Lug/components/ProductInfo';
import Specification from 'features/Lug/components/Specification';
import CommentNRate from 'features/Lug/components/CommentNRate';
import { sanphamApi } from 'api/sanphamApi';
import { donhangApi } from 'api/donhangApi';
import { useSelector } from 'react-redux';
import { binhluanApi } from 'api/binhluanApi';
import moment from 'moment';

ProductDetail.propTypes = {

};

function ProductDetail(props) {
    const { IDsanpham } = useParams();
    const [product, setProduct] = React.useState();
    const [color, setColor] = React.useState([]);
    const [listImages, setListImages] = React.useState([]);
    const [listFeedback, setListFeedback] = React.useState([]);
    const [feedBackAvailable, setFeedBackAvailable] = React.useState(false);
    const [userFeedback, setUserFeedback] = React.useState(0);
    const { user } = useSelector(state => state.auth);
    const { onReloadFeedback } = useSelector(state => state.userInfo);
    const loadImages = (list) => {
        setListImages(list);
    }
    React.useEffect(() => {
        const fetch_product = async () => {
            try {
                const { result } = await sanphamApi.get(IDsanpham);
                setProduct(result);
                // console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetch_product();
    }, [IDsanpham, onReloadFeedback])
    React.useEffect(() => {
        const checkFeedBackAvailable = async () => {
            try {
                const { available } = await donhangApi.getAll({ action: 'check_order', SP_MA: IDsanpham, TV_ID: user?.TV_ID });
                setFeedBackAvailable(available);
            } catch (error) {
                console.log({ error })
            }
        }

        user && checkFeedBackAvailable();
    }, [IDsanpham, user])
    React.useEffect(() => {
        const checkUserFeedback = async () => {
            try {
                const { totalRecords } = await binhluanApi.getAll({ action: 'check_user_feedback', IDsanpham: IDsanpham, TV_ID: user?.TV_ID });
                // console.log(totalRecords);
                setUserFeedback(totalRecords);
            } catch (error) {
                console.log({ error })
            }
        }

        user && checkUserFeedback();
    }, [IDsanpham, user])
    React.useEffect(() => {
        const fetch_feedback = async () => {
            try {
                const { result } = await binhluanApi.getAll({ IDsanpham: IDsanpham });
                console.log(result);
                const dataList = result?.map((data) => {
                    return {
                        actions: [<span key="comment-list-reply-to-0"></span>],
                        author: data.TV_HOTEN,
                        avatar: data.TV_AVATAR || 'https://joeschmoe.io/api/v1/random',
                        content: (
                            <div>
                                <Rate value={data.BL_SOSAO} disabled />
                                <p>
                                    {data.BL_NOIDUNG}
                                </p>
                            </div>
                        ),
                        datetime: (
                            <span>{moment(data.BL_THOIGIAN).fromNow()}</span>
                        ),
                    }
                })
                setListFeedback(dataList);
            } catch (error) {
                console.log({ error })
            }
        }

        fetch_feedback();
    }, [onReloadFeedback, IDsanpham])
    return (
        <div className='product-detail'>
            <Header />
            <BreadCrumb />
            <div className="container">
                <Row>
                    <Col xs={32} sm={12} md={12} lg={12} >
                        <SlidePicture listImages={listImages} />
                    </Col>
                    <Col xs={32} sm={12} md={12} lg={12} >
                        <ProductInfo loadImages={loadImages} product={product} />
                        <Specification product={product} />
                    </Col>
                </Row>
                <CommentNRate product={product} feedBackAvailable={feedBackAvailable} listFeedback={listFeedback} userFeedback={userFeedback} />
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetail;