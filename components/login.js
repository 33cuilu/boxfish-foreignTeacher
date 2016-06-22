/**
 * Created by tinna on 16/6/21.
 * 登录页
 */

//引入插件
import React from 'react';
import store from 'store';
import {Post} from './../util/ajax.js';

//引入组件

//引入样式
import '../less/login.less';

var configData = require("./../config/config.json");
//var loginUrl = 'http://192.168.77.171:8099/web/common/adminLogin';

var Login = React.createClass({
    contextTypes: {
        router : React.PropTypes.object
    },
    getInitialState : function () {
        return ({
            errInfo : '',
            showErr : false
        });
    },
    render : function(){
        let errClassName = "errInfo";
        errClassName += (this.state.showErr)? " show":" hiden";
        return(
            <div className="login center-block">
                <div className="forms center-block">
                    <div className="login-title">
                        <span>外教管理系统</span>
                    </div>
                    <input className="form-control" type="text" ref="name" placeholder="请输入用户名"/>
                    <input className="form-control" type="password" ref="password" placeholder="请输入密码"/>
                    <p className={errClassName}>{this.state.errInfo}</p>
                    <button className="btn form-control" onClick={this._login}>登录</button>
                </div>
            </div>
        );
    },
    _login : function () {
        let name = this.refs.name.value,
            password = this.refs.password.value;
        if(name.length == 0 || password.length == 0){
            this.setState({
                errInfo: "请填写用户名和密码",
                showErr: true
            });
            return;
        }
        if(name != "admin" || password != "admin"){
            this.setState({
                errInfo: "用户名或密码错误",
                showErr: true
            });
            return;
        }
        this.context.router.push("management");
        return;
        let postHead = {
            url : loginUrl,
            data : {
                "username" : name,
                "password" : password,
                "loginType" : 2
            }
        };
        Post(postHead).then(
            ({data,returnCode})=>{
                if(returnCode == 401) {
                    let errInfo = (data)? data : "用户名或密码错误";
                    this.setState({
                        errInfo: errInfo,
                        showErr: true
                    });
                    return;
                }
                store.set("accessToken",data);
                this.context.router.push("management");
            },
            ({data})=>{
                let errInfo = (data)? data: "登录错误";
                this.setState({
                    errInfo: errInfo,
                    showErr: true
                });
            }
        ).catch(
            (err)=>{console.log(err);}
        );
    }
});

export default Login;