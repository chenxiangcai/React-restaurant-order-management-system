import React, { FunctionComponent } from 'react';
import { Button, Card, Input, Popconfirm } from "antd";

const { Search } = Input;

interface OwnProps {
  delSelected: () => any,
  barVisible: string,
  Search: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void
}

type Props = OwnProps;

const TableCheckBox: FunctionComponent<Props> = (props) => {
  // {
  //   console.log(props)
  // }
  return (
      <div style={{ marginBottom: 10 }}>
        <Popconfirm
            title='确定要删除选中内容吗'
            placement="top"
            okText="确定"
            cancelText="取消"
            onConfirm={
              props.delSelected
            }
        >
          <Button danger style={{ display: props.barVisible }}>删除</Button>
        </Popconfirm>
        <Search
            placeholder="请输入订单号"
            onSearch={props.Search}
            allowClear
            style={{ width: 200, display: props.barVisible === '' ? 'none' : '' }}
        />
      </div>
  )
};

export default TableCheckBox;
