import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

ProductTypeForm.propTypes = {

};

function ProductTypeForm(props) {
    return (
        <div>
            <div className="product-type-form">
                <Form
                    layout='horizontal'
                >
                    <Form.Item
                        label="Tên loại sản phẩm"
                        name="tenloai"
                    >
                        <Input />
                    </Form.Item>
                    <Button htmlType='subit' type='primary'>Thêm</Button>
                </Form>
            </div>
        </div>
    );
}

export default ProductTypeForm;