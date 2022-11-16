import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

Rechart.propTypes = {
    data: PropTypes.array,
    type: PropTypes.bool,
};
Rechart.defaultProps = {
    data: [],
    type: null,
}

function Rechart(props) {
    const { type, data } = props;
    return (
        <>
            <ResponsiveContainer width="100%" height={500}>
                {type === false ?
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="TEN_THONG_KE" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="DOANHTHU" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="TIEN_VON" stroke="#82ca9d" />
                    </LineChart>
                    :
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="TEN_THONG_KE" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="DOANHTHU" fill="#8884d8" />
                        <Bar dataKey="TIEN_VON" fill="#82ca9d" />
                    </BarChart>
                }
            </ResponsiveContainer>
        </>
    );
}

export default Rechart;