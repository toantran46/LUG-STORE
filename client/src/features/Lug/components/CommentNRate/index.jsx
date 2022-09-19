import { Avatar, Button, Comment, Form, Input, List, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
const { TextArea } = Input;

CommentNRate.propTypes = {

};

const data = [
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Hiếu Thứ 3',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: (
            <p>
                Sản phẩm rất đẹp và tốt
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Hiếu Thứ 4',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: (
            <p>
                Sản phẩm rất đẹp và tốt
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

const CommentList = ({ comments }) => (
    <List
        className='comment-list'
        dataSource={comments}
        header={`${comments.length} ${'bình luận'}`}
        itemLayout="horizontal"
        renderItem={(item) => (
            <li>
                <Comment
                    actions={item.actions}
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
        <Form.Item>
            <TextArea rows={3} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

function CommentNRate(props) {
    const [comments, setComments] = useState([data]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            setComments([
                ...comments,
                {
                    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
                    author: 'Toàn',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: <p>{value}</p>,
                    datetime: moment().fromNow(),
                },
            ]);
        }, 1000);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <div className='comment-rate'>
            <h4>Bình luận và đánh giá về sản phẩm</h4>
            {/* <List
                className="comment-list"
                header={`${data.length} bình luận`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <li>
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            /> */}
            <>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
        </div>
    );
}

export default CommentNRate;