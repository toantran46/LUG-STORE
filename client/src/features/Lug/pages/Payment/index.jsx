import React from 'react';
import "./Payment.scss";
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Button, Col, Form, Input, Radio, Row, Select, Space, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { LeftOutlined } from '@ant-design/icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'assets/global/FormatMoney';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { diachithanhvienApi } from 'api/diachithanhvienApi';
import { toastSucsess } from 'utils/notification';
import { thanhvienApi } from 'api/thanhvienApi';
import { donhangApi } from 'api/donhangApi';
import { resetCart } from 'features/Lug/userSlice';

Payment.propTypes = {

};

function Payment(props) {
    const [inputSwitch, setInputSwitch] = React.useState(false);
    const [provinceByGHN, setProvinceByGHN] = React.useState();
    const [districtByGHN, setDistrictByGHN] = React.useState();
    const [wardByGHN, setWardByGHN] = React.useState();
    const [addressUser, setAddressUser] = React.useState();
    const [provinceSelected, setProvinceSelected] = React.useState();
    const [districtSelected, setDistrictSelected] = React.useState();
    const [wardSelected, setWardSelected] = React.useState();
    const [addressSelected, setaddressSelected] = React.useState();
    const [feeDelivery, setFeeDelivery] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = React.useState('COD');
    const [totalPriceFinal, setTotalPriceFinal] = React.useState();

    const [isLoading, setIsLoading] = React.useState(false);
    const [isAddAddress, setIsAddAddress] = React.useState(false);

    const { cart } = useSelector(state => state.userInfo);
    const { isAuth, user } = useSelector(state => state.auth)
    console.log(cart)
    // console.log(user)
    const [form] = Form.useForm()
    const [form1] = Form.useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        TV_EMAIL: user?.TV_EMAIL || '',
        TV_HOTEN: user?.TV_HOTEN || '',
        TV_SODIENTHOAI: user?.TV_SODIENTHOAI || '',
        // DIACHI: user?.TV_HOTEN || '',
    }

    React.useEffect(() => {
        form.setFieldsValue(user)
    }, [user])

    React.useEffect(() => {
        const fetch_province = async () => {
            try {
                const { data: { data } } = await axios.get(process.env.REACT_APP_API_PROVINCE_GHN, { headers: { token: process.env.REACT_APP_GHN_TOKEN_ID } });
                // console.log({ data });
                setProvinceByGHN(data?.map((value) => (
                    {
                        label: value.NameExtension?.length > 0 && value.NameExtension[1], value: value.ProvinceID
                    }
                )))
            } catch (error) {
                console.log({ error });
            }
        }
        isAuth && fetch_province()
    }, [isAuth])

    React.useEffect(() => {
        const fetch_district = async () => {
            try {
                const { data: { data } } = await axios.post(process.env.REACT_APP_API_DISTRICT_GHN, { "province_id": provinceSelected.value }, { headers: { token: process.env.REACT_APP_GHN_TOKEN_ID } });
                // console.log({ data });
                setDistrictByGHN(data?.map((value) => (
                    {
                        label: value.DistrictName, value: value.DistrictID
                    }
                )))
            } catch (error) {
                console.log({ error });
            }
        }
        provinceSelected?.value && fetch_district();
    }, [isAuth, provinceSelected])
    React.useEffect(() => {
        const fetch_ward = async () => {
            try {
                const { data: { data } } = await axios.post(process.env.REACT_APP_API_WARD_GHN, { "district_id": districtSelected.value }, { headers: { token: process.env.REACT_APP_GHN_TOKEN_ID } });
                // console.log({ data });
                setWardByGHN(data?.map((value) => (
                    {
                        label: value.WardName, value: value.WardCode
                    }
                )))
            } catch (error) {
                console.log({ error });
            }
        }
        districtSelected?.value && fetch_ward();
    }, [isAuth, districtSelected])

    React.useEffect(() => {
        const fetch_address_user = async () => {
            const { result } = await diachithanhvienApi.get(user.TV_ID)
            // console.log(data)
            setAddressUser(result.map(value => (
                {
                    value: `${value.DCTV_SONHA}, ${value.DCTV_TENXA}, ${value.DCTV_TENHUYEN}, ${value.DCTV_TENTINH}`,
                    MAHUYEN: value.DCTV_MAHUYEN,
                    MAXA: value.DCTV_MAXA,
                }
            )))
        }
        isAuth && fetch_address_user()
    }, [isAddAddress])

    React.useEffect(() => {
        const fetch_delivery_fee = async () => {

            const data_delivery_fee = {
                from_district_id: 1572,
                service_id: null,
                service_type_id: 2,
                to_district_id: addressSelected?.MAHUYEN * 1,
                to_ward_code: addressSelected?.MAXA * 1,
                height: 20,
                length: 50,
                weight: 1000,
                width: 30,
                insurance_value: null,
                coupon: null
            }
            const { data: { data } } = await axios.post(process.env.REACT_APP_API_DELIVERY_FEE_GHN, data_delivery_fee, { headers: { token: process.env.REACT_APP_GHN_TOKEN_ID, ShopId: process.env.REACT_APP_GHN_SHOPID } });
            // console.log(data);
            setFeeDelivery(data.total);
        }
        addressSelected && fetch_delivery_fee();
    }, [addressSelected])
    const totalPrice = cart?.reduce((a, b) => a + b.SL_SP * (b.SP_GIABAN || b.SP_GIAGOC), 0)
    React.useEffect(() => {
        setTotalPriceFinal(totalPrice + feeDelivery);
    }, [totalPrice, feeDelivery])

    const handleSelectProvince = (values, option) => {
        setProvinceSelected(option)
    }
    const handleSelectDistrict = (value, option) => {
        setDistrictSelected(option);
    }
    const handleSelectWard = (value, option) => {
        setWardSelected(option);
    }
    const handleChooseAddress = (value, option) => {
        setaddressSelected(option)
    }
    const handlePaymentMethod = (e) => {
        // console.log(e.target.value);
        setPaymentMethod(e.target.value)
    }
    // console.log(paymentMethod);
    const handleAddAddress = async () => {
        try {
            const checkValidate = await form1.validateFields();
            if (checkValidate.error) return;
            setIsLoading(true);
            const data = {
                TV_ID: user?.TV_ID,
                DCTV_MATINH: provinceSelected?.value,
                DCTV_MAHUYEN: districtSelected?.value,
                DCTV_MAXA: wardSelected?.value,
                DCTV_TENTINH: provinceSelected?.label,
                DCTV_TENHUYEN: districtSelected?.label,
                DCTV_TENXA: wardSelected?.label,
                DCTV_SONHA: form1.getFieldValue('SONHA') || '',
            }
            // console.log(data)
            const { message } = await diachithanhvienApi.post(data);
            setIsLoading(false);
            toastSucsess(message)
            setInputSwitch(false);
            setIsAddAddress(prev => !prev)
            form1.resetFields();
        } catch (error) {
            console.log({ error })
        }
    }

    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            console.log(values)
            const cartDetail = JSON.stringify(cart?.map((info) => ({
                SP_MA: info.SP_MA,
                SP_TEN: info.SP_TEN,
                CTDH_SOLUONG: info.SL_SP,
                CTDH_GIA: (info.SP_GIABAN || info.SP_GIAGOC) * info.SL_SP,
                MS_MAMAU: info.MAMAU,
                SP_GIANHAP: info.SP_GIANHAP,
            })));
            // console.log(cartDetail)
            const data = {
                TV_ID: user?.TV_ID,
                DH_DIACHIGIAOHANG: values.DIACHI.value,
                DH_TONGTIEN: totalPriceFinal || '',
                DH_PHUONGTHUCTT: paymentMethod || '',
                DH_GHICHU: values.TV_GHICHU || '',
                DH_PHISHIP: feeDelivery || '',
                CART: cartDetail,
            }
            if (paymentMethod === 'COD') {
                const { message } = await donhangApi.post(data);
                toastSucsess(message);
                dispatch(resetCart());
                navigate('/payment/success')
                setIsLoading(false);
                // console.log(data)
            } else {
                const { result } = await donhangApi.payment({ data: JSON.stringify(data) });
                setIsLoading(false);
                if (result.payUrl) {
                    window.location.href = result.payUrl;
                }
            }

        } catch (error) {
            console.log({ error })
        }
    };

    // console.log(districtSelected)
    return (
        <div className='payment'>
            <Header />
            <div className="title">
                <h4> THANH TOÁN</h4>
            </div>
            <div className="container">
                <Form
                    layout='vertical'
                    onFinish={onFinish}
                    initialValues={initialValues}
                    form={form}
                >
                    <Row>
                        <Col xs={32} sm={24} md={12} lg={12} >
                            <div className='info-custom'>
                                <div className="main-header">
                                    <h5>Thông tin mua hàng</h5>
                                    <Form.Item name="TV_HOTEN" label="Họ tên" rules={[{ required: true, message: "Họ tên không được bỏ trống" }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="TV_SODIENTHOAI" label="Số điện thoại" rules={[{ required: true, message: "Số điện thoại không được bỏ trống" },]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="DIACHI"
                                        rules={[{ required: true, message: "Địa chỉ không được bỏ trống" },]}
                                    >
                                        <Select labelInValue onChange={handleChooseAddress} options={addressUser} placeholder="Lựa chọn địa chỉ" ></Select>
                                    </Form.Item>
                                    <Form.Item name="TV_GHICHU" label="Ghi chú cho đơn hàng" >
                                        <TextArea placeholder="viết ghi chú" />
                                    </Form.Item>
                                    <div className="add-address">
                                        Bạn có muốn thêm địa chỉ giao hàng mới ? &nbsp;
                                        <Switch
                                            checked={inputSwitch}
                                            onChange={() => {
                                                setInputSwitch(!inputSwitch);
                                            }}
                                            checkedChildren="Có"
                                            unCheckedChildren="Không" />
                                    </div>
                                    {inputSwitch ?
                                        <Form onFinish={handleAddAddress} form={form1} >
                                            <div className="change-address">
                                                <Form.Item
                                                    label="Tỉnh thành"
                                                    name="tinh"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng chọn tỉnh'
                                                        }
                                                    ]}
                                                >
                                                    <Select onChange={handleSelectProvince} options={provinceByGHN} placeholder="Lựa chọn tỉnh">
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    label="Quận huyện"
                                                    name="huyen"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng chọn huyện'
                                                        }
                                                    ]}
                                                >
                                                    <Select onChange={handleSelectDistrict} options={districtByGHN} placeholder="Lựa chọn quận huyện">
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    label="Phường xã"
                                                    name="xa"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng chọn xã'
                                                        }
                                                    ]}
                                                >
                                                    <Select onChange={handleSelectWard} options={wardByGHN} placeholder="Lựa chọn phường xã">

                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    label="Số nhà"
                                                    name="SONHA"
                                                >
                                                    <TextArea placeholder='(tùy chọn)' />
                                                </Form.Item>
                                                <Button type="primary" loading={isLoading} onClick={handleAddAddress} block>
                                                    Thêm địa chỉ giao hàng
                                                </Button>
                                            </div>
                                        </Form>
                                        : ""}
                                </div>

                            </div>
                        </Col>
                        <Col xs={32} sm={24} md={12} lg={12}>
                            <div className='payment-method'>
                                <h5>Đơn hàng ({cart.length} sản phẩm)</h5>
                                {cart.length > 0 ?
                                    cart?.map((data, key) => (
                                        <div key={key} className="product-content">
                                            <div className="product-content__img">
                                                <div className="img-wrapper">
                                                    <div className="img-quantity">
                                                        <img width={70} height={70} src={data.ANHSP} alt="" />
                                                    </div>
                                                    <span className='quantity'>{data.SL_SP}</span>
                                                </div>
                                                <div className="detail">
                                                    <div className="name-product">
                                                        {data.SP_TEN}
                                                    </div>
                                                    <div className="color-product">
                                                        <span style={{ color: data.TENMAU }}>{data.TENMAU}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content__price">
                                                <span>{format(data.SL_SP * (data.SP_GIABAN || data.SP_GIAGOC))}₫</span>
                                            </div>
                                        </div>
                                    ))
                                    : ""}
                                <div className="temp-price">
                                    <div className="total-line">
                                        <div className="line-name">
                                            Tạm tính
                                        </div>
                                        <div className="price">
                                            {format(totalPrice)}₫
                                        </div>
                                    </div>
                                    <div className="ship-line">
                                        <div className="line-name">
                                            Phí vận chuyển
                                        </div>
                                        <div className="price">
                                            {feeDelivery && format(feeDelivery)}₫
                                        </div>
                                    </div>
                                    <div className="payment-line">
                                        <div className="line-name">
                                            Phương thức thanh toán
                                        </div>
                                        <div className="method">
                                            <Radio.Group onChange={handlePaymentMethod} defaultValue={paymentMethod}>
                                                <Space direction="vertical">
                                                    <Radio checked value={'COD'}>Thanh toán khi nhận hàng</Radio>
                                                    <Radio value={'MOMO'}>Thanh toán qua ví điện tử Momo</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div className="total-price">
                                        <div className="line-name">
                                            Tổng cộng
                                        </div>
                                        <div className="line-price">
                                            {format(totalPrice + feeDelivery)}₫
                                        </div>
                                    </div>
                                    <div className="order-line">
                                        <div className="cart-back">
                                            <Link to={"/cart"}>
                                                <span><LeftOutlined /></span>Quay về giỏ hàng
                                            </Link>
                                        </div>
                                        <div className="btn-order">
                                            <Button type="primary" size='large' htmlType='submit' danger loading={isLoading}>Đặt hàng</Button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;