import React from 'react';
import PropTypes from 'prop-types';
import './Order.scss';
import OrderTable from 'features/Admin/components/OrderTable';
import { Button, Modal, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import OrderDetailTable from 'features/Admin/components/OrderDetailTable';

// Order.propTypes = {
//     showModal: PropTypes.func,
// };

// Order.defaultProps = {
//     showModal: ''
// }

function Order(props) {
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
        <div className='order'>
            <div className="content-order">
                <div className="title-header">
                    <h4>Quản lý đơn đặt hàng</h4>
                    <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                        Thêm sản phẩm
                    </Button>
                    <div className="order-detail">
                        <Modal
                            title="Chi tiết đơn hàng"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1000}
                        >
                            <OrderDetailTable />
                        </Modal>
                    </div>
                </div>
                <OrderTable />
            </div>
        </div>
    );
}

export default Order;