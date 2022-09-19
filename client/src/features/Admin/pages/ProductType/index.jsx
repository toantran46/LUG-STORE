import React from 'react';
import PropTypes from 'prop-types';
import './ProductType.scss';
import { Button, Modal, Pagination } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ProductTypeTable from 'features/Admin/components/ProductTypeTable';
import ProductTypeForm from 'features/Admin/components/ProductTypeForm';
ProductType.propTypes = {

};

function ProductType(props) {
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
    return (
        <div className='product-type'>
            <div className="content-product-type">
                <div className="title-header">
                    <h4>Quản lý loại sản phẩm </h4>
                    <div className="add-sp">
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm loại sản phẩm
                        </Button>
                        <Modal
                            title="Thêm loại phẩm"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <ProductTypeForm />
                        </Modal>
                    </div>
                </div>
                <ProductTypeTable />
                <div className="mt-3">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </div>
    );
}

export default ProductType;