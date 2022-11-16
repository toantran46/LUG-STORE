import React from 'react';
import PropTypes from 'prop-types';
import './DashBoard.scss';
import { Button, Col, Row } from 'antd';
import { CaretRightOutlined, DollarOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import Rechart from 'features/Admin/components/Rechart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'assets/global/FormatMoney';
import { donhangApi } from 'api/donhangApi';
import { thongkeApi } from 'api/thongkeApi';

DashBoard.propTypes = {

};

function DashBoard(props) {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const { data: { thongkes } } = useSelector(state => state.adminInfo)
    const [statisticalBy, setStatisticalBy] = React.useState({ by: 'day' })
    const [chartData, setChartData] = React.useState()
    const [typeChart, setTypeChart] = React.useState(true)
    console.log(statisticalBy)
    React.useEffect(() => {
        try {
            const fetch_statistical_by = async () => {
                const { result } = await thongkeApi.getThongKeDashboards(statisticalBy)
                setChartData(result);
            }
            fetch_statistical_by();
        } catch (error) {
            console.log(error)
        }
    }, [statisticalBy])
    return (
        <div className='dashboard'>
            <div className="layout-content">
                <div className="row-box">
                    <Row span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content">Doanh thu hôm nay</div>
                                    <h3>{format(thongkes?.DOANHTHUHOMNAY || 0)}đ</h3>
                                </div>
                                <div className="row-right">
                                    <DollarOutlined />
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content">Tổng doanh thu</div>
                                    <h3>{format(thongkes?.TONGDOANHTHU)}đ</h3>
                                </div>
                                <div className="row-right" style={{ backgroundColor: '#FDEC3B' }}>
                                    <DollarOutlined />
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content">Tống người dùng</div>
                                    <h3>{thongkes?.TONGTV}</h3>
                                </div>
                                <div className="row-right" style={{ backgroundColor: '#1890ff' }}>
                                    <UserOutlined />
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content">Tổng đơn hàng</div>
                                    <h3>{thongkes?.TONGDH}</h3>
                                </div>
                                <div className="row-right" style={{ backgroundColor: '#E8282B' }}>
                                    <ShoppingOutlined />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="row-box">
                    <Row span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content-sub">Đơn hàng chưa xử lý</div>
                                    <h3 style={{ color: 'red' }}>{thongkes?.DHCHUAXULY}</h3>
                                </div>
                                <div className="row-right-sub">
                                    <Link to={'/admin/order'}>
                                        <Button type='primary'>Xử lý ngay</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content-sub">Thống kê doanh thu ngày</div>
                                    {/* <h3 style={{ color: 'red' }}>100</h3> */}
                                </div>
                                <div className="row-right-sub">
                                    <Button type='primary' onClick={() => setStatisticalBy({ by: 'day' })}><CaretRightOutlined /></Button>
                                </div>
                            </div>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content-sub">Thống kê doanh thu tuần</div>
                                    {/* <h3 style={{ color: 'red' }}>100</h3> */}
                                </div>
                                <div className="row-right-sub">
                                    <Button type='primary' onClick={() => setStatisticalBy({ by: 'week' })}><CaretRightOutlined /></Button>
                                </div>
                            </div>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content-sub">Thống kê doanh thu tháng</div>
                                    {/* <h3 style={{ color: 'red' }}>100</h3> */}
                                </div>
                                <div className="row-right-sub">
                                    <Button type='primary' onClick={() => setStatisticalBy({ by: 'month' })} ><CaretRightOutlined /></Button>
                                </div>
                            </div>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content-sub">Thống kê doanh thu quý</div>
                                    {/* <h3 style={{ color: 'red' }}>100</h3> */}
                                </div>
                                <div className="row-right-sub">
                                    <Button type='primary' onClick={() => setStatisticalBy({ by: 'quater' })}><CaretRightOutlined /></Button>
                                </div>
                            </div>
                            <div className='box'>
                                <div className="row-left">
                                    <div className="content-sub">Thống kê doanh thu năm</div>
                                    {/* <h3 style={{ color: 'red' }}>100</h3> */}
                                </div>
                                <div className="row-right-sub">
                                    <Button type='primary' onClick={() => setStatisticalBy({ by: 'year' })}><CaretRightOutlined /></Button>
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={17}>
                            <Button onClick={() => setTypeChart(prev => !prev)} type='primary' style={{ float: 'right', marginBottom: '15px' }}>Switch {typeChart == true ? 'LineChart' : 'BarChart'}</Button>
                            <div className="chart">
                                <div style={{ fontSize: '25px', color: '#8c8c8c', fontWeight: 500, marginBottom: '15px', textAlign: 'center' }}>
                                    Doanh thu
                                </div>
                                <Rechart data={chartData} type={typeChart} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;