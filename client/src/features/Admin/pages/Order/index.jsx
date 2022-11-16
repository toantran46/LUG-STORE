import React from 'react';
import PropTypes from 'prop-types';
import './Order.scss';
import { Avatar, Button, Checkbox, DatePicker, Form, Modal, Pagination, Radio, Space, Table, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteFilled, EyeFilled, FireOutlined, PlusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { fetch_orders, savePagination } from 'features/Admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'assets/global/FormatMoney';
import { donhangApi } from 'api/donhangApi';
import { toastSucsess } from 'utils/notification';
import moment from 'moment';
import Search from 'antd/lib/transfer/search';

function Order(props) {
    const columnsProduct = [
        {
            title: 'Hình ảnh',
            dataIndex: 'HASP_DUONGDAN',
            render: (row) => <Avatar src={row} />
        },
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
            title: 'Số lượng',
            dataIndex: 'CTDH_SOLUONG',
        },
        {
            title: 'Giá',
            dataIndex: 'CTDH_GIA',
            render: (row) => format(row) + 'đ'
        },
    ];
    const columns = [

        {
            title: 'Tên khách hàng ',
            dataIndex: 'TV_HOTEN',
            width: 300,
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'DH_PHUONGTHUCTT',
            width: 200,
        },
        {
            title: 'Địa chỉ giao hàng',
            dataIndex: 'DH_DIACHIGIAOHANG',
            width: 500,
        },
        {
            title: 'Phí giao hàng',
            dataIndex: 'DH_PHISHIP',
            width: 150,
            render: (row) => format(row) + 'đ'
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'DH_TONGTIEN',
            width: 150,
            render: (row) => format(row) + 'đ'
        },
        {
            title: 'Thời gian đặt',
            dataIndex: 'DH_THOIGIANDAT',
            width: 150,
            render: (id, row) => <div>{moment(id).format('MMMM Do YYYY, h:mm:ss')}</div>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'DH_TRANGTHAI',
            width: 150,
            render: (row) => row === 1 ? <Tag icon={<SyncOutlined spin />} color="processing">Chờ xác nhận</Tag>
                : row === 2 ? <Tag icon={<FireOutlined />} color="gold">Đang vận chuyển</Tag>
                    : row === 3 ? <Tag icon={<CheckCircleOutlined />} color="success">Đã nhận hàng</Tag>
                        : <Tag icon={<CloseCircleOutlined />} color="error">Đã hủy</Tag>
        },
        {
            title: 'Ghi chú',
            dataIndex: 'DH_GHICHU',
            width: 300,
        },
        {
            title: 'Thao tác',
            dataIndex: 'DH_MA',

            render: (id, row) =>
                <div className="changes">
                    <Button
                        onClick={() => handleEdit(row)}
                    >
                        < EyeFilled />
                    </Button>
                    <Button
                        type='primary'
                        onClick={() => showModal(row)}
                    >
                        Cập nhật
                    </Button>
                </div>
            ,
        },
    ];
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalUpdateOpen, setIsModalUpdatelOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState();
    const [rowSelected, setRowSelected] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState();
    const [listProductSearch, setListProductSearch] = React.useState();
    const [listOrderFilter, setListOrderFilter] = React.useState();
    const useRef = React.useRef();
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const {
        data: { orders },
        pagination: { orders: pagination } } = useSelector(state => state.adminInfo);
    // console.log({ orders: pagination })
    const showModal = (row) => {
        setIsModalUpdatelOpen(true);
        setRowSelected(row)
        form.setFieldValue('DH_TRANGTHAI', row.DH_TRANGTHAI);
        // console.log(row)
    };
    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleUpdateOk = () => {
        setIsModalUpdatelOpen(false);
    };

    const handleUpdateCancel = () => {
        setIsModalUpdatelOpen(false);
    };
    const handleUpdateStatus = async (values) => {
        try {
            setIsLoading(true)
            console.log(rowSelected)
            const { message } = await donhangApi.update(rowSelected.DH_MA, values)
            dispatch(fetch_orders({ _limit: pagination._limit, _page: pagination._page }));
            setIsLoading(false)
            setIsModalUpdatelOpen(false);
            toastSucsess(message);

        } catch (error) {
            console.log(error)
        }
    }
    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }
    const handleReset = () => {
        form.resetFields();
        setListOrderFilter(null);
    }
    const handleFilterDate = async (value) => {
        try {
            const data = {
                DON_HANG_TU_NGAY: value.date_from,
                DON_HANG_DEN_NGAY: value.date_to,
            }
            // console.log(data);
            const { result } = await donhangApi.getAll({ filterDate: JSON.stringify(data) });
            setListOrderFilter(result);
            console.log(listOrderFilter)
        } catch (error) {
            console.log(error);
        }

    }
    React.useEffect(() => {
        if (useRef.current) clearTimeout(useRef.current);
        useRef.current = setTimeout(() => {
            const fetch_search_product = async () => {
                const { result } = await donhangApi.getAll({ searchBy: searchValue })
                // console.log(result)
                setListProductSearch(result);
            }
            fetch_search_product();
        }, 500)
    }, [searchValue])
    // React.useEffect(() => {
    //     console.log(rowSelected)
    // }, [rowSelected])
    // console.log(rowSelected)
    return (
        <div className='order'>
            <div className="content-order">
                <div className="title-header">
                    <h4>Quản lý đơn đặt hàng</h4>
                    <div className="order-detail">
                        <Modal
                            title="Chi tiết đơn hàng"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1000}
                        >
                            <Table
                                columns={columnsProduct}
                                dataSource={rowSelected.SAN_PHAM}
                                pagination={false}
                            />
                        </Modal>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <p>Tổng số: {orders?.length < pagination?._limit ? orders.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                    </div>
                    <div className="search">
                        <Search placeholder="Tìm kiếm sản phẩm" onChange={onSearch} size='small' style={{ width: 400 }} enterButton />
                    </div>
                    <Form form={form} onFinish={handleFilterDate} >
                        <div className="filter-date">
                            <div className="filter-date__date-from">
                                <Form.Item name='date_from' label='Đơn hàng từ ngày'>
                                    <DatePicker />
                                </Form.Item>
                            </div>
                            <div className="filter-date__date-to">
                                <Form.Item name='date_to' label='đến ngày'>
                                    <DatePicker />
                                </Form.Item>
                            </div>
                            <div className="filter-date__button mr-2">
                                <Button type='primary' htmlType='submit'>Lọc</Button>
                            </div>
                            <div className="filter-date__button-reset">
                                <Button type='primary' onClick={handleReset} >Reset</Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <Table
                    columns={columns}
                    dataSource={searchValue ? listProductSearch : listOrderFilter ? listOrderFilter : orders}
                    pagination={false}
                />
                <div className="mt-3">
                    <Pagination
                        pageSize={1}
                        current={pagination._page}
                        total={pagination._totalPage}
                        onChange={(page) => dispatch(savePagination({ screen: 'orders', page }))}
                    >
                    </Pagination>
                </div>
            </div>
            <Modal title="Cập nhật trạng thái đơn hàng" visible={isModalUpdateOpen} onOk={handleUpdateOk} onCancel={handleUpdateCancel} footer={false}>
                <Form
                    form={form}
                    onFinish={handleUpdateStatus}
                    initialValues={{ DH_TRANGTHAI: rowSelected.DH_TRANGTHAI }}
                >
                    <Form.Item name='DH_TRANGTHAI'>
                        <Radio.Group >
                            <Space direction="vertical">
                                <Radio disabled={rowSelected.DH_TRANGTHAI >= 1} value={1}>Chờ xử lý</Radio>
                                <Radio disabled={rowSelected.DH_TRANGTHAI >= 2} value={2}>Đang vận chuyển</Radio>
                                <Radio disabled={rowSelected.DH_TRANGTHAI >= 3} value={3}>Đã nhận hàng</Radio>
                                <Radio disabled={rowSelected.DH_TRANGTHAI >= 4 || rowSelected.DH_TRANGTHAI == 3 || rowSelected.DH_TRANGTHAI == 2} value={4}>Đã hủy</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Button type='primary' loading={isLoading} htmlType='submit'>Lưu</Button>
                </Form>
            </Modal>
        </div>
    );
}

export default Order;