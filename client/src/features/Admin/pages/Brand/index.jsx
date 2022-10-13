import React from 'react';
import PropTypes from 'prop-types';
import './Brand.scss';
import { Button, Form, Input, message, Modal, Pagination, Popconfirm, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { fetch_brands, savePagination } from 'features/Admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { thuonghieuApi } from 'api/thuonghieuApi';
import { toastError, toastSucsess } from 'utils/notification';
Brand.propTypes = {

};

function Brand(props) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState();
    const [rowSelected, setRowSelected] = React.useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const columns = [
        {
            title: 'Mã thương hiệu',
            dataIndex: 'TH_MATHUONGHIEU',
            width: 600,
        },
        {
            title: 'Tên thương hiệu',
            dataIndex: 'TH_TENTHUONGHIEU',
            width: 600,
        },
        {
            title: 'Thao tác',
            dataIndex: 'TH_MATHUONGHIEU',
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

    const {
        data: { brands },
        pagination: { brands: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        TH_TENTHUONGHIEU: '',
    }

    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
        form.setFieldValue("TH_TENTHUONGHIEU", row.TH_TENTHUONGHIEU)
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
            const { message } = !isEdit ? await thuonghieuApi.post(values) : await thuonghieuApi.update(rowSelected.TH_MATHUONGHIEU, values);
            await dispatch(fetch_brands({ _limit: pagination._limit, _page: pagination._page }));
            setIsLoading(false);
            toastSucsess(message);
            setIsModalOpen(false);

        } catch (error) {
            setIsLoading(false);
            toastError(error.response.data.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { message } = await thuonghieuApi.delete(id);
            await dispatch(fetch_brands({ _limit: pagination._limit, _page: pagination._page }));
            toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }
    return (
        <div className='brand'>
            <div className="content-brand">
                <div className="title-header">
                    <h4>Quản lý thương hiệu </h4>
                    <div className="add-sp">
                        <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm thương hiệu
                        </Button>
                        <Modal
                            title="Thương hiệu"
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
                                    label="Tên thương hiệu"
                                    name="TH_TENTHUONGHIEU"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tên thương hiệu không được bỏ trống"
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Button htmlType='submit' loading={isLoading} type='primary'>Lưu</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='brand-table'>
                    <p>Tổng số: {brands?.length < pagination?._limit ? brands.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                    <Table
                        columns={columns}
                        dataSource={brands}
                        pagination={false}
                    />

                    <div className="mt-3">
                        <Pagination
                            pageSize={1}
                            current={pagination._page}
                            total={pagination._totalPage}
                            onChange={(page) => dispatch(savePagination({ screen: 'brands', page }))}
                        >
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Brand;