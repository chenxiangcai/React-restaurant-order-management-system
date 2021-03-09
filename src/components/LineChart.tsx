import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

interface Prop {
  data: any
}

const LineChart: React.FC<Prop> = (props) => {
  const [data, setData] = useState([{}]);
  // @ts-ignore
  let ref;
  useEffect(() => {
    if (props.data) {
      const preData = props.data.map((val: any) => {
        return {
          _id: val._id,
          num: val.num,
          paid: val.paid
        }
      })
      console.log(preData)
      setData(preData)
    }
  }, [props.data]);
  var config = {
    data: data,
    padding: 'auto',
    width: 80,
    height: 70,
    xField: '_id',
    yField: 'paid',
    meta: {
      _id: { alias: '日期' },
      paid: { alias: '净收入' },
    },
  };
  useEffect(() => {
    var cnt = 0;
    var smooth = false;
    var interval = setInterval(function () {
      if (cnt < 2) {
        smooth = !smooth;
        cnt += 1;
        // @ts-ignore
        ref.update({ smooth: smooth });
      } else {
        clearInterval(interval);
      }
    }, 100);
  }, []);

  // @ts-ignore
  return <Line {...config} chartRef={(chartRef) => (ref = chartRef)}/>;
};

export default LineChart;
