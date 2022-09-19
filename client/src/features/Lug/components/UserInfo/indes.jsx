import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Avatar } from 'antd';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Form, Input, Tabs, DatePicker, Radio, Space } from 'antd';
import "./UserInfo.scss";
UserInfo.propTypes = {

};
const dateFormat = 'YYYY-MM-DD';

function UserInfo(props) {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div className='user-info'>
            <div className="content">
                <div className="title">
                    <h4>THÔNG TIN CÁ NHÂN</h4>
                </div>
                <div className="avatar">
                    <Avatar size={100} src="https://joeschmoe.io/api/v1/random" />
                </div>
                <Upload {...props}>
                    <Button><CameraOutlined style={{ fontSize: 20 }} /></Button>
                </Upload>
                <Form
                    layout='vertical'
                >
                    <Form.Item label="Email">
                        <Input value={"trongtoan@gmail.com"} />
                    </Form.Item>
                    <Form.Item label="Họ tên">
                        <Input value={"Trần Toàn"} />
                    </Form.Item>
                    <Form.Item label="Ngày sinh">
                        <Space style={{ width: '100%' }}>
                            <DatePicker defaultValue={moment('2015-06-06', dateFormat)} onChange={onChange} />
                        </Space>
                    </Form.Item>
                    <Form.Item label="Giới tính">
                        <Space style={{ width: '100%' }}>
                            <Radio.Group defaultValue={1}>
                                <Radio value={1}>Nam</Radio>
                                <Radio value={2}>Nữ</Radio>
                            </Radio.Group>
                        </Space>
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        <Input value={"012301321"} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ">
                        <Input value={"123 Nguyễn Trãi"} />
                    </Form.Item>
                    <Button htmlType='submit' type="primary" block>
                        Cập nhật thông tin
                    </Button>

                </Form>
            </div>
        </div>
    );
}

export default UserInfo;