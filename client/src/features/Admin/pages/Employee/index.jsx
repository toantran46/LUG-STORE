import React from 'react';
import PropTypes from 'prop-types';
import './Employee.scss';
import { Button, Form, Input, message, Modal, Pagination, Popconfirm, Select, Table, Space, DatePicker, Radio } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSucsess } from 'utils/notification';
import { fetch_employees, savePagination } from 'features/Admin/adminSlice';
import { nhanvienApi } from 'api/nhanvienApi';
import TextArea from 'antd/lib/input/TextArea';
import { chucvuApi } from 'api/chucvuApi';
Employee.propTypes = {

};

function Employee(props) {
    const columns = [
        {
            title: 'Email ',
            dataIndex: 'NV_EMAIL',
            width: 200,
        },
        {
            title: 'Họ tên',
            dataIndex: 'NV_HOTEN',
            width: 200,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'CV_TEN',
            width: 200,
        },
        {
            title: 'Giới tính',
            dataIndex: 'NV_GIOITINH',
            width: 200,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'NV_DIACHI',
            width: 200,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'NV_SODIENTHOAI',
            width: 200,
        },
        {
            title: 'Thao tác',
            dataIndex: 'NV_ID',
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
    const [offEmail, setOffEmail] = React.useState();
    const [rowSelected, setRowSelected] = React.useState([]);
    const [isRegency, setIsRegency] = React.useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const {
        data: { employees },
        pagination: { employees: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        CV_MA: '',
        NV_EMAIL: '',
        NV_HOTEN: '',
        NV_GIOITINH: '',
        NV_DIACHI: '',
        NV_SODIENTHOAI: '',
    }

    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
        setOffEmail(true);
        // console.log(row);
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

            const { message } = !isEdit ? await nhanvienApi.post(values) : await nhanvienApi.update(rowSelected.NV_ID, values);
            await dispatch(fetch_employees({ _limit: pagination._limit, _page: pagination._page }));
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
            const { message } = await nhanvienApi.delete(id);
            await dispatch(fetch_employees({ _limit: pagination._limit, _page: pagination._page }));
            toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }
    React.useEffect(() => {
        const fetch_regency_name = async () => {
            try {
                const { result } = await chucvuApi.getAll();
                // console.log(result)
                setIsRegency(result?.map((e) => (
                    { label: e.CV_TEN, value: e.CV_MA }
                )));

            } catch (error) {
                console.log(error);
            }
        }
        fetch_regency_name();
    }, [])

    return (
        <div className='employee'>
            <div className="content-employee">
                <div className="title-header">
                    <h4>Quản lý nhân viên </h4>
                    <div className="add-sp">
                        <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm nhân viên
                        </Button>
                        <Modal
                            title="Nhân viên"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <Form
                                layout='horizontal'
                                labelCol={{ span: 7 }}
                                form={form}
                                onFinish={handleSave}
                                initialValues={initialValues}
                            >   {!offEmail ?
                                <Form.Item
                                    label="Email"
                                    name="NV_EMAIL"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Email không được bỏ trống"
                                        },
                                        {
                                            type: 'email',
                                            message: 'Email phải đúng định dạng'
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                : ''}
                                {isEdit ? "" :
                                    <Form.Item
                                        name="MATKHAU"
                                        label="Mật khẩu"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập mật khẩu",
                                            },
                                            {
                                                min: 4,
                                                message: "Mật khẩu có độ dài ít nhất 4 kí tự",
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password placeholder='Mật khẩu ít nhất có 4 kí tự' />
                                    </Form.Item>}
                                {isEdit ? "" :
                                    <Form.Item
                                        name="confirmPass"
                                        label="Xác nhận mật khẩu"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập mật khẩu",
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('MATKHAU') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password placeholder='Mật khẩu ít nhất có 4 kí tự' />
                                    </Form.Item>
                                }

                                <Form.Item
                                    label="Họ tên"
                                    name="NV_HOTEN"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Họ tên không được bỏ trống"
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Chức vụ"
                                    name="CV_MA"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chức vụ không được bỏ trống"
                                        },
                                    ]}
                                >
                                    <Select options={isRegency}>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Giới tính" name="NV_GIOITINH">
                                    <Select options={[{ value: 'Nam', labe: 'Nam' }, { value: 'Nữ', labe: 'Nữ' }]} />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="NV_SODIENTHOAI"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Số điện thoại không được bỏ trống"
                                        },
                                        {
                                            min: 10,
                                            max: 10,
                                            message: "Vui lòng nhập đúng số điện thoại",
                                        },
                                        {
                                            value: [0 - 9],
                                            message: "Vui lòng chỉ nhập số",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ"
                                    name="NV_DIACHI"
                                >
                                    <TextArea />
                                </Form.Item>
                                <Button htmlType='submit' loading={isLoading} type='primary'>Lưu</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='employee-table'>
                    <p>Tổng số: {employees?.length < pagination?._limit ? employees.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                    <Table
                        columns={columns}
                        dataSource={employees}
                        pagination={false}
                    />
                    <div className="mt-3">
                        <Pagination
                            pageSize={1}
                            current={pagination._page}
                            total={pagination._totalPage}
                            onChange={(page) => dispatch(savePagination({ screen: 'employees', page }))}
                        >
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employee;