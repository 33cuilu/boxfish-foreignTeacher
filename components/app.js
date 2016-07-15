/**
 * Created by Tinna on 2016/05/08
 * app组件: 表示整个页面
 * */

//引入插件
import React from 'react';
import store from 'store';
import 'babel-polyfill';

//引入组件
import Nav from './commons/nav.js';
import ModalExit from './commons/modalExit.js';

//引入样式
import '../less/app.less';
import '../less/main.less';
import '../less/modal.less';
import '../less/modalAdopt.less';

var App = React.createClass({
    contextTypes: {
        router : React.PropTypes.object
    },
    componentWillMount: function () {
        let token = store.get("accessToken");
        if(!token){
            alert("登录信息过期,请重新登录!");
            this.context.router.replace("/login");
        }
    },
    render : function () {
        let Children = this.props.children;
        let curPath = this.props.location.pathname.slice(1);
        return (
            <div>
                <ModalExit callback={this.logout}/>
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
                            <button className="logout btn" onClick={this._arrangeLogout}>
                                <i className="glyphicon glyphicon-log-out" ></i>
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
    },

    _arrangeLogout : function () {
        $(".modalExit .modal").modal();
    },
    logout : function () {
        store.set("accessToken","");
        $(".modalExit .modal").modal('hide');
        this.context.router.push("login");
    }

});

export default App;
