import { React, useState } from 'react';
import PropTypes from 'prop-types';
import "./Product.scss";
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Pagination, Row, Select } from 'antd';
import ProductTable from 'features/Admin/components/ProductTable';
import ProductForm from 'features/Admin/components/ProductForm';

Product.propTypes = {

};

function Product(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='product'>
            <div className="content">
                <div className="title-header">
                    <h4>Quản lý sản phẩm</h4>
                    <div className="add-sp">
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm sản phẩm
                        </Button>
                        <Modal
                            title="Thêm sản phẩm"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1200}

                        >
                            <ProductForm />
                        </Modal>
                    </div>
                </div>
                <ProductTable />
                <div className="pagination">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </div>
    );
}

export default Product;