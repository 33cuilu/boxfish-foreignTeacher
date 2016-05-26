/**
 * Created by cuilu on 16/5/23.
 * 登录页
 */

//引入插件
import React from 'react';

//引入组件


//引入样式
import '../less/signIn.less';

var SignIn = React.createClass({
    render : function(){
        return(
            <div className="signIn">
                <input className="form-control" type="text" placeholder="请输入用户名"/>
                <input className="form-control" type="password" placeholder="请输入密码"/>
                <button className="btn btn-primary form-control">登录</button>
            </div>
        );
    }
});

export default SignIn;