import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Select, Slider } from 'antd';
import './MenuSort.scss';
import { mausacApi } from 'api/mausacApi';
import { thuonghieuApi } from 'api/thuonghieuApi';

function MenuSort(props) {
    const [isRegencys, setIsRegencys] = React.useState()
    const [isColors, setIsColors] = React.useState()
    const [colorClick, setColorClick] = React.useState();
    const [priceFrom, setPriceFrom] = React.useState();
    const [priceTo, setPriceTo] = React.useState();
    const handleChangeRegency = (value) => {
        props.brandChange(value)
    }

    React.useEffect(() => {
        const fetch_regencys = async () => {
            try {
                const { result } = await thuonghieuApi.getAll();
                // console.log(result)
                setIsRegencys(result?.map((e) => (
                    { label: e.TH_TENTHUONGHIEU, value: e.TH_MATHUONGHIEU }
                )));

            } catch (error) {
                console.log(error);
            }
        }
        const fetch_colors = async () => {
            try {
                const { result } = await mausacApi.getAll();
                console.log(result)
                setIsColors(result);

            } catch (error) {
                console.log(error);
            }
        }
        fetch_regencys();
        fetch_colors();
    }, [])
    // const onChange = (value) => {
    //     console.log('onChange: ', value);
    // };

    const onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
        props.price(value)
    };
    const handleClickColor = (data) => {
        setColorClick(data);
        props.colorChange(data.MS_MAMAU);
        // console.log(data)
    }
    return (
        <div className='menu'>
            <div className="menu__brand">
                <p className='title_custom'>Thương hiệu</p>
                <div className="list-brand">
                    <Checkbox.Group onChange={handleChangeRegency} options={isRegencys} />
                </div>
            </div>
            <div className="menu__price">
                <p className='title_custom'>Mức giá</p>
                <Slider
                    max={3000000}
                    range
                    step={100000}
                    defaultValue={[100000, 3000000]}
                    onAfterChange={onAfterChange}
                />
            </div>
            <div className="menu__color">
                <p className='title_custom'>Màu sắc</p>
                <div className="swatch-list-color">
                    <ul className='list-color'>
                        {isColors?.map((e) => (
                            <li key={e.MS_MAMAU} onClick={() => handleClickColor(e)} className={`swatch ${colorClick?.MS_MAMAU === e.MS_MAMAU ? 'active' : ''}`}>
                                <p style={{ backgroundColor: e.MS_TENMAU }} title={`${e.MS_TENMAU}`}></p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MenuSort;