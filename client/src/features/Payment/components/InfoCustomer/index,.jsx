import { React, useState } from 'react';
import PropTypes from 'prop-types';
import "./InfoCustom.scss"
import { Button, Checkbox, Form, Input, Radio, Select, Space, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

InfoCustom.propTypes = {

};


function InfoCustom(props) {
    const [inputSwitch, setInputSwitch] = useState(false);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const handChangeAddress = () => {
        console.log('123')
    }
    return (
        <div className='info-custom'>
            <Form
                layout='vertical'
                onFinish={onFinish}
            >
                <div className="main-header">
                    <h5>Thông tin mua hàng</h5>
                    <Form
                        layout='vertical'
                        disabled
                    >
                        <Form.Item label="Email">
                            <Input value={"trongtoan@gmail.com"} />
                        </Form.Item>
                        <Form.Item label="Họ tên">
                            <Input value={"Trần Toàn"} />
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input value={"012301321"} />
                        </Form.Item>
                        {!inputSwitch ?
                            <Form.Item label="Địa chỉ">
                                <Input value={"123 Nguyễn Trãi"} />
                            </Form.Item>
                            : ""}
                    </Form>
                    <div className="change-address">
                        Bạn có muốn thay đổi địa chỉ giao hàng ? &nbsp;
                        <Switch
                            checked={inputSwitch}
                            onChange={() => {
                                setInputSwitch(!inputSwitch);
                            }}
                            checkedChildren="Có"
                            unCheckedChildren="Không" />
                    </div>
                    {inputSwitch ?
                        <div className="change-address">
                            <Form.Item
                                label="Tỉnh thành"
                                name="tinh"
                            >
                                <Select placeholder="Lựa chọn tỉnh">
                                    <Select.Option value="Cần Thơ">Cần Thơ</Select.Option>
                                    <Select.Option value="Cần Thơ">Cần Thơ</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Quận huyện"
                                name="huyen"
                            >
                                <Select placeholder="Lựa chọn quận huyện">
                                    <Select.Option value="Cần Thơ">Cần Thơ</Select.Option>
                                    <Select.Option value="Cần Thơ">Cần Thơ</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Phường xã"
                                name="xa"
                            >
                                <Select placeholder="Lựa chọn phường xã">
                                    <Select.Option value="Cần Thơ">Cần Thơ</Select.Option>
                                    <Select.Option value="Cần Thơ">Cần Thơ</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Số nhà"
                                name="ghichu"
                            >
                                <TextArea placeholder='(tùy chọn)' />
                            </Form.Item>
                        </div>
                        : ""}
                </div>
                {/* <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
            </Form>
        </div>
    );
}

export default InfoCustom;