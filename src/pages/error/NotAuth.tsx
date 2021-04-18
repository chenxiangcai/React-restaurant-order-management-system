import React, { FunctionComponent } from 'react';
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

interface OwnProps {
}

type Props = OwnProps;

const NotAuth: FunctionComponent<Props> = (props) => {

  const history = useHistory()
  return (
      <Result
          status="403"
          title="403"
          subTitle="你没有访问权限"
          extra={
            <Button style={{ borderRadius: 20 }}
                    type="primary"
                    onClick={() => history.replace('/')}
            >回到首页</Button>
          }
      />
  );
};

export default NotAuth;
