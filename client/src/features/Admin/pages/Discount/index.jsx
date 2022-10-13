import React from 'react';
import PropTypes from 'prop-types';
import './Discount.scss';
import { Button, Form, Input, message, Modal, Pagination, Popconfirm, Select, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSucsess } from 'utils/notification';
import { fetch_discounts, savePagination } from 'features/Admin/adminSlice';
import { khuyenmaiApi } from 'api/khuyenmaiApi';
Discount.propTypes = {

};

function Discount(props) {
    const columns = [
        {
            title: 'Mã khuyến mãi',
            dataIndex: 'KM_MAKM',
            width: 600,
        },
        {
            title: 'Phần trăm được khuyến mãi',
            dataIndex: 'KM_PHANTRAMKM',
            width: 600,
        },
        {
            title: 'Thao tác',
            dataIndex: 'KM_MAKM',
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
        data: { discounts },
        pagination: { discounts: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        KM_PHANTRAMKM: '',
    }

    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
        form.setFieldValue("KM_PHANTRAMKM", row.KM_PHANTRAMKM)
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
            const { message } = !isEdit ? await khuyenmaiApi.post(values) : await khuyenmaiApi.update(rowSelected.KM_MAKM, values);
            await dispatch(fetch_discounts({ _limit: pagination._limit, _page: pagination._page }));
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
            const { message } = await khuyenmaiApi.delete(id);
            await dispatch(fetch_discounts({ _limit: pagination._limit, _page: pagination._page }));
            toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }
    return (
        <div className='discount'>
            <div className="content-discount">
                <div className="title-header">
                    <h4>Quản lý khuyến mãi </h4>
                    <div className="add-sp">
                        <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm khuyến mãi
                        </Button>
                        <Modal
                            title="Thêm khuyến mãi"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <Form
                                layout='horizontal'
                                form={form}
                                onFinish={handleSave}
                                initialValues={initialValues}
                            >
                                <Form.Item
                                    label="Phần trăm khuyến mãi"
                                    name="KM_PHANTRAMKM"
                                >
                                    <Select>
                                        <Select.Option value="10">10%</Select.Option>
                                        <Select.Option value="20">20%</Select.Option>
                                        <Select.Option value="30">30%</Select.Option>
                                        <Select.Option value="40">40%</Select.Option>
                                        <Select.Option value="50">50%</Select.Option>
                                        <Select.Option value="60">60%</Select.Option>
                                        <Select.Option value="70">70%</Select.Option>
                                        <Select.Option value="80">80%</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Button htmlType='submit' loading={isLoading} type='primary'>Lưu</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='discount-table'>
                    <p>Tổng số: {discounts?.length < pagination?._limit ? discounts.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                    <Table
                        columns={columns}
                        dataSource={discounts}
                        pagination={false}
                    />
                    <div className="mt-3">
                        <Pagination
                            pageSize={1}
                            current={pagination._page}
                            total={pagination._totalPage}
                            onChange={(page) => dispatch(savePagination({ screen: 'discounts', page }))}
                        >
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Discount;