import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/charts';

interface Prop {
  data: any
}

const DemoDualAxes: React.FC<Prop> = (props) => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    if (props.data) {
      const preData = props.data.map((val: any) => {
        return {
          _id: val._id,
          num: val.num,
          paid: val.paid
        }
      })
      setData(preData)
    }
  }, [props.data]);
  var config = {
    data: [data, data],
    xField: '_id',
    yField: ['paid', 'num'],
    meta: {
      paid: { alias: '销售额' },
      num: { alias: '订单量' },
    },
    geometryOptions: [
      { geometry: 'column' },
      {
        geometry: 'line',
        lineStyle: { lineWidth: 2 },
      },
    ],
  };
  // @ts-ignore
  return <DualAxes {...config} />;
};

export default DemoDualAxes;
