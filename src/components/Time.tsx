import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from "moment";

interface OwnProps {
}

type Props = OwnProps;

const Time: FunctionComponent<Props> = (props) => {
  const [time, SetTime] = useState(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))

  setInterval(() => {
    SetTime(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
  }, 1000)

  return (
      <div>
        <span style={{ fontSize: 16 }}>{time}</span>
      </div>
  );
};

export default Time;
