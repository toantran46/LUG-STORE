import React from 'react';
import PropTypes from 'prop-types';
import './Regency.scss';
import { Button, Form, Input, message, Modal, Pagination, Popconfirm, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { chucvuApi } from 'api/chucvuApi';
import { toastError, toastSucsess } from 'utils/notification';
import { fetch_regencys, savePagination } from 'features/Admin/adminSlice';
Regency.propTypes = {

};

function Regency(props) {
    const columns = [
        {
            title: 'Mã chức vụ',
            dataIndex: 'CV_MA',
            width: 600,
        },
        {
            title: 'Tên chức vụ',
            dataIndex: 'CV_TEN',
            width: 600,
        },
        {
            title: 'Diễn giải chức vụ',
            dataIndex: 'CV_DIENGIAI',
            width: 600,
        },
        {
            title: 'Thao tác',
            dataIndex: 'CV_MA',
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
        data: { regencys },
        pagination: { regencys: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        CV_TEN: '',
        CV_DIENGIAI: '',
    }

    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
        form.setFieldValue("CV_TEN", row.CV_TEN)
        form.setFieldValue("CV_DIENGIAI", row.CV_DIENGIAI)
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
            const { message } = !isEdit ? await chucvuApi.post(values) : await chucvuApi.update(rowSelected.CV_MA, values);
            await dispatch(fetch_regencys({ _limit: pagination._limit, _page: pagination._page }));
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
            const { message } = await chucvuApi.delete(id);
            await dispatch(fetch_regencys({ _limit: pagination._limit, _page: pagination._page }));
            toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }

    return (
        <div className='regency'>
            <div className="content-regency">
                <div className="title-header">
                    <h4>Quản lý chức vụ </h4>
                    <div className="add-sp">
                        <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm chức vụ
                        </Button>
                        <Modal
                            title="Chức vụ"
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
                                    name="CV_TEN"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tên chức vụ không được bỏ trống"
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Diễn giải"
                                    name="CV_DIENGIAI"
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
                <p>Tổng số: {regencys?.length < pagination?._limit ? regencys.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                <Table
                    columns={columns}
                    dataSource={regencys}
                    pagination={false}
                />
                <div className="mt-3">
                    <Pagination
                        pageSize={1}
                        current={pagination._page}
                        total={pagination._totalPage}
                        onChange={(page) => dispatch(savePagination({ screen: 'regencys', page }))}
                    >
                    </Pagination>
                </div>
            </div>
        </div >
    );
}

export default Regency;