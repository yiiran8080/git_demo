import React,{Component} from "react";
export default class InputComponent extends Component{
    render() {
        return(
            <React.Fragment><input type="text" onChange={this.props.onChange}/></React.Fragment>
        )
    }

}