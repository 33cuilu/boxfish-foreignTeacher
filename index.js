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
import teacherManagement from './components/teacherManagement/teacherManagement.js';
import teacherExamine from './components/teacherExamine/teacherExamine.js';
import teacherInterview from './components/teacherInterview/teacherInterview.js';
import teacherLecture from './components/teacherLecture/teacherLecture.js';
import teacherPond from './components/teacherPond/teacherPond.js';

//引入样式
import './less/index.less';

ReactDOM.render(
    <Router history = {hashHistory}>
        <Route path="/">
            <IndexRoute component={login} />
            <Route path="login" component={login} />
            <Route path="management" component = {app} >
                <IndexRoute component={teacherManagement} />
                <Route path = "/teacherManagement" component={teacherManagement} />
                <Route path = "/teacherExamine" component={teacherExamine} />
                <Route path = "/teacherInterview" component={teacherInterview} />
                <Route path = "/teacherLecture" component={teacherLecture} />
                <Route path = "/teacherPond" component={teacherPond} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);