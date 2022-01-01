import React from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

export const Radialchart = ({data, dataKey}) => {
    if(data.length === 0)return null;

        return (
            <ResponsiveContainer width="99%" aspect={1.5}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
                <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey={dataKey}
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle"  />
            </RadialBarChart>
            </ResponsiveContainer>
        );
}

// wrapperStyle={style}