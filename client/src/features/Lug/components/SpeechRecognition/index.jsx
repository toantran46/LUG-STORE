import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

SpeedRecognition.propTypes = {

};


function SpeedRecognition(props) {
    const [state, setState] = React.useState();
    React.useEffect(() => {
        var speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        var recognition = new speechRecognition();
        recognition.lang = 'vi-VN';
        recognition.interimResults = false;
        setState(recognition);
        recognition.onresult = function (event) {
            var lastResult = event.results.length - 1;
            var content = event.results[lastResult][0].transcript;
            console.log(content);
            // message.textContent = 'Voice Input: ' + content + '.';
        };

        recognition.onspeechend = function () {
            recognition.stop();
        };

        recognition.onerror = function (event) {

        }
    }, [])
    return (
        <div>
            <Button onClick={() => state.start()}>Start</Button>
        </div>
    );
}

export default SpeedRecognition;