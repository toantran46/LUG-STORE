import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Comment, Empty, Form, Input, List, Progress, Rate, Tooltip } from 'antd';
import { binhluanApi } from 'api/binhluanApi';
import { onReloadFeedback } from 'features/Lug/userSlice';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastSucsess } from 'utils/notification';
import './CommentNRate.scss';
const { TextArea } = Input;


CommentNRate.propTypes = {
    product: PropTypes.object,
    feedBackAvailable: PropTypes.bool,
    listFeedback: PropTypes.array,
    userFeedback: PropTypes.number,
};

CommentNRate.defaultProps = {
    product: {},
    feedBackAvailable: null,
    listFeedback: [],
    userFeedback: null
}

function CommentNRate(props) {
    const { product, feedBackAvailable, listFeedback, userFeedback } = props;
    // console.log(listFeedback);
    const [dataList, setDataList] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [form] = Form.useForm();
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const handleSubmit = async (value) => {
        try {
            setIsLoading(true);
            console.log(user)
            const data = {
                BL_SOSAO: value.BL_SOSAO,
                BL_NOIDUNG: value.BL_NOIDUNG,
                TV_ID: user?.TV_ID,
                SP_MA: product?.SP_MA
            }
            console.log(data)
            const { message } = await binhluanApi.post(data);
            setIsLoading(false)
            form.resetFields();
            toastSucsess(message);
            dispatch(onReloadFeedback());
        } catch (error) {
            console.log(error);
        }

    };
    const CommentList = ({ comments }) => (
        <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={listFeedback}
            renderItem={(item) => (
                <li>
                    <Comment
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                    />
                </li>
            )}
        />
    );

    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <>
            <Form.Item name="BL_NOIDUNG">
                <TextArea placeholder='Viết bình luận của bạn' rows={2} onChange={onChange} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={isLoading} type="primary">
                    Thêm bình luận
                </Button>
            </Form.Item>
        </>
    );
    return (
        <div className='comment-rate'>
            <h4>Bình luận và đánh giá về sản phẩm</h4>
            <div className="rating">
                <div className="rate-point">
                    <div class="point">{product.DIEM_TB}/5 <StarFilled /></div>

                    <div className='rate-total'>{listFeedback.length} đánh giá</div>
                </div>
                {/* <ul className="rating-list">
                    <li>
                        <div className="number-star">
                            5 <StarFilled />
                        </div>
                        <div className="progress-star">
                            <Progress size="small" percent={80} />
                        </div>
                    </li>
                    <li>
                        <div className="number-star">
                            4 <StarFilled />
                        </div>
                        <div className="progress-star">
                            <Progress size="small" percent={10} />
                        </div>
                    </li>
                    <li>
                        <div className="number-star">
                            3 <StarFilled />
                        </div>
                        <div className="progress-star">
                            <Progress size="small" percent={5} />
                        </div>
                    </li>
                    <li>
                        <div className="number-star">
                            2 <StarFilled />
                        </div>
                        <div className="progress-star">
                            <Progress size="small" percent={3} />
                        </div>
                    </li>
                    <li>
                        <div className="number-star">
                            1 <StarFilled />
                        </div>
                        <div className="progress-star">
                            <Progress size="small" percent={2} />
                        </div>
                    </li>
                </ul> */}
            </div>
            <div className="comment">
                {userFeedback !== 0 ? <p>Bạn đã đánh giá sản phẩm này</p> :
                    feedBackAvailable ?
                        <Form onFinish={handleSubmit} form={form}>
                            <div className="rate-star">
                                <div className="rate-title">Chọn số điểm đánh giá</div>
                                <Form.Item name="BL_SOSAO" rules={[{ required: true, message: "Vui lòng chọn số sao" }]}>
                                    <Rate />
                                </Form.Item>
                            </div>
                            <div className="comment-text">
                                <Comment
                                    content={
                                        <Editor
                                            value={value}
                                        />
                                    }
                                />
                            </div>
                        </Form>
                        : <p>Vui lòng mua sản phẩm để được đánh giá</p>}
            </div>
            {listFeedback.length > 0 ?
                <CommentList />
                : <Empty description={'Chưa có đánh giá nào'} />}
        </div>
    );
}

export default CommentNRate;