import React, { FunctionComponent } from 'react';
import { Tabs } from "antd";
import FoodDetail from "./FoodDetail";

const { TabPane } = Tabs;

interface OwnProps {
}

type Props = OwnProps;

const FoodShelf: FunctionComponent<Props> = (props) => {

  return (
      <div>
        <Tabs tabPosition='left'>
          <TabPane tab="Tab 1" key="1">
            <FoodDetail/>
            <FoodDetail/>
            <FoodDetail/>
            <FoodDetail/>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab 3
          </TabPane>
          <TabPane tab="Tab 4" key="4">
            Content of Tab 4
          </TabPane>
          <TabPane tab="Tab 5" key="5">
            Content of Tab 5
          </TabPane>
        </Tabs>
      </div>
  );
};

export default FoodShelf;

