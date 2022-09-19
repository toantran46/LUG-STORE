import { React, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Button, Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

ProductForm.propTypes = {

};
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });


function ProductForm(props) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const handleUpload = (list, fileList) => {
        if (list.type == "image/png" || list.type == "image/jpg") {
            return false
        }
        else {
            return true
        }
    }
    return (
        <div className='product-form'>
            <Form
                layout='horizontal'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 14 }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="tensp"
                            label="Tên"
                            rules={[
                                {
                                    required: true,
                                    message: "Tên không được bỏ trống",
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="loaisp"
                            label="Loại"
                        >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="thuonghieu"
                            label="Thương hiệu"
                        >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="khuyenmai"
                            label="Khuyến mãi"
                        >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="gia"
                            label="Giá"
                            rules={[
                                {
                                    required: true,
                                    message: "Giá không được bỏ trống",
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
                            label="Hình ảnh"
                        >
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={handleUpload}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewOpen}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
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
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="soluong"
                            label="Số lượng"
                            rules={[
                                {
                                    required: true,
                                    message: "Số lượng không được bỏ trống",
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mausac"
                            label="Màu sắc"
                        >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="chatlieu"
                            label="Chất liệu"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="kichthuoc"
                            label="Kích thước"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="cannang"
                            label="Cân nặng"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="songan"
                            label="Số ngăn"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="tinhnang"
                            label="Tính năng"
                        >
                            <TextArea />
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>Thêm sản phẩm</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default ProductForm;