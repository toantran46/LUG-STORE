import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';

ProductTypeTable.propTypes = {

};

const columns = [
    {
        title: 'Mã loại sản phẩm',
        dataIndex: 'maloai',
        width: 600,
    },
    {
        title: 'Tên loại sản phẩm',
        dataIndex: 'tenloai',
        width: 600,
    },
    {
        title: 'Thao tác',
        dataIndex: 'ma',
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
        maloai: `Edward King ${i}`,
        tenloai: `Edward King ${i}`,
        thaotac: '',
    })
}

function ProductTypeTable(props) {
    return (
        <div className='product-type-table'>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    );
}

export default ProductTypeTable;