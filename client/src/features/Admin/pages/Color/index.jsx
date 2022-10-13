import React from 'react';
import PropTypes from 'prop-types';
import './Color.scss';
import { Button, Form, Input, message, Modal, Pagination, Popconfirm, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSucsess } from 'utils/notification';
import { fetch_colors, savePagination } from 'features/Admin/adminSlice';
import { mausacApi } from 'api/mausacApi';
Color.propTypes = {

};

function Color(props) {
    const columns = [
        {
            title: 'Mã màu sắc',
            dataIndex: 'MS_MAMAU',
            width: 600,
        },
        {
            title: 'Tên màu sắc',
            dataIndex: 'MS_TENMAU',
            width: 600,
        },
        {
            title: 'Thao tác',
            dataIndex: 'MS_MAMAU',
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
        data: { colors },
        pagination: { colors: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        MS_TENMAU: '',
    }

    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
        form.setFieldValue("MS_TENMAU", row.MS_TENMAU)
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
            const { message } = !isEdit ? await mausacApi.post(values) : await mausacApi.update(rowSelected.MS_MAMAU, values);
            await dispatch(fetch_colors({ _limit: pagination._limit, _page: pagination._page }));
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
            const { message } = await mausacApi.delete(id);
            await dispatch(fetch_colors({ _limit: pagination._limit, _page: pagination._page }));
            toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }
    return (
        <div className='color'>
            <div className="content-color">
                <div className="title-header">
                    <h4>Quản lý màu sắc </h4>
                    <div className="add-sp">
                        <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm màu sắc
                        </Button>
                        <Modal
                            title="Thêm màu sắc"
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
                                    label="Tên màu sắc"
                                    name="MS_TENMAU"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tên màu sắc không được bỏ trống"
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
                <div className='color-table'>
                    <p>Tổng số: {colors?.length < pagination?._limit ? colors.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                    <Table
                        columns={columns}
                        dataSource={colors}
                        pagination={false}
                    />
                    <div className="mt-3">
                        <Pagination
                            pageSize={1}
                            current={pagination._page}
                            total={pagination._totalPage}
                            onChange={(page) => dispatch(savePagination({ screen: 'colors', page }))}
                        >
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Color;