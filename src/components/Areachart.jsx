
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export const Areachart = ({data, dataKey}) => {
    if(data.length === 0)return null;

return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 50,
        }}
       
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"name"} />
        <YAxis dataKey={dataKey}  />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}