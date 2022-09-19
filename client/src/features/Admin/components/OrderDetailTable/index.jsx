import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Table } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';

OrderDetailTable.propTypes = {

};

const columns = [
    {
        title: 'Hình ảnh',
        dataIndex: 'hinhanh',
    },
    {
        title: 'Tên sản phẩm ',
        dataIndex: 'ten',
    },
    {
        title: 'Loại',
        dataIndex: 'loai',
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'thuonghieu',
    },
    {
        title: 'Khuyến mãi',
        dataIndex: 'khuyenmai',
    },
    {
        title: 'Giá',
        dataIndex: 'gia',
    },
    {
        title: 'Số lượng',
        dataIndex: 'soluong',
    },
    {
        title: 'Màu sắc',
        dataIndex: 'mausac',
    },
];
const data = [];

for (let i = 0; i < 2; i++) {
    data.push({
        key: i,
        hinhanh:
            <Image
                width={70}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />,
        ten: `Edward King ${i}`,
        loai: 12,
        thuonghieu: `London, Park Lane no. ${i}`,
        khuyenmai: `Edward King ${i}`,
        soluong: `Edward King ${i}`,
        mausac: `Edward King ${i}`,
    });
}

function OrderDetailTable(props) {
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

export default OrderDetailTable;