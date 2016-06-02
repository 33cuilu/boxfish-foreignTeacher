/**
 * Created by Tinna on 2016/05/08
 * app组件: 表示整个页面
 * */

//引入插件
import React from 'react';

//引入组件
import Nav from './commons/nav.js';

//引入样式
import '../less/app.less';
import '../less/main.less';
import '../less/modal.less';
import '../less/modalAdopt.less';

var App = React.createClass({

    render : function () {
        let Children = this.props.children;
        let curPath = this.props.location.pathname.slice(1);
        return (
            <div>
                <div id="left">
                    <div className="logo">
                        <img src="images/logo.jpg" style={{display:'inline-block'}}></img>
                        &nbsp;&nbsp;<span>外教管理</span>
                    </div>
                    <Nav curPath={curPath}/>
                </div>
                <div className="main" id="right">
                    <div className="right-top" style={{marginBottom : 0}}>
                        <div className="item">
                            <button className="btn" onClick={this._changeMenu}>
                                <i className="glyphicon glyphicon-align-justify" ></i>
                            </button>
                        </div>
                    </div>
                    <div className="ui divider"></div>
                    <div className="content">
                        {Children}
                    </div>
                </div>
            </div>
        );
    },

    _changeMenu : function (event) {
        let sub = $(".submenu");
        if(sub.css("display")!="none"){
            sub.prev().trigger("click");
        }
        $("#left").toggleClass("slideNav_left");
        $("#right").toggleClass("slideNav_right");
    }
});

export default App;
