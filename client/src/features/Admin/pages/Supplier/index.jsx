import React from 'react';
import PropTypes from 'prop-types';
import './Supplier.scss';
import { Button, Form, Input, message, Modal, Pagination, Popconfirm, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSucsess } from 'utils/notification';
import { fetch_suppliers, savePagination } from 'features/Admin/adminSlice';
import { nhacungcapApi } from 'api/nhacungcapApi';
Supplier.propTypes = {

};

function Supplier(props) {
    const columns = [
        {
            title: 'Mã nhà cung cấp',
            dataIndex: 'NCC_MA',
            width: 600,
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'NCC_TEN',
            width: 600,
        },
        {
            title: 'Địa chỉ nhà cung cấp',
            dataIndex: 'NCC_DIACHI',
            width: 600,
        },
        {
            title: 'Số điện thoại nhà cung cấp',
            dataIndex: 'NCC_SODIENTHOAI',
            width: 600,
        },
        {
            title: 'Thao tác',
            dataIndex: 'NCC_MA',
            // width: 100,
            render: (id, row) =>
                <div className="changes">
                    <Button
                        onClick={() => handleEdit(row)}
                    >
                        <EditFilled />
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title={"Bạn có chắc chắn muốn xóa"}
                        onConfirm={() => handleDelete(id)}
                        okText="Có"
                        cancelText="không"
                    >
                        <Button
                        >
                            <span className='delete-icon'><DeleteFilled /></span>
                        </Button>
                    </Popconfirm>

                </div>
        }
    ];
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState();
    const [rowSelected, setRowSelected] = React.useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const {
        data: { suppliers },
        pagination: { suppliers: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        NCC_TEN: '',
        NCC_SODIENTHOAI: '',
        NCC_DIACHI: '',
    }

    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
        form.setFieldsValue(row);
    };

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

    const handleSave = async (values) => {
        try {
            setIsLoading(true);
            console.log(values)
            const { message } = !isEdit ? await nhacungcapApi.post(values) : await nhacungcapApi.update(rowSelected.NCC_MA, values);
            await dispatch(fetch_suppliers({ _limit: pagination._limit, _page: pagination._page }));
            setIsLoading(false);
            toastSucsess(message);
            setIsModalOpen(false);

        } catch (error) {
            setIsLoading(false);
            toastError(error.response.data.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const { message } = await nhacungcapApi.delete(id);
            await dispatch(fetch_suppliers({ _limit: pagination._limit, _page: pagination._page }));
            toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }
    return (
        <div className='supplier'>
            <div className="content-supplier">
                <div className="title-header">
                    <h4>Quản lý nhà cung cấp </h4>
                    <div className="add-sp">
                        <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
                            Nhà cung cấp
                        </Button>
                        <Modal
                            title="Thêm nhà cung cấp"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <Form
                                layout='horizontal'
                                labelCol={{ span: 5 }}
                                form={form}
                                onFinish={handleSave}
                                initialValues={initialValues}
                            >
                                <Form.Item
                                    label="Tên"
                                    name="NCC_TEN"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tên nhà cung cấp không được bỏ trống"
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="NCC_SODIENTHOAI"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ"
                                    name="NCC_DIACHI"
                                >
                                    <Input />
                                </Form.Item>
                                <Button htmlType='submit' loading={isLoading} type='primary'>Lưu</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <p>Tổng số: {suppliers?.length < pagination?._limit ? suppliers.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                <Table
                    columns={columns}
                    dataSource={suppliers}
                    pagination={false}
                />
                <div className="mt-3">
                    <Pagination
                        pageSize={1}
                        current={pagination._page}
                        total={pagination._totalPage}
                        onChange={(page) => dispatch(savePagination({ screen: 'suppliers', page }))}
                    >
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

export default Supplier;