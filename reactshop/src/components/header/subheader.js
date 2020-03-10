import React,{Component} from "react";
import Css from "../../assets/css/temp/subheader.css"
import {withRouter} from "react-router"

class HeaderComponent extends Component{
    goBack(){
        this.props.history.goBack();
    };
    render() {
        return(
            <div className={Css['sub-header']}>
                <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                <div className={Css['title']}>{this.props.title}</div>
                <div className={this.props['right-text']?Css['right-btn']:Css['right-btn']+" hide"}>{this.props['right-text']}</div>
            </div>
        );
    }

}
export default withRouter(HeaderComponent);
