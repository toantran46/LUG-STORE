import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './Member.scss';
import { Avatar, Button, DatePicker, Form, Input, Modal, Pagination, Radio, Select, Space, Table, Upload } from 'antd';
import { CameraOutlined, DeleteFilled, EditFilled, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
Member.propTypes = {

};
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

const columns = [
    {
        title: 'Ảnh đại diện',
        dataIndex: 'avatarmb',
        width: 200,
    },
    {
        title: 'Email ',
        dataIndex: 'emailmb',
        width: 200,
    },
    {
        title: 'Họ tên',
        dataIndex: 'hotenmb',
        width: 200,
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'ngaysinhmb',
        width: 200,
    },
    {
        title: 'Giới tính',
        dataIndex: 'gioitinhmb',
        width: 200,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'diachimb',
        width: 200,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'sdtmb',
        width: 200,
    },
    {
        title: 'Thao tác',
        dataIndex: 'mamb',
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
        avatarmb: <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />,
        emailmb: `Edward King ${i}`,
        hotenmb: `Edward King ${i}`,
        ngaysinhmb: `Edward King ${i}`,
        gioitinhmb: `Edward King ${i}`,
        diachimb: `Edward King ${i}`,
        sdtmb: `Edward King ${i}`,
        thaotac: '',
    })
}

function Member(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

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
    const handleCancelPreview = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const handleUpload = (list, fileList) => {
        if (list.type == "image/png" || list.type == "image/jpg") {
            return false
        }
        else {
            return true
        }
    }
    return (
        <div className='member'>
            <div className="content-member">
                <div className="title-header">
                    <h4>Quản lý thành viên </h4>
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
                                labelCol={{ span: 5 }}
                            >
                                <Form.Item
                                    label="Ảnh đại diện "

                                >
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        onPreview={handlePreview}
                                        // onChange={handleChange}
                                        beforeUpload={handleUpload}
                                    >
                                        <UploadOutlined className='pr-1' />Tải lên
                                    </Upload>
                                    <Modal
                                        visible={previewOpen}
                                        title={previewTitle}
                                        footer={null}
                                        onCancel={handleCancelPreview}
                                    >
                                        <img
                                            alt="example"
                                            style={{
                                                width: '100%',
                                            }}
                                            src={previewImage}
                                        />
                                    </Modal>
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="emailmb"
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
                                    label="Họ tên"
                                    name="hotenmb"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Họ tên không được bỏ trống"
                                        },
                                    ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Ngày sinh" name="ngaysinhmb">
                                    <Space style={{ width: '100%' }}>
                                        <DatePicker onChange={onChangeBirthday} />
                                    </Space>
                                </Form.Item>
                                <Form.Item label="Giới tính" name="gioitinhmb">
                                    <Space style={{ width: '100%' }}>
                                        <Radio.Group defaultValue={1}>
                                            <Radio value={1}>Nam</Radio>
                                            <Radio value={2}>Nữ</Radio>
                                        </Radio.Group>
                                    </Space>
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="sdtmb"
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
                                    name="diachimb"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Địa chỉ không được bỏ trống"
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Button htmlType='submit' type='primary'>Thêm</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='member-table'>
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

export default Member;