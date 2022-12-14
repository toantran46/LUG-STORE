import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Avatar, Modal, Select } from 'antd';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Form, Input, Tabs, DatePicker, Radio, Space } from 'antd';
import "./UserInfo.scss";
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import { thanhvienApi } from 'api/thanhvienApi';
import { toastError, toastSucsess } from 'utils/notification';
import { getMe } from 'app/authSlice';
UserInfo.propTypes = {

};

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

function UserInfo(props) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = React.useState(false);
    const [fileList, setFileList] = React.useState({});

    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');

    // console.log(user);

    const initialValues = {
        TV_AVATAR: user?.TV_AVATAR,
        TV_EMAIL: user?.TV_EMAIL,
        TV_HOTEN: user?.TV_HOTEN,
        TV_GIOITINH: user?.TV_GIOITINH,
        TV_DIACHI: user?.TV_DIACHI,
        TV_SODIENTHOAI: user?.TV_SODIENTHOAI,
    }

    const handleChange = ({ file: newFileList }) => setFileList(newFileList);

    const handleUpload = (list, fileList) => {
        console.log(list);
        if (list.type == "image/png" || list.type == "image/jpg" || list.type == "image/jpeg") {
            return false
        }
        else {
            return true
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

    const handleUpdate = async (values) => {
        try {
            setIsLoading(true);

            console.log(values)

            const { message } = await thanhvienApi.update(user?.TV_ID, values);
            dispatch(getMe());
            setIsLoading(false);
            toastSucsess(message);

        } catch (error) {
            setIsLoading(false);
            toastError(error.response.data.message);
        }
    }
    return (
        <div className='user-info'>
            <div className="content">
                <div className="title">
                    <h4>TH??NG TIN C?? NH??N</h4>
                </div>
                <div className="avatar">
                    <Avatar size={100} src={user?.TV_AVATAR || "https://joeschmoe.io/api/v1/random"} />
                </div>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleUpdate}
                    initialValues={initialValues}
                >
                    <Form.Item
                        name="TV_AVATAR"
                    >
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={handleUpload}
                            maxCount={1}
                        >
                            <UploadOutlined className='pr-1' />T???i l??n
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
                        name="TV_EMAIL"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="H??? t??n"
                        name="TV_HOTEN"
                        rules={[
                            {
                                required: true,
                                message: "H??? t??n kh??ng ???????c b??? tr???ng"
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gi???i t??nh"
                        name="TV_GIOITINH"
                    >
                        <Select options={[{ value: 'Nam', labe: 'Nam' }, { value: 'N???', labe: 'N???' }]} />
                    </Form.Item>
                    <Form.Item
                        label="S??? ??i???n tho???i"
                        name="TV_SODIENTHOAI"
                        rules={[
                            {
                                required: true,
                                message: "S??? ??i???n tho???i kh??ng ???????c b??? tr???ng"
                            },
                            {
                                min: 10,
                                max: 10,
                                message: "Vui l??ng nh???p ????ng s??? ??i???n tho???i",
                            },
                            {
                                value: [0 - 9],
                                message: "Vui l??ng ch??? nh???p s???",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="?????a ch???"
                        name="TV_DIACHI"
                    >
                        <TextArea />
                    </Form.Item>
                    <Button htmlType='submit' loading={isLoading} type="primary" block>
                        C???p nh???t th??ng tin
                    </Button>

                </Form>
            </div>
        </div>
    );
}

export default UserInfo;