import React, { FunctionComponent } from 'react';
import { Button, Card, Input, Popconfirm } from "antd";

const { Search } = Input;

interface OwnProps {
  delSelected: () => any,
  barVisible: string,
  title: string,
  editBtn?: (val: any) => any,
  editBtnState?: boolean,
  Search: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void
}

type Props = OwnProps;

const TableCheckBox: FunctionComponent<Props> = (props) => {
  // {
  //   console.log(props)
  // }
  return (
      <div style={{ display: "inline" }}>
        {
          props.editBtn &&
          <Button style={{ display: props.barVisible, marginRight: 10 }}
                  onClick={props.editBtn}
                  disabled={props.editBtnState ?? false}
          >
            编辑
          </Button>
        }
        <Popconfirm
            title='确定要删除选中内容吗'
            placement="right"
            okText="确定"
            cancelText="取消"
            onConfirm={
              props.delSelected
            }
        >
          <Button danger style={{ display: props.barVisible }}>删除</Button>
        </Popconfirm>
        <Search
            placeholder={`请输入${props.title}`}
            onSearch={props.Search}
            allowClear
            style={{ width: 200, display: props.barVisible === '' ? 'none' : '' }}
        />
      </div>
  )
};

export default TableCheckBox;
