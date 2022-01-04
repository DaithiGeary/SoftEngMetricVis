import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Barchart = ({user, data, dataKey, onSelect}) => {
  if(data.length === 0)return null;
    return (
        <ResponsiveContainer width="95%" aspect={1.75}>
          <BarChart data={data} onClick={e=>onSelect?.(user, e.activeLabel)}>
            <XAxis dataKey={"name"}> </XAxis>
            <YAxis interval={1}></YAxis>
            {/* <Legend></Legend> */}
            {/* <Cell></Cell> */}
            <CartesianGrid></CartesianGrid>
            <Tooltip></Tooltip>
            <Bar dataKey={dataKey} fill="#8050d8" />
          </BarChart>
        </ResponsiveContainer>
      );

}
