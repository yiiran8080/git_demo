import React,{Component} from "react";
import "./style.css"
import '../../assets/css/app.css'
export default class ButtonComponent extends Component{
    render() {
        return(
            <React.Fragment>
                {/*数组：this.props.children[0]*/}
                {/*插槽：.children，父子组件传值*/}
                <button type={this.props.type} className={"my-button "+this.props.className} style={this.props.style}
                onClick={this.props.onClick}>{this.props.children}</button>
            </React.Fragment>
        )
    }
}

ButtonComponent.defaultProps={
    type:"button"
};