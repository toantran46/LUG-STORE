import React from 'react';
import PropTypes from 'prop-types';
import './Color.scss';
import { Button, Form, Input, Modal, Pagination, Select, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
Color.propTypes = {

};
const columns = [
    {
        title: 'Mã màu sắc',
        dataIndex: 'mamausac',
        width: 600,
    },
    {
        title: 'Tên màu sắc',
        dataIndex: 'tenmausac',
        width: 600,
    },
    {
        title: 'Thao tác',
        dataIndex: 'mamausac',
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
        mamausac: `Edward King ${i}`,
        tenmausac: `Edward King ${i}`,
        thaotac: '',
    })
}

function Color(props) {
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
        <div className='color'>
            <div className="content-color">
                <div className="title-header">
                    <h4>Quản lý màu sắc </h4>
                    <div className="add-sp">
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />}>
                            Thêm màu sắc
                        </Button>
                        <Modal
                            title="Thêm màu sắc"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}

                        >
                            <Form
                                layout='horizontal'
                                labelCol={{ span: 5 }}
                            >
                                <Form.Item
                                    label="Tên màu sắc"
                                    name="tenmausac"
                                >
                                    <Input />
                                </Form.Item>
                                <Button htmlType='subit' type='primary'>Thêm</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='color-table'>
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

export default Color;