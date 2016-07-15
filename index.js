/**
 * Created by Tinna on 2016/05/08
 * 内容: index页面的路由机制, 即侧边导航栏的导航地址.
 * */

//引入插件
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory,hashHistory,IndexRoute} from 'react-router';

//引入组件
import app from './components/app.js';
import login from './components/login.js';
import Management from './components/management/management.js';
import Examine from './components/examine/examine.js';
import preInterview from './components/interview/preInterview.js';
import postInterview from './components/interview/postInterview.js';
import preLecture from './components/lecture/preLecture.js';
import postLecture from './components/lecture/postLecture.js';
import Pond from './components/pond/pond.js';

//引入样式
import './less/index.less';

ReactDOM.render(
    <Router history = {hashHistory}>
        <Route path="/">
            <IndexRoute component={login} />
            <Route path="login" component={login} />
            <Route path="management" component = {app} >
                <IndexRoute component={Management} />
                <Route path = "/management" component={Management} />
                <Route path = "/examine" component={Examine} />
                <Route path = "/interview" >
                    <IndexRoute component={preInterview} />
                    <Route path="/preinterview" component={preInterview} />
                    <Route path="/postinterview" component={postInterview} />
                </Route>
                <Route path = "/lecture" >
                    <IndexRoute component={preLecture}/>
                    <Route path="/prelecture" component={preLecture} />
                    <Route path="/postlecture" component={postLecture} />
                </Route>
                <Route path = "/pond" component={Pond} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);