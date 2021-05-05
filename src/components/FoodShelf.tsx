//菜品分类时列表切换模块
import React, { FunctionComponent } from 'react';
import { Tabs } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ADD2CAR, LESS2CAR } from "../pages/front/home/actions";
import CateFoodDetail from "./CateFoodDetail";

const { TabPane } = Tabs;

interface OwnProps {
  [prop: string]: any,

}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  cate: state.home.cate || [],
  catedish: state.home.catedish || []
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  add2car(val: object) {
    dispatch({
      type: ADD2CAR,
      data: val
    })
  },
  less2car(val: object) {
    dispatch({
      type: LESS2CAR,
      data: val
    })
  }
})

const FoodShelf: FunctionComponent<Props> = (props) => {
  const { cate, catedish } = props

  return (
      <div>
        <Tabs tabPosition='left' onTabClick={(key: string) => {
          console.log(key)
        }}>
          {
            cate && cate.map((val: any, index: number) =>
                <TabPane
                    tab={val.foodTypeName}
                    key={val._id}
                >
                  <CateFoodDetail dish={catedish[index]}/>
                </TabPane>
            )
          }
        </Tabs>
      </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(FoodShelf)

