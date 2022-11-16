import React from 'react';
import PropTypes from 'prop-types';
import './Member.scss';
import { Button, Form, Input, Modal, Pagination, Popconfirm, Select, Table, Space, Radio, Upload, Avatar } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined, UploadOutlined, CameraOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSucsess } from 'utils/notification';
import { fetch_members, savePagination } from 'features/Admin/adminSlice';
import { thanhvienApi } from 'api/thanhvienApi';
import Search from 'antd/lib/transfer/search';
Member.propTypes = {

};
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

function Member(props) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState();
    const [rowSelected, setRowSelected] = React.useState([]);
    const [fileList, setFileList] = React.useState({});

    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const {
        data: { members },
        pagination: { members: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        TV_AVATAR: '',
        TV_EMAIL: '',
        TV_HOTEN: '',
        TV_GIOITINH: '',
        TV_DIACHI: '',
        TV_SODIENTHOAI: '',
    }
    const columns = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'TV_AVATAR',
            width: 200,
            render: (id, row) =>
                <Avatar src={id} shape="square" />
        },
        {
            title: 'Email ',
            dataIndex: 'TV_EMAIL',
            width: 200,
        },
        {
            title: 'Họ tên',
            dataIndex: 'TV_HOTEN',
            width: 200,
        },
        {
            title: 'Giới tính',
            dataIndex: 'TV_GIOITINH',
            width: 200,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'TV_DIACHI',
            width: 200,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'TV_SODIENTHOAI',
            width: 200,
        },
        {
            title: 'Thao tác',
            dataIndex: 'TV_ID',
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


    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setRowSelected(row)
        setFileList({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: row.TV_AVATAR
        })
        // console.log(row);
        form.setFieldsValue(row);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSave = async (values) => {
        try {
            setIsLoading(true);
            const data = new FormData();
            data.append('TV_HOTEN', values.TV_HOTEN)
            data.append('TV_GIOITINH', values.TV_GIOITINH)
            data.append('TV_SODIENTHOAI', values.TV_SODIENTHOAI)
            data.append('TV_DIACHI', values.TV_HOTEN)
            data.append('TV_AVATAR', values.TV_AVATAR)
            console.log(values)
            // console.log(fileList)
            // return;
            const { message } = await thanhvienApi.update(rowSelected.TV_ID, data);
            await dispatch(fetch_members({ _limit: pagination._limit, _page: pagination._page }));
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
            const { message } = await thanhvienApi.delete(id);
            await dispatch(fetch_members({ _limit: pagination._limit, _page: pagination._page }));
            toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }

    const handleCancelPreview = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ file: newFileList }) => {
        console.log(newFileList);
        setFileList(newFileList)
        form.setFieldValue('TV_AVATAR', newFileList);
    };

    const handleUpload = (list, fileList) => {
        if (list.type == "image/png" || list.type == "image/jpg" || list.type == "image/jpeg") {
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
                    <div className="search">
                        <Search placeholder="Tìm kiếm thành viên" onSearch={''} style={{ width: '100%' }} enterButton />
                    </div>
                    <div className="add-sp">
                        <Modal
                            title="Thành viên"
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
                                    label="Ảnh đại diện "
                                    name="TV_AVATAR"
                                >
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        onPreview={handlePreview}
                                        fileList={[fileList]}
                                        onChange={handleChange}
                                        beforeUpload={handleUpload}
                                        maxCount={1}
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
                                {!isEdit ?
                                    <Form.Item
                                        label="Email"
                                        name="TV_EMAIL"
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
                                <Form.Item
                                    label="Họ tên"
                                    name="TV_HOTEN"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Họ tên không được bỏ trống"
                                        },
                                    ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Giới tính" name="TV_GIOITINH">
                                    <Select options={[{ value: 'Nam', labe: 'Nam' }, { value: 'Nữ', labe: 'Nữ' }]} />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="TV_SODIENTHOAI"
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
                                    name="TV_DIACHI"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Địa chỉ không được bỏ trống"
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
                <div className='member-table'>
                    <p>Tổng số: {members?.length < pagination?._limit ? members.length : pagination._limit}/ {pagination._totalRecord} bản ghi</p>
                    <Table
                        columns={columns}
                        dataSource={members}
                        pagination={false}
                    />
                    <div className="mt-3">
                        <Pagination
                            pageSize={1}
                            current={pagination._page}
                            total={pagination._totalPage}
                            onChange={(page) => dispatch(savePagination({ screen: 'members', page }))}
                        >
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Member;