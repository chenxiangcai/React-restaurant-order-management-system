import React, { useState, useEffect, useMemo } from 'react';
import { Column } from '@ant-design/charts';


interface Props {
  data: any
}

const ColumnChart: React.FC<Props> = (props) => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    if (props.data) {
      const preData = props.data.map((val: any) => {
        return {
          _id: val._id.slice(5),
          num: val.num,
          paid: val.paid
        }
      })
      setData(preData)
    }
  }, [props.data]);

  var config = {
    data: data,
    xField: '_id',
    yField: 'num',
    width: 80,
    height: 80,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      _id: { alias: '日期' },
      num: { alias: '订单量' },
    },
  };
  // @ts-ignore
  return <Column {...config} />;
};
export default ColumnChart;
