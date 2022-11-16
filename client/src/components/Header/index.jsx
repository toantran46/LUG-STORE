import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { Affix, Avatar, Button, Dropdown, Empty, Input, Menu, Space, Tooltip } from 'antd';
import { ShoppingFilled, SearchOutlined, EnvironmentOutlined, DownOutlined, HeartOutlined, HistoryOutlined, LogoutOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons';
import ModelLogin from 'components/ModelLogin';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'app/authSlice';
import { sanphamApi } from 'api/sanphamApi';
import { format } from 'assets/global/FormatMoney';

Header.propTypes = {
};
const { Search } = Input;

function Header(props) {
    const dispatch = useDispatch();
    const useRef = React.useRef();
    const { cart } = useSelector(state => state.userInfo)
    const [searchValue, setSearchValue] = React.useState();
    const [listProductSearch, setListProductSearch] = React.useState();
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <Link to="/user" state={{ tab: '1', }} >
                            <UserOutlined /> Thông tin cá nhân
                        </Link>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <Link to="/user" state={{ tab: '2', }} >
                            <HistoryOutlined /> Lịch sử mua hàng
                        </Link>
                    ),
                    key: '1',
                },
                {
                    label: (
                        <Link to="/user" state={{ tab: '3', }} >
                            <HeartOutlined /> Sản phẩm yêu thích
                        </Link>
                    ),
                    key: '2',
                },
                {
                    label: (
                        <div onClick={() => dispatch(logout())}>
                            <LogoutOutlined /> Đăng xuất
                        </div>
                    ),
                    key: '3',
                },
            ]}
        />
    );
    const { user, isAuth } = useSelector(state => state.auth);
    const handleSearchValue = (e) => {
        setSearchValue(e.target.value);
    }
    const start = () => {
        voice.start();
        const audio = new Audio('https://www.youtube.com/s/search/audio/open.mp3')
        audio.play();
    }
    React.useEffect(() => {
        if (useRef.current) clearTimeout(useRef.current);
        useRef.current = setTimeout(() => {
            const fetch_search_product = async () => {
                const { result } = await sanphamApi.getAll({ searchBy: searchValue, _page: 1, _limit: 5 })
                // console.log(result)
                setListProductSearch(result);
            }
            fetch_search_product();
        }, 500)
    }, [searchValue])
    const [voice, setVoice] = React.useState();
    React.useEffect(() => {
        var speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        var recognition = new speechRecognition();
        recognition.continuous = false;
        recognition.lang = 'vi-VN';
        // recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        setVoice(recognition);
        recognition.onresult = function (event) {
            var lastResult = event.results.length - 1;
            var content = event.results[lastResult][0].transcript;
            setSearchValue(content);
            console.log(content)
            // message.textContent = 'Voice Input: ' + content + '.';
        };

        recognition.onspeechend = function () {
            recognition.stop();
        };

        recognition.onerror = function (event) {

        }
    }, [])
    return (
        <div className="header">
            <div className="test">
                <div className="header-contact">
                    <div className="left">
                        <span><b>1800 6868 </b>(miễn phí) - Giao hàng toàn quốc</span>
                    </div>
                    {isAuth ?
                        <div className="mode-user">
                            <Dropdown
                                overlay={menu}
                                trigger={['click']}
                                placement="bottom"
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <div className="avatar">
                                            <Avatar src={user?.TV_AVATAR || "https://joeschmoe.io/api/v1/random"} />
                                        </div>
                                        {user?.TV_HOTEN}
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>

                        :
                        <>
                            <ModelLogin />
                        </>
                    }

                </div>
            </div>
            <Affix offsetTop={0}>
                <div style={{ backgroundColor: '#fff' }}>
                    <div className='header-container'>
                        <div className="header-container__top-left">
                            <div className="logo">
                                <Link to="/">
                                    <img src="https://bizweb.dktcdn.net/100/349/716/files/lug.svg?v=1645757332903" />
                                </Link>
                            </div>
                            <div className="menu">
                                <ul>
                                    <li>
                                        <Link state={{ LOAISANPHAM: 'KUF0EuDO', TENLOAI: 'BALO' }} to="/category">BALO</Link>
                                    </li>
                                    <li>
                                        <Link state={{ LOAISANPHAM: 'doBujKEr', TENLOAI: 'TÚI XÁCH' }} to="/category">TÚI XÁCH</Link>
                                    </li>
                                    <li>
                                        <Link state={{ LOAISANPHAM: 'vqgBDQ8C', TENLOAI: 'PHỤ KIỆN' }} to="/category">PHỤ KIỆN</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="header-container__top-right">
                            <div className="search">
                                <Input onChange={(e) => handleSearchValue(e)} value={searchValue} placeholder='Bạn cần tìm sản phẩm gì?' onSubmit={null} />
                                <div className="search-icon">
                                    <SearchOutlined style={{ marginRight: '8px' }} />
                                    <AudioOutlined onClick={() => start()} />
                                </div>
                                <div className='suggestion-list'>
                                    {searchValue && <> {listProductSearch?.map((product, indx) => (
                                        <Link className='suggestion-item' key={indx} to={`/products/${product.SP_MA}`}>
                                            <div className="suggestion-list__suggestion">
                                                <div className="suggestion-list__suggestion__img">
                                                    <Avatar shape="square" src={product.HASP_DUONGDAN} />
                                                </div>
                                                <div className="suggestion-info">
                                                    <div className="suggestion-list__suggestion__name">
                                                        {product.SP_TEN}
                                                    </div>
                                                    <div className="suggestion-list__suggestion__price">
                                                        {format(product.SP_GIABAN || product.SP_GIAGOC)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                        {listProductSearch.length < 1 && <Empty description={<p>Không tìm thấy sản phấm</p>} />}
                                    </>}
                                </div>
                            </div>
                            <Link to="/map">
                                <div className='map'>
                                    <EnvironmentOutlined />
                                </div>
                            </Link>
                            <div className="cart">
                                <Link to="/cart">
                                    <Tooltip placement="bottom" color="red" title="Xem giỏ hàng">
                                        <div className="custom-cart">
                                            <div className="count-cart">
                                                <span>{cart?.length}</span>
                                            </div>
                                            <ShoppingFilled />
                                        </div>
                                    </Tooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Affix>
        </div>

    );
}

export default Header;