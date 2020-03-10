//专门写样式
import React,{Component} from "react";
import "./style.css"
export default class Toast extends Component{
    constructor() {
        super();
        this.state={
            text:""
        };
    };
    setOpts(opts){
        this.setState({text:opts.txt});
    };
    render() {
        return(
            <div className="my-toast">{this.state.text}</div>
        )
    }
}