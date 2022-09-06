import React from 'react';
import PropTypes from 'prop-types';
import { Select, Slider } from 'antd';
import './MenuSort.scss';

MenuSort.propTypes = {

};
const { Option } = Select;

function MenuSort(props) {
    const onChange = (value) => {
        console.log('onChange: ', value);
    };

    const onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
    };
    return (
        <div className='menu'>
            <div className="menu__brand">
                <p>Thương hiệu</p>
                <Select placeholder="Chọn thương hiệu" style={{ width: 200 }}>
                    <Option value="">
                        Aber
                    </Option>
                    <Option value="">
                        Aber
                    </Option>
                    <Option value="">
                        Aber
                    </Option>
                </Select>
            </div>
            <div className="menu__price">
                <p>Mức giá</p>
                <Slider
                    max={2000000}
                    range
                    step={100000}
                    defaultValue={[200000, 500000]}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                />
            </div>
            <div className="menu__color">
                <p>Màu sắc</p>
                <div className="swatch-list-color">
                    <ul className='list-color'>
                        <li className='swatch-yellow'>
                            <p title='yellow'></p>
                        </li>
                        <li className='swatch-red'>
                            <p title='red'></p>
                        </li>
                        <li className='swatch-white'>
                            <p title='white'></p>
                        </li>
                        <li className='swatch-black'>
                            <p title='black'></p>
                        </li>
                        <li className='swatch-green'>
                            <p title='green'></p>
                        </li>
                        <li className='swatch-orange'  >
                            <p title='orange'></p>
                        </li>
                        <li className='swatch-blue'  >
                            <p title='blue'></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MenuSort;