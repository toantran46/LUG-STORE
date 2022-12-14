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
                            label="T??n"
                            rules={[
                                {
                                    required: true,
                                    message: "T??n kh??ng ???????c b??? tr???ng",
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="loaisp"
                            label="Lo???i"
                        >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="thuonghieu"
                            label="Th????ng hi???u"
                        >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="khuyenmai"
                            label="Khuy???n m??i"
                        >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="gia"
                            label="Gi??"
                            rules={[
                                {
                                    required: true,
                                    message: "Gi?? kh??ng ???????c b??? tr???ng",
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
                            label="H??nh ???nh"
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
                            label="S??? l?????ng"
                            rules={[
                                {
                                    required: true,
                                    message: "S??? l?????ng kh??ng ???????c b??? tr???ng",
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mausac"
                            label="M??u s???c"
                        >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="chatlieu"
                            label="Ch???t li???u"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="kichthuoc"
                            label="K??ch th?????c"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="cannang"
                            label="C??n n???ng"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="songan"
                            label="S??? ng??n"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="tinhnang"
                            label="T??nh n??ng"
                        >
                            <TextArea />
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>Th??m s???n ph???m</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default ProductForm;