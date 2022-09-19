import React from 'react';
import PropTypes from 'prop-types';
import './Brand.scss';
import { Button, Form, Input, Modal, Pagination, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
Brand.propTypes = {

};
const columns = [
    {
        title: 'Mã thương hiệu',
        dataIndex: 'mathuonghieu',
        width: 600,
    },
    {
        title: 'Tên thương hiệu',
        dataIndex: 'tenthuonghieu',
        width: 600,
    },
    {
        title: 'Thao tác',
        dataIndex: 'mathuonghieu',
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
        mathuonghieu: `Edward King ${i}`,
        tenthuonghieu: `Edward King ${i}`,
        thaotac: '',
    })
}

function Brand(props) {
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
        <div className='brand'>
            <div className="content-brand">
                <div className="title-header">
                    <h4>Quản lý thương hiệu </h4>
                    <div className="add-sp">
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm thương hiệu
                        </Button>
                        <Modal
                            title="Thêm thương hiệu"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <Form
                                layout='horizontal'
                            >
                                <Form.Item
                                    label="Tên thương hiệu"
                                    name="tenthuonghieu"
                                >
                                    <Input />
                                </Form.Item>
                                <Button htmlType='subit' type='primary'>Thêm</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='brand-table'>
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

export default Brand;