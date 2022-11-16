import React from 'react';
import PropTypes from 'prop-types';
import './GoodsRecipi.scss';
import { Button, Col, Form, Input, message, Modal, Pagination, Popconfirm, Row, Select, Table } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSucsess } from 'utils/notification';
import { phieunhapApi } from 'api/phieunhapApi';
import { fetch_goodsrecipi, savePagination } from 'features/Admin/adminSlice';
import { sanphamApi } from 'api/sanphamApi';
import { format } from 'assets/global/FormatMoney';
import moment from 'moment';
GoodsRecipi.propTypes = {

};

function GoodsRecipi(props) {
    const columns = [
        {
            title: 'Tên nhân viên nhập',
            dataIndex: 'NV_HOTEN',
            width: 600,
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'NCC_TEN',
            width: 600,
        },
        {
            title: 'Tổng tiền nhập',
            dataIndex: 'PN_TONGTIEN',
            width: 600,
            render: (row) => format(row) + 'đ'
        },
        {
            title: 'Ghi chú',
            dataIndex: 'PN_GHICHU',
            width: 600,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'PN_NGAYTAO',
            width: 600,
            render: (id, row) => <div>{moment(id).format("MMMM Do YYYY, h:mm:ss")}</div>
        },
        {
            title: 'Thao tác',
            dataIndex: 'PN_MA',
            // width: 100,
            render: (id, row) =>
                <div className="changes">
                    <Button
                        onClick={() => handleDetailProduct(row)}
                    >
                        < EyeFilled />
                    </Button>

                </div>
        }
    ];
    const columns2 = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (id, row, index) => (
                <Form.Item
                    name={['SANPHAM', index, 'SP_MA']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn sản phẩm'
                        }
                    ]}
                >
                    <Select placeholder="Lựa chọn sản phẩm" onChange={(e) => setSelectedProduct(e)} options={productList}></Select>
                </Form.Item>
            )
        },
        {
            title: 'Màu sản phẩm',
            dataIndex: 'age',
            render: (id, row, index) => (
                <Form.Item
                    name={['SANPHAM', index, 'MS_MAMAU',]}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn màu sản phẩm'
                        }
                    ]}
                >
                    {/* onChange={handleSelectProvince} options={provinceByGHN} */}
                    <Select placeholder="Lựa chọn màu sản phẩm" options={colorList}></Select>
                </Form.Item>
            )
        },
        {
            title: 'Giá nhập',
            dataIndex: 'address',
            render: (id, row, index) => (
                <Form.Item
                    name={['SANPHAM', index, 'CTN_TONGTIEN']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá nhập'
                        }
                    ]}
                >
                    {/* onChange={handleSelectProvince} options={provinceByGHN} */}
                    <Input placeholder="Nhập giá"></Input>
                </Form.Item>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'address',
            render: (id, row, index) => (
                <Form.Item
                    name={['SANPHAM', index, 'CTN_SOLUONG']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số lượng'
                        }
                    ]}
                >
                    {/* onChange={handleSelectProvince} options={provinceByGHN} */}
                    <Input placeholder="Nhập số lượng"></Input>
                </Form.Item>
            )
        },
        {
            dataIndex: 'address',
            render: (id, row, index) => (
                index != 0 && <DeleteFilled onClick={() => {
                    const newSanPham = form.getFieldValue('SANPHAM');
                    newSanPham.splice(index, 1)
                    form.setFieldValue('SANPHAM', newSanPham)
                    setgoodsList(prev => {
                        const newGoodsList = [...prev];
                        newGoodsList.splice(index, 1)

                        return newGoodsList
                    })
                }}
                />
            )
        },
    ];
    const columnsProduct = [
        {
            title: 'Tên sản phẩm ',
            dataIndex: 'SP_TEN',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'MS_TENMAU',
            render: (row) => <span style={{ backgroundColor: `${row}` }} className='swatch-color'></span>
        },
        {
            title: 'Đơn giá',
            dataIndex: 'CTN_TONGTIEN',
            render: (row) => format(row) + 'đ'
        },
        {
            title: 'Số lượng',
            dataIndex: 'CTN_SOLUONG',
        },
    ];
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalOpenDetail, setIsModalOpenDetail] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState();
    const [selectedProduct, setSelectedProduct] = React.useState();
    const [rowSelected, setRowSelected] = React.useState();
    const [form] = Form.useForm();
    const [productList, setProductList] = React.useState([]);
    const [supplierList, setSupplierList] = React.useState([]);
    const [colorList, setColorList] = React.useState([]);
    const [infoProduct, setInfoProduct] = React.useState([]);
    const [goodsList, setgoodsList] = React.useState([true]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const dispatch = useDispatch()
    const {
        data: { goodsrecipi, products, suppliers },
        pagination: { goodsrecipi: pagination },
    } = useSelector(state => state.adminInfo);
    console.log(goodsrecipi);

    const initialValues = {
        SANPHAM: []
    }

    const handleAdd = () => {
        setIsModalOpen(true);
        setIsEdit(false);
        form.resetFields();
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOkDetail = () => {
        setIsModalOpenDetail(false);
    };

    const handleCancelDetail = () => {
        setIsModalOpenDetail(false);
    };

    const handleSave = async (values) => {
        try {
            setIsLoading(true);
            console.log(values)
            const { message } = await phieunhapApi.post({ NCC_MA: values.NCC_MA, PN_TONGTIEN: totalPrice, PN_GHICHU: values.PN_GHICHU || '', SANPHAM: JSON.stringify(values.SANPHAM) },);
            await dispatch(fetch_goodsrecipi({ _limit: pagination._limit, _page: pagination._page }));
            setIsLoading(false);
            toastSucsess(message);
            setIsModalOpen(false);

        } catch (error) {
            setIsLoading(false);
            toastError(error.response.data.message);
        }
    }

    const handleDetailProduct = (row) => {
        setIsModalOpenDetail(true);
        setRowSelected(row)
    }
    const handleChangePrice = (changedValues, allValues) => {
        const total = allValues.SANPHAM.reduce((a, b) => a + (b.CTN_SOLUONG * b.CTN_TONGTIEN || 0), 0)
        setTotalPrice(total)
    }
    React.useEffect(() => {
        try {
            const fetch_color_by_product = async () => {
                const { result } = await sanphamApi.get(selectedProduct);
                setInfoProduct(result.THONGTINSP);
            }

            selectedProduct && fetch_color_by_product();
        } catch (error) {
            console.log(error);
        }
    }, [selectedProduct])
    React.useEffect(() => {
        setProductList(products?.map((data) => (
            { label: data.SP_TEN, value: data.SP_MA }
        )))
        setSupplierList(suppliers?.map((data) => (
            { label: data.NCC_TEN, value: data.NCC_MA }
        )))
        setColorList(infoProduct?.map((data) => (
            { label: data.tenmau, value: data.mamau }
        )))
    }, [products, suppliers, infoProduct])

    return (
        <div>
            <div className='goods-recipi'>
                <div className="content-goods-recipi">
                    <div className="title-header">
                        <div><h4>Nhập hàng </h4></div>
                        <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
                            Nhập hàng
                        </Button>
                        <div className="order-detail">
                            <Modal
                                title="Chi tiết phiếu nhập"
                                visible={isModalOpenDetail}
                                onOk={handleOkDetail}
                                onCancel={handleCancelDetail}
                                width={1000}
                            >
                                <Table
                                    columns={columnsProduct}
                                    dataSource={rowSelected?.SAN_PHAM}
                                    pagination={false}
                                />
                            </Modal>
                        </div>
                        <Modal
                            title="Nhập sản phẩm"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1200}
                            footer={false}
                        >
                            <Form
                                form={form}
                                layout='horizontal'
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 14 }}
                                onFinish={handleSave}
                                initialValues={initialValues}
                                onValuesChange={handleChangePrice}
                            >
                                <Table
                                    columns={columns2}
                                    dataSource={goodsList}
                                    pagination={false}
                                >

                                </Table>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item>
                                            <Button onClick={() => setgoodsList(prev => [...prev, true])}><PlusCircleOutlined />Thêm sản phẩm</Button>
                                        </Form.Item>
                                        <Form.Item
                                            label="Nhà cung cấp"
                                            name="NCC_MA"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn nhà cung cấp'
                                                }
                                            ]}
                                        >
                                            {/* onChange={handleSelectProvince} options={provinceByGHN} */}
                                            <Select placeholder="Lựa chọn nhà cung cấp" options={supplierList}></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item >
                                            <div>Tổng tiền: {format(totalPrice)}đ</div>
                                        </Form.Item>
                                        <Form.Item
                                            label="Ghi chú"
                                            name="PN_GHICHU"
                                        >
                                            <Input placeholder="Ghi chú"></Input>
                                        </Form.Item>
                                    </Col>
                                    <Form.Item>
                                        <Button loading={isLoading} htmlType='submit' type='primary'>Xác nhận</Button>
                                    </Form.Item>
                                </Row>
                            </Form>
                        </Modal>
                    </div>
                    <p>Tổng số: {goodsrecipi?.length < pagination?._limit ? goodsrecipi.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                    <Table
                        columns={columns}
                        dataSource={goodsrecipi}
                        pagination={false}
                    />
                    <div className="mt-3">
                        <Pagination
                            pageSize={1}
                            current={pagination._page}
                            total={pagination._totalPage}
                            onChange={(page) => dispatch(savePagination({ screen: 'goodsrecipi', page }))}
                        >
                        </Pagination>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default GoodsRecipi;