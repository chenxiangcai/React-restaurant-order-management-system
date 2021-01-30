import React, {FunctionComponent} from 'react';
import {Pagination} from "antd";


type Props = {
    page: number,
    total: number,
    fun: () => void

};


const Paging: FunctionComponent<Props> = (props) => {
    return (
        <Pagination
            defaultCurrent={props.page}
            total={props.total}
            hideOnSinglePage={true}
            style={{float: "right", marginTop: 20}}
            showTotal={total => `共 ${total} 条`}
            onChange={props.fun}
        />
    );
}

export default Paging;
