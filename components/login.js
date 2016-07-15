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
var loginUrl = `http://${configData.ip}/web/common/adminLogin`;

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
                <div className="forms form center-block">
                    <div className="login-title">
                        <span>外教管理系统</span>
                    </div>
                    <form onSubmit={(e)=>{this._login(e);return false;}}>
                        <input className="form-control" type="text" ref="name" placeholder="请输入用户名"/>
                        <input className="form-control" type="password" ref="password" placeholder="请输入密码"/>
                        <p className={errClassName}>{this.state.errInfo}</p>
                        <input type="submit" className="btn form-control" value="登录"/>
                    </form>
                </div>
            </div>
        );
    },
    _login : function (e) {
        e.preventDefault();
        let name = this.refs.name.value,
            password = this.refs.password.value;
        if(name.length == 0){
            this.setState({
                errInfo: "请填写用户名",
                showErr: true
            });
            return false;
        }
        if(password.length == 0){
            this.setState({
                errInfo: "请填写密码",
                showErr: true
            });
            return false;
        }
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
                    return false;
                }
                store.set("accessToken",data);
                this.context.router.push("/management");
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