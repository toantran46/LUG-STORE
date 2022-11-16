import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import './HeadBread.scss';
import { useDispatch } from 'react-redux';
import { onShort } from 'features/Lug/userSlice';
import { useLocation } from 'react-router-dom';

HeadBread.propTypes = {

};
const { Option } = Select;

function HeadBread(props) {
    const dispatch = useDispatch();
    const locate = useLocation();

    const handleChange = (value) => {
        dispatch(onShort(value));

    };
    return (
        <div className='head-bread'>
            <div className="watching">
                <span>BẠN ĐANG XEM: {locate.state.TENLOAI}</span>
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
                    <Option value='{"fieldName": "SP_TEN","fieldValue": "DESC"}'>Tên A-Z</Option>
                    <Option value='{"fieldName": "SP_TEN","fieldValue": "ASC"}'>Tên Z-A</Option>
                    <Option value='{"fieldName": "SP_GIAGOC","fieldValue": "ASC"}'>Giá thấp đến cao</Option>
                    <Option value='{"fieldName": "SP_GIAGOC","fieldValue": "DESC"}'>Giá cao đến thấp</Option>
                </Select>
            </div>
        </div>
    );
}

export default HeadBread;