import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

ModelLogin.propTypes = {

};

function ModelLogin(props) {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className="model-login">
            <>
                <Button type="primary" onClick={showDrawer}>
                    Đăng kí/đăng nhập
                </Button>
                <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={true}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </>
        </div>
    );
}

export default ModelLogin;