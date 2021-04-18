import React, { FunctionComponent } from 'react';
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

interface OwnProps {
}

type Props = OwnProps;

const NotFound: FunctionComponent<Props> = (props) => {

  const history = useHistory()
  return (
      <Result
          status="404"
          title="404"
          subTitle="此页面走丢了～～"
          extra={
            <Button
                style={{ borderRadius: 20 }}
                type="primary"
                onClick={() => history.goBack()}
            >
              回上一页
            </Button>
          }
      />
  );
};

export default NotFound;
