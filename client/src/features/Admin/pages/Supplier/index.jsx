import React from 'react';
import PropTypes from 'prop-types';
import './Supplier.scss';
import { Button, Form, Input, Modal, Pagination, Select, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
Supplier.propTypes = {

};
const columns = [
    {
        title: 'Mã nhà cung cấp',
        dataIndex: 'mancc',
        width: 600,
    },
    {
        title: 'Tên nhà cung cấp',
        dataIndex: 'tenncc',
        width: 600,
    },
    {
        title: 'Địa chỉ nhà cung cấp',
        dataIndex: 'diachincc',
        width: 600,
    },
    {
        title: 'Số điện thoại nhà cung cấp',
        dataIndex: 'sdtncc',
        width: 600,
    },
    {
        title: 'Thao tác',
        dataIndex: 'mancc',
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
        mancc: `Edward King ${i}`,
        tenncc: `Edward King ${i}`,
        diachincc: `Edward King ${i}`,
        sdtncc: `Edward King ${i}`,
        thaotac: '',
    })
}

function Supplier(props) {
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
        <div className='supplier'>
            <div className="content-supplier">
                <div className="title-header">
                    <h4>Quản lý nhà cung cấp </h4>
                    <div className="add-sp">
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm nhà cung cấp
                        </Button>
                        <Modal
                            title="Thêm nhà cung cấp"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <Form
                                layout='horizontal'
                                labelCol={{ span: 5 }}
                            >
                                <Form.Item
                                    label="Tên"
                                    name="tenncc"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="sdtncc"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ"
                                    name="diachincc"
                                >
                                    <Input />
                                </Form.Item>
                                <Button htmlType='subit' type='primary'>Thêm</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='supplier-table'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                    {
                        data.length >= 5
                            ?
                            <div className="mt-3">
                                <Pagination defaultCurrent={1} total={50} />
                            </div>
                            : ""
                    }
                </div>
            </div>
        </div>
    );
}

export default Supplier;