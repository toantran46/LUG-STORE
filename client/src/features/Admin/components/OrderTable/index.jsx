import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';

OrderTable.propTypes = {
    showModal: PropTypes.func,
};
OrderTable.defaultProps = {
    showModal: null,
}


const columns = [
    {
        title: 'Mã đơn hàng',
        dataIndex: 'madh',
        width: 200,
    },
    {
        title: 'Email người đặt ',
        dataIndex: 'emailkh',
        width: 200,
    },
    {
        title: 'Phương thức thanh toán',
        dataIndex: 'pttt',
        width: 200,
    },
    {
        title: 'Địa chỉ giao hàng',
        dataIndex: 'dcgh',
        width: 200,
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'tongtien',
        width: 200,
    },
    {
        title: 'Thời gian đặt',
        dataIndex: 'thoigian',
        width: 200,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'trangthai',
        width: 200,
    },
    {
        title: 'Ghi chú',
        dataIndex: 'ghichu',
        width: 200,
    },
    {
        title: 'Thao tác',
        dataIndex: 'ma',
        render: (id, row) =>
            <div className="changes">
                <Button>
                    <EyeFilled />
                </Button>
                <Button>
                    <span className='delete-icon'><DeleteFilled /></span>
                </Button>

            </div>
        ,
    },
];
const data = [];

for (let i = 0; i < 2; i++) {
    data.push({
        key: i,
        madh: `Edward King ${i}`,
        emailkh: `Edward King ${i}`,
        pttt: 12,
        dcgh: `London, Park Lane no. ${i}`,
        tongtien: `Edward King ${i}`,
        thoigian: `Edward King ${i}`,
        trangthai: <Tag icon={<CheckCircleOutlined />} color="success">
            success
        </Tag>,
        ghichu: `Edward King ${i}`,
        thaotac: '',
    });
}

function OrderTable(props) {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    );
}

export default OrderTable;