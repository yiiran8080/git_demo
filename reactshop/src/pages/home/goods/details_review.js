import React from 'react';
import Css from "../../../assets/css/home/goods/details_review.css"
import {request} from "../../../assets/js/utils/request";
import config from "../../../assets/js/conf/config";
import {localParam} from "../../../assets/js/utils/util";

class GoodsReview extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            gid:props.location.search!=''?localParam(props.location.search).search.gid:'',
            aReviews:[],
            iReviewTotal:0
        }
    }
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    };
    componentDidMount() {
        this.getReviews();
    };

    getReviews(){
        request(config.baseURL + "/api/home/reviews/index?gid="+this.state.gid+"&type=spec&token=" + config.token+"&page=1").then(res=>{
            //console.log(res);
            if(res.code===200){
                this.setState({aReviews:res.data,iReviewTotal:res.pageinfo.total});
            }else {
                this.setState({aReviews:[]});
            }
        })
    };
    render() {
        return (
            <div className={Css['page']}>
                <div className={Css["reviews-main"]}>
                    <div className={Css["reviews-title"]}>商品评价 ({this.state.iReviewTotal})</div>
                    <div className={Css["reviews-wrap"]}>
                        {
                            this.state.aReviews.length>0?
                                this.state.aReviews.map((item,index)=>{
                                    return(
                                        <div className={Css["reviews-list"]} key={index}>
                                            <div className={Css["uinfo"]}>
                                                <div className={Css["head"]}><img src={item.head}/></div>
                                                <div className={Css["nickname"]}>{item.nickname}</div>
                                            </div>
                                            <div className={Css["reviews-content"]}>{item.content}</div>
                                            <div className={Css["reviews-date"]}>{item.times}</div>
                                        </div>
                                    )
                                })
                                :<div className="null-item">没有任何评价</div>
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default GoodsReview;