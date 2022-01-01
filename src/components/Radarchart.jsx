import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export const Radarchart = ({data, dataKey}) => {
    if(data.length === 0)return null;
    return (
        <ResponsiveContainer width="95%" aspect={1.5}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey={dataKey} stroke="#8000d8" fill="#8050d8" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      );
    }