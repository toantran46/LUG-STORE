import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import "./OrderHistory.scss";
import { Avatar, Button, Descriptions, Empty, Pagination, Popconfirm, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, FireOutlined, RightOutlined, SyncOutlined } from '@ant-design/icons';
import { format } from 'assets/global/FormatMoney';
import { donhangApi } from 'api/donhangApi';
import { toastSucsess } from 'utils/notification';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_order, savePagination } from 'features/Lug/userSlice';
import { Link } from 'react-router-dom';
import { sanphamApi } from 'api/sanphamApi';

OrderHistory.propTypes = {
};


function OrderHistory(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const dispatch = useDispatch();
    // const { pagination } = useSelector(state => state.userInfo);
    const { pagination: { order: pagination } } = useSelector(state => state.userInfo);
    const { data: { order } } = useSelector(state => state.userInfo);
    const { user } = useSelector(state => state.auth);
    // console.log(pagination.order)
    const confirm = async (id, action) => {
        try {
            let values;
            if (!action) {
                values = {
                    DH_TRANGTHAI: 4,
                };
            } else {
                values = {
                    DH_TRANGTHAI: 3,
                };
            }

            const { message } = await donhangApi.update(id, values)
            setIsUpdate(prev => !prev)
            dispatch(fetch_order({ _limit: pagination.order?._limit, _page: pagination.order?._page, TV_ID: user?.TV_ID }));
            toastSucsess(message);

        } catch (error) {
            console.log(error)
        }
    };
    const cancel = (e) => {
        console.log(e);
    };
    return (
        <div className='order-history'>
            <div className="content">
                <div className="title">
                    <h4>LỊCH SỬ MUA HÀNG</h4>
                </div>
                {order?.length > 0 ?
                    order.map((ord) =>
                        <div className="description-order">
                            <div className="title-order">
                                <div className="title-left">
                                    {ord.DH_TRANGTHAI === 3 ?
                                        <div>
                                            <span className='custom-font-title'>
                                                <Link style={{ color: '#1890FF' }} to={`/products/${ord.SAN_PHAM[0].SP_MA}`}>Đánh giá sản phẩm <RightOutlined /></Link>
                                            </span><br />
                                        </div> : ''}

                                    <div className="custom-font-content">
                                        <b>#{ord.DH_MA}</b>
                                    </div>
                                </div>
                                <div className="title-right">
                                    <div className="order-time">
                                        <span className='custom-font-title'>Thời gian đặt</span><br />
                                        <span className='custom-font-content'>{moment(ord.DH_THOIGIANDAT).format('MMMM Do YYYY, h:mm:ss')}</span>
                                    </div>
                                    <div className="status">
                                        <span className='custom-font-title'>Trạng thái</span><br />
                                        <span>
                                            {ord.DH_TRANGTHAI === 1 ?
                                                <div>
                                                    <Tag icon={<SyncOutlined spin />} color="processing">Chờ xác nhận</Tag>
                                                    <Popconfirm
                                                        title="Bạn có chắc chắn muốn hủy đơn hàng?"
                                                        onConfirm={() => confirm(ord.DH_MA, false)}
                                                        onCancel={cancel}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button size='small' loading={isLoading} type='danger'>Hủy đơn</Button>
                                                    </Popconfirm>
                                                </div>
                                                : ord.DH_TRANGTHAI === 2 ?
                                                    <div>
                                                        <Tag icon={<FireOutlined />} color="gold">Đang vận chuyển</Tag>
                                                        <Popconfirm
                                                            title="Bạn xác nhận đơn hàng đã được giao ?"
                                                            onConfirm={() => confirm(ord.DH_MA, true)}
                                                            onCancel={cancel}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button size="small" loading={isLoading} type='primary'>Đã nhận hàng ?</Button>
                                                        </Popconfirm>
                                                    </div>
                                                    : ord.DH_TRANGTHAI === 3 ?
                                                        <div>
                                                            <Tag icon={<CheckCircleOutlined />} color="success">Đã nhận hàng</Tag>
                                                        </div>
                                                        : <Tag icon={<CloseCircleOutlined />} color="error">Đã hủy</Tag>}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {ord.SAN_PHAM?.map((sp) =>
                                <div className="box-order">
                                    <div className="product-img">
                                        <span className='custom-font-title'></span><br />
                                        <Avatar src={sp.HASP_DUONGDAN} />
                                    </div>
                                    <div className="product-name">
                                        <span className='custom-font-title'>Tên sản phẩm</span><br />
                                        <span className='custom-font-content'>{sp.SP_TEN}</span>
                                    </div>
                                    <div className="product-quantity">
                                        <span className='custom-font-title'>Số lượng</span><br />
                                        <span className='custom-font-content'>x {sp.CTDH_SOLUONG}</span>
                                    </div>
                                    <div className="product-color">
                                        <span style={{ backgroundColor: `${sp.MS_TENMAU}` }} className='swatch-color'></span>
                                    </div>
                                    <div className="product-price">
                                        <span className='custom-font-title' style={{ float: 'right', textAlign: 'right' }}>Giá</span><br />
                                        <span className='custom-font-content'>{format(sp.CTDH_GIA)}đ</span>
                                    </div>
                                </div>
                            )}
                            <div className="order-info">
                                <div className="info-left">
                                    <span className='custom-font-title'>Phương thức thanh toán</span><br />
                                    <span className='custom-font-content'>{ord.DH_PHUONGTHUCTT}</span>
                                </div>
                                <div className="info-right">
                                    <div className="shipping">
                                        <span className='custom-font-title'>Phí vận chuyển</span><br />
                                        <span className='custom-font-content'>{format(ord.DH_PHISHIP)}đ</span>
                                    </div>
                                    <div className="total-price">
                                        <span className='custom-font-title'>Tổng tiền</span><br />
                                        <span className='custom-font-content'><b>{format(ord.DH_TONGTIEN)}đ</b></span>
                                    </div>
                                </div>
                            </div>
                            <div className="order-info">
                                <div className="info-left">
                                    <span className='custom-font-title'>Địa chỉ giao hàng</span><br />
                                    <span className='custom-font-content'>{ord.DH_DIACHIGIAOHANG}</span>
                                </div>
                                <div style={{ float: 'right', textAlign: 'right' }}>
                                    <span className='custom-font-title'>Ghi chú</span><br />
                                    <span className='custom-font-content'>{ord.DH_GHICHU}</span>
                                </div>
                            </div>
                            <div className="ship-timing">
                                <span className='custom-font-content'>Dự kiến ngày giao hàng <b>20 Nov 2022</b></span>
                            </div>
                        </div>
                    ) :
                    <div>
                        <Empty description={
                            <span>Bạn chưa có đơn đặt hàng nào, <span style={{ color: '#1890FF' }}><Link to={'/'}>đặt hàng ngay</Link></span></span>
                        } >
                        </Empty>
                    </div>
                }
                <Pagination
                    pageSize={1}
                    current={pagination._page}
                    total={pagination._totalPage}
                    onChange={(page) => dispatch(savePagination({ screen: 'order', page }))}
                >
                </Pagination>
            </div>
        </div>
    );
}

export default OrderHistory;