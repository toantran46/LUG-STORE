import React from 'react';
import PropTypes from 'prop-types';
import './Employee.scss';
import { Button, DatePicker, Form, Input, Modal, Pagination, Radio, Select, Space, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
Employee.propTypes = {

};
const columns = [
    {
        title: 'Email ',
        dataIndex: 'emailnv',
        width: 200,
    },
    {
        title: 'Họ tên',
        dataIndex: 'hotennv',
        width: 200,
    },
    {
        title: 'Chức vụ',
        dataIndex: 'chucvunv',
        width: 200,
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'ngaysinhnv',
        width: 200,
    },
    {
        title: 'Giới tính',
        dataIndex: 'gioitinhnv',
        width: 200,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'diachinv',
        width: 200,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'sdtnv',
        width: 200,
    },
    {
        title: 'Thao tác',
        dataIndex: 'manv',
        // width: 100,
        render: (id, row) =>
            <div className="changes">
                <Button
                // onClick={ }
                >
                    <EditFilled />
                </Button>
                <Button>
                    <span className='delete-icon'><DeleteFilled /></span>
                </Button>

            </div>
    }
];

const data = [];

for (let i = 0; i < 2; i++) {
    data.push({
        key: i,
        emailnv: `Edward King ${i}`,
        hotennv: `Edward King ${i}`,
        chucvunv: `Edward King ${i}`,
        ngaysinhnv: `Edward King ${i}`,
        gioitinhnv: `Edward King ${i}`,
        diachinv: `Edward King ${i}`,
        sdtnv: `Edward King ${i}`,
        thaotac: '',
    })
}

function Employee(props) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChangeBirthday = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div className='employee'>
            <div className="content-employee">
                <div className="title-header">
                    <h4>Quản lý nhân viên </h4>
                    <div className="add-sp">
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm nhân viên
                        </Button>
                        <Modal
                            title="Thêm nhân viên"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <Form
                                layout='horizontal'
                                labelCol={{ span: 7 }}
                            >
                                <Form.Item
                                    label="Email"
                                    name="emailnv"
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
                                <Form.Item
                                    name="password"
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
                                </Form.Item>
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
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder='Mật khẩu ít nhất có 4 kí tự' />
                                </Form.Item>
                                <Form.Item
                                    label="Họ tên"
                                    name="hotennv"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Họ tên không được bỏ trống"
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Chức vụ" name="chucvunv">
                                    <Select>
                                        <Select.Option value="a">Quản lý</Select.Option>
                                        <Select.Option value="b">Nhân viên</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Ngày sinh" name="ngaysinhnv">
                                    <Space style={{ width: '100%' }}>
                                        <DatePicker onChange={onChangeBirthday} />
                                    </Space>
                                </Form.Item>
                                <Form.Item label="Giới tính" name="gioitinhnv">
                                    <Space style={{ width: '100%' }}>
                                        <Radio.Group defaultValue={1}>
                                            <Radio value={1}>Nam</Radio>
                                            <Radio value={2}>Nữ</Radio>
                                        </Radio.Group>
                                    </Space>
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="sdtnv"
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
                                    name="diachinv"
                                >
                                    <TextArea />
                                </Form.Item>
                                <Button htmlType='subit' type='primary'>Thêm</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='employee-table'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                    {
                        data.length >= 5
                            ?
                            <div className="mt-3">
                                <Pagination defaultCurrent={1} total={50} />
                            </div>
                            : ""
                    }
                </div>
            </div>
        </div>
    );
}

export default Employee;