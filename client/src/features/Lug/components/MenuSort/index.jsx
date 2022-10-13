import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Select, Slider } from 'antd';
import './MenuSort.scss';
import { mausacApi } from 'api/mausacApi';
import { thuonghieuApi } from 'api/thuonghieuApi';

MenuSort.propTypes = {

};
const { Option } = Select;

function MenuSort(props) {
    const [isRegencys, setIsRegencys] = React.useState()
    const [isColors, setIsColors] = React.useState()
    const handleChangeRegency = () => {

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
                // console.log(result)
                setIsColors(result?.map((e) => (
                    <li className={`swatch-${e.MS_TENMAU}`}>
                        <p title={e.MS_TENMAU}></p>
                    </li>
                )));

            } catch (error) {
                console.log(error);
            }
        }
        fetch_regencys();
        fetch_colors();
    }, [])
    const onChange = (value) => {
        console.log('onChange: ', value);
    };

    const onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
    };
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
                    max={2000000}
                    range
                    step={100000}
                    defaultValue={[200000, 500000]}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                />
            </div>
            <div className="menu__color">
                <p className='title_custom'>Màu sắc</p>
                <div className="swatch-list-color">
                    <ul className='list-color'>
                        {isColors && isColors}
                        {/* <li className='swatch-yellow'>
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
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MenuSort;