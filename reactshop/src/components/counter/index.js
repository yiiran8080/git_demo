import React from 'react';
import {connect} from 'react-redux';

class Index extends React.Component {
    render() {
        return (
            <div>
                子组件计数器：{this.props.state.counter.count}
            </div>
        )
    }
}

export default connect((state)=>{
    return {state:state};
})(Index);