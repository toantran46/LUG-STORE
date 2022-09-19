import React from 'react';
import PropTypes from 'prop-types';
import './Regency.scss';
import { Button, Form, Input, Modal, Pagination, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
Regency.propTypes = {

};

const columns = [
    {
        title: 'Mã chức vụ',
        dataIndex: 'macv',
        width: 600,
    },
    {
        title: 'Tên chức vụ',
        dataIndex: 'tencv',
        width: 600,
    },
    {
        title: 'Diễn giải chức vụ',
        dataIndex: 'diengiaicv',
        width: 600,
    },
    {
        title: 'Thao tác',
        dataIndex: 'macv',
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
        macv: `Edward King ${i}`,
        tencv: `Edward King ${i}`,
        diengiaicv: `Edward King ${i}`,
        thaotac: '',
    })
}

function Regency(props) {
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
        <div className='regency'>
            <div className="content-regency">
                <div className="title-header">
                    <h4>Quản lý chức vụ </h4>
                    <div className="add-sp">
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm chức vụ
                        </Button>
                        <Modal
                            title="Thêm chức vụ"
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
                                    name="tencv"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Diễn giải"
                                    name="sdtcv"
                                >
                                    <Input />
                                </Form.Item>
                                <Button
                                    htmlType='subit'
                                    type='primary'
                                >
                                    Thêm
                                </Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
                <div className="mt-3">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </div >
    );
}

export default Regency;