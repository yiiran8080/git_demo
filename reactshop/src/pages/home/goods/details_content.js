import React from 'react';
import Css from "../../../assets/css/home/goods/details_content.css"
import {localParam} from "../../../assets/js/utils/util";
import {request} from "../../../assets/js/utils/request";
import config from "../../../assets/js/conf/config";
import Swiper from "../../../assets/js/libs/swiper";
class GoodsContent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            bodys:"",
            gid:props.location.search!=''?localParam(props.location.search).search.gid:''

        }
    }
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    };
    componentDidMount() {
        request(config.baseURL + "/api/home/goods/info?gid="+this.state.gid+"&type=details&token=" + config.token).then(res => {
            if (res.code === 200) {
                this.setState({bodys:res.data.bodys});
            }
        });
    }

    render() {
        return (
            <div className={Css['page']}>
                <div className={Css['content']} dangerouslySetInnerHTML={{__html:this.state.bodys}}></div>

            </div>
        )
    }
}

export default GoodsContent;