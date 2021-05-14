import React, { useEffect, useState } from 'react';
import { Liquid } from '@ant-design/charts';

interface OwnProps {
  rate: number
}

type Props = OwnProps;
const DemoLiquid: React.FC<Props> = (props) => {
  var [percent, setPercent] = useState(0.1);
  var ref;
  var config = {
    percent,
    width: 252,
    height: 116,
    statistic: {
      title: {
        formatter: function formatter() {
          return '周活跃率';
        },
        style: function style(_ref: { percent: any; }) {
          var percent = _ref.percent;
          return { fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)' };
        },
      },
      content: {
        style: function style(_ref2: { percent: any; }) {
          var percent = _ref2.percent;
          return {
            fontSize: 16,
            lineHeight: 1,
            fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
          };
        },
      },
    },
    liquidStyle: function liquidStyle(_ref4: { percent: any; }) {
      var percent = _ref4.percent;
      return {
        fill: percent > 0.75 ? '#5B8FF9' : '#FAAD14',
        stroke: percent > 0.75 ? '#5B8FF9' : '#FAAD14',
      };
    },
    color: function color() {
      return '#5B8FF9';
    },
  };
  useEffect(() => {
    var data = 0;
    var interval = setInterval(function () {
      const random = Math.min(Math.random() * 0.1, 0.1);
      data += random
      if (data <= props.rate ?? 0) {
        setPercent(data);
      } else {
        const s = props.rate ?? 0
        if (data - random <= s) setPercent(s)
        clearInterval(interval);
      }
    }, 500);
  }, [props.rate]);
  // @ts-ignore
  return <Liquid {...config} chartRef={(chartRef) => (ref = chartRef)}/>;
};

export default DemoLiquid;
