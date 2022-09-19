import React from 'react';
import PropTypes from 'prop-types';
import './Discount.scss';
import { Button, Form, Input, Modal, Pagination, Select, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
Discount.propTypes = {

};
const columns = [
    {
        title: 'Mã khuyến mãi',
        dataIndex: 'makhuyenmai',
        width: 600,
    },
    {
        title: 'Phần trăm được khuyến mãi',
        dataIndex: 'tenkhuyenmai',
        width: 600,
    },
    {
        title: 'Thao tác',
        dataIndex: 'makhuyenmai',
        // width: 100,
        render: (id, row) =>
            <div className="changes">
                <Button
                // onClick={ }
                >
                    <EditFilled />
                </Button>
                <Button>
                    <span className='delete-icon'><DeleteFilled /></span>
                </Button>

            </div>
    }
];

const data = [];

for (let i = 0; i < 2; i++) {
    data.push({
        key: i,
        makhuyenmai: `Edward King ${i}`,
        tenkhuyenmai: `Edward King ${i}`,
        thaotac: '',
    })
}

function Discount(props) {
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
        <div className='discount'>
            <div className="content-discount">
                <div className="title-header">
                    <h4>Quản lý khuyến mãi </h4>
                    <div className="add-sp">
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm khuyến mãi
                        </Button>
                        <Modal
                            title="Thêm khuyến mãi"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <Form
                                layout='horizontal'
                            >
                                <Form.Item
                                    label="Phần trăm khuyến mãi"
                                    name="tenloai"
                                >
                                    <Select>
                                        <Select.Option value={10} >10%</Select.Option>
                                        <Select.Option value={20} >20%</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Button htmlType='subit' type='primary'>Thêm</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='discount-table'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                    <div className="mt-3">
                        <Pagination defaultCurrent={1} total={50} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Discount;