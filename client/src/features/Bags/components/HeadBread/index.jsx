import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import './HeadBread.scss';

HeadBread.propTypes = {

};
const { Option } = Select;

function HeadBread(props) {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className='head-bread'>
            <div className="watching">
                <span>BẠN ĐANG XEM: BALO</span>
            </div>
            <div className="sort-dropdown">
                <Select
                    placeholder="SẮP XẾP"
                    defaultValue={null}
                    style={{
                        width: 150,
                    }}
                    onChange={handleChange}
                >
                    <Option value="jack">Tên A-Z</Option>
                    <Option value="lucy">Tên Z-A</Option>
                    <Option value="lucy">Giá thấp đến cao</Option>
                    <Option value="lucy">Giá cao đến thấp</Option>
                </Select>
            </div>
        </div>
    );
}

export default HeadBread;