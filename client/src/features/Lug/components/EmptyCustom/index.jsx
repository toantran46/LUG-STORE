import React from 'react';
import PropTypes from 'prop-types';

EmptyCustom.propTypes = {
    content: PropTypes.string,
};

EmptyCustom.defaultProps = {
    content: null,
}

function EmptyCustom(props) {
    const content = props
    return (
        <div>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                    height: 60,
                }}
                description={
                    <span>
                        {content}
                    </span>
                }
            >
            </Empty>
        </div>
    );
}

export default EmptyCustom;