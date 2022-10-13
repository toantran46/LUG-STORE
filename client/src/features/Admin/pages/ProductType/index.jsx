import React from 'react';
import PropTypes from 'prop-types';
import './ProductType.scss';
import { Button, Form, Input, message, Modal, Pagination, Popconfirm, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSucsess } from 'utils/notification';
import { fetch_product_types, savePagination } from 'features/Admin/adminSlice';
import { loaisanphamApi } from 'api/loaisanphamApi';
ProductType.propTypes = {

};

function ProductType(props) {
    const columns = [
        {
            title: 'Mã loại sản phẩm',
            dataIndex: 'LSP_MALOAI',
            width: 600,
        },
        {
            title: 'Tên loại sản phẩm',
            dataIndex: 'LSP_TENLOAI',
            width: 600,
        },
        {
            title: 'Thao tác',
            dataIndex: 'LSP_MALOAI',
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
        data: { product_types },
        pagination: { product_types: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        LSP_TENLOAI: '',
    }

    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
        form.setFieldValue("LSP_TENLOAI", row.LSP_TENLOAI)
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
            const { message } = !isEdit ? await loaisanphamApi.post(values) : await loaisanphamApi.update(rowSelected.CV_MA, values);
            await dispatch(fetch_product_types({ _limit: pagination._limit, _page: pagination._page }));
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
            const { message } = await loaisanphamApi.delete(id);
            await dispatch(fetch_product_types({ _limit: pagination._limit, _page: pagination._page }));
            toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }
    return (
        <div className='product-type'>
            <div className="content-product-type">
                <div className="title-header">
                    <h4>Quản lý loại sản phẩm </h4>
                    <div className="add-sp">
                        <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm loại sản phẩm
                        </Button>
                        <Modal
                            title="Thêm loại phẩm"
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
                                    name="LSP_TENLOAI"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tên loại sản phẩm không được bỏ trống"
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Button
                                    htmlType='submit'
                                    type='primary'
                                    loading={isLoading}
                                >
                                    Lưu
                                </Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <p>Tổng số: {product_types?.length < pagination?._limit ? product_types.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                <Table
                    columns={columns}
                    dataSource={product_types}
                    pagination={false}
                />
                <div className="mt-3">
                    <Pagination
                        pageSize={1}
                        current={pagination._page}
                        total={pagination._totalPage}
                        onChange={(page) => dispatch(savePagination({ screen: 'product_types', page }))}
                    >
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

export default ProductType;