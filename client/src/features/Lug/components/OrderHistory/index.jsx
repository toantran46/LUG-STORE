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
                    <h4>L???CH S??? MUA H??NG</h4>
                </div>
                {order?.length > 0 ?
                    order.map((ord) =>
                        <div className="description-order">
                            <div className="title-order">
                                <div className="title-left">
                                    {ord.DH_TRANGTHAI === 3 ?
                                        <div>
                                            <span className='custom-font-title'>
                                                <Link style={{ color: '#1890FF' }} to={`/products/${ord.SAN_PHAM[0].SP_MA}`}>????nh gi?? s???n ph???m <RightOutlined /></Link>
                                            </span><br />
                                        </div> : ''}

                                    <div className="custom-font-content">
                                        <b>#{ord.DH_MA}</b>
                                    </div>
                                </div>
                                <div className="title-right">
                                    <div className="order-time">
                                        <span className='custom-font-title'>Th???i gian ?????t</span><br />
                                        <span className='custom-font-content'>{moment(ord.DH_THOIGIANDAT).format('MMMM Do YYYY, h:mm:ss')}</span>
                                    </div>
                                    <div className="status">
                                        <span className='custom-font-title'>Tr???ng th??i</span><br />
                                        <span>
                                            {ord.DH_TRANGTHAI === 1 ?
                                                <div>
                                                    <Tag icon={<SyncOutlined spin />} color="processing">Ch??? x??c nh???n</Tag>
                                                    <Popconfirm
                                                        title="B???n c?? ch???c ch???n mu???n h???y ????n h??ng?"
                                                        onConfirm={() => confirm(ord.DH_MA, false)}
                                                        onCancel={cancel}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button size='small' loading={isLoading} type='danger'>H???y ????n</Button>
                                                    </Popconfirm>
                                                </div>
                                                : ord.DH_TRANGTHAI === 2 ?
                                                    <div>
                                                        <Tag icon={<FireOutlined />} color="gold">??ang v???n chuy???n</Tag>
                                                        <Popconfirm
                                                            title="B???n x??c nh???n ????n h??ng ???? ???????c giao ?"
                                                            onConfirm={() => confirm(ord.DH_MA, true)}
                                                            onCancel={cancel}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button size="small" loading={isLoading} type='primary'>???? nh???n h??ng ?</Button>
                                                        </Popconfirm>
                                                    </div>
                                                    : ord.DH_TRANGTHAI === 3 ?
                                                        <div>
                                                            <Tag icon={<CheckCircleOutlined />} color="success">???? nh???n h??ng</Tag>
                                                        </div>
                                                        : <Tag icon={<CloseCircleOutlined />} color="error">???? h???y</Tag>}
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
                                        <span className='custom-font-title'>T??n s???n ph???m</span><br />
                                        <span className='custom-font-content'>{sp.SP_TEN}</span>
                                    </div>
                                    <div className="product-quantity">
                                        <span className='custom-font-title'>S??? l?????ng</span><br />
                                        <span className='custom-font-content'>x {sp.CTDH_SOLUONG}</span>
                                    </div>
                                    <div className="product-color">
                                        <span style={{ backgroundColor: `${sp.MS_TENMAU}` }} className='swatch-color'></span>
                                    </div>
                                    <div className="product-price">
                                        <span className='custom-font-title' style={{ float: 'right', textAlign: 'right' }}>Gi??</span><br />
                                        <span className='custom-font-content'>{format(sp.CTDH_GIA)}??</span>
                                    </div>
                                </div>
                            )}
                            <div className="order-info">
                                <div className="info-left">
                                    <span className='custom-font-title'>Ph????ng th???c thanh to??n</span><br />
                                    <span className='custom-font-content'>{ord.DH_PHUONGTHUCTT}</span>
                                </div>
                                <div className="info-right">
                                    <div className="shipping">
                                        <span className='custom-font-title'>Ph?? v???n chuy???n</span><br />
                                        <span className='custom-font-content'>{format(ord.DH_PHISHIP)}??</span>
                                    </div>
                                    <div className="total-price">
                                        <span className='custom-font-title'>T???ng ti???n</span><br />
                                        <span className='custom-font-content'><b>{format(ord.DH_TONGTIEN)}??</b></span>
                                    </div>
                                </div>
                            </div>
                            <div className="order-info">
                                <div className="info-left">
                                    <span className='custom-font-title'>?????a ch??? giao h??ng</span><br />
                                    <span className='custom-font-content'>{ord.DH_DIACHIGIAOHANG}</span>
                                </div>
                                <div style={{ float: 'right', textAlign: 'right' }}>
                                    <span className='custom-font-title'>Ghi ch??</span><br />
                                    <span className='custom-font-content'>{ord.DH_GHICHU}</span>
                                </div>
                            </div>
                            <div className="ship-timing">
                                <span className='custom-font-content'>D??? ki???n ng??y giao h??ng <b>20 Nov 2022</b></span>
                            </div>
                        </div>
                    ) :
                    <div>
                        <Empty description={
                            <span>B???n ch??a c?? ????n ?????t h??ng n??o, <span style={{ color: '#1890FF' }}><Link to={'/'}>?????t h??ng ngay</Link></span></span>
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