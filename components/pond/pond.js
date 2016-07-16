/**
 * Created by cuilu on 16/5/18.
 * 池子页
 */

//引入插件
import React from 'react';
import store from 'store';
import {Post,Get,getById} from '../../util/ajax.js';

//引入组件
import ModalPond from './modalPond.js';
import HotSearch from './../commons/hotSearch.js';
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import ModalFish from './modalFish.js';

var configData = require('../../config/config.json');

var demoCourseUrl = `http://${configData.ip}/web/common/demoCourses/2`;
var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail`;
var fishUrl = `http://${configData.ip}/web/teacherOralEn/fishOutPond`;

var TeacherPond = React.createClass({
    /**
     * 设置组件的状态
     * @returns {{pageSize: number, totalPages: number, curPage: number, curURL: string, curRow: number, curInfo: {}, teacherAccounts: {arr: Array, id: Array}, studentAccounts: {arr: Array, id: Array}, timeSlot: {arr: Array, id: Array}, demoCourse: {arr: Array, id: Array, type: Array}, tableStyle: {tableSize: number, hasCheckBox: boolean, hasOperate: boolean}, list: Array, selected: Array}}
     * @private
     */
    getInitialState : function () {
        return {
            stateStep : 10,
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            getHead : {},
            curRow : 0,
            demoCourse : {
                arr: [],  //课程名称
                id: [],  //课程ID
                type: []  //课程类型
            },
            tableStyle: {
                tableSize : 10,
                selectAll : false,
                hasCheckBox : false,
                hasOperate : true
            },
            list: [],
            msg: ''
        };
    },

    /**
     * 组件第一次渲染时加载列表
     * @private
     */
    componentDidMount : function () {
        //获取空列表
        let getHead = {
            url : searchUrl,
            data : {
                page : 0,
                size : this.state.pageSize,
                stateStep : this.state.stateStep,
                token : store.get("accessToken")
            }
        };
        Get(getHead).then(
            ({data})=> {
                if (data == null) {
                    this.setState({
                        getHead : getHead
                    });
                } else {
                    this.setState({
                        getHead: getHead,
                        totalPages: data.totalPages,
                        list: data.content
                    });
                }
            },
            ()=> {
                alert("查询失败!");
                this.setState({
                    getHead : getHead
                });
            }
        ).catch((err)=>{
            console.log(err);
        });

        //获取demo课列表
        this._getCourse(demoCourseUrl);
    },

    /**
     * 渲染面试页面
     * @returns {XML}
     * @private
     */
    render : function(){
        let tableList = this.state.list.map((v,i) => {
            let triallectureTime = (v.triallectureStartTime !== null)? (`${v.triallectureStartTime} - ${v.triallectureEndTime}`) : '';
            return {
                "createTime" : v.createTime,
                "auditTime" : v.auditTime,
                "interviewTime" : v.interviewTime,
                "triallectureTime" : triallectureTime,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "cellphoneNumber" : v.cellphoneNumber,
                "email" : v.email,
                "timezone" : v.timezone,
                "nationality" : v.nationality,
                "stepNoPassState" : v.stepNoPassState,
                "operate" : (
                    <div>
                        <button className="btn btn-success btn-xs" onClick={(e)=>{this.arrangeFish(i)}}>捕捞</button>
                        <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arangeMore(i)}}>详情</button>
                    </div>
                )
            };
        });
        return(
            <div className="TeacherLecture">
                <ModalPond info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}} course={this.state.demoCourse}/>
                <ModalFish callback={this.fish} />
                <div className="forms" id="forms">
                    <div className="input">
                        <HotSearch ref="hotSearch"/>
                        <div className="form row">
                            <SelectComponent contentData={configData.stateStep} ref="stateStep" />
                            <SelectComponent contentData={configData.timezone} ref="timezone" />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary" onClick={this._search}>筛选</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.pondTable} list={tableList} tableStyle={this.state.tableStyle}/>
                </div>
                <PageList curPage={this.state.curPage} totalPages={this.state.totalPages} onPre={this._prePage} onFirst={this._firstPage}
                          onLast={this._lastPage} onNext={this._nextPage} onJump={(page)=>{this._JumpPage(page)}}/>
            </div>
        );
    },

    /**
     * 在页面顶部显示反馈的信息
     * @param msg: 反馈的信息
     * @private
     */
    _showMsg : function (msg) {
        this.setState({
            msg: msg
        });
        $('.msg-feedback').stop(true);
        $('.msg-feedback').fadeIn(0).delay(1500).fadeOut(1000);
    },

    /**
     * 获取试讲课程类型列表
     * @param myUrl: 试讲课程类型接口地址
     * @private
     */
    _getCourse : function (myUrl) {
        Get({
            url : myUrl,
            data : {
                token : store.get("accessToken")
            }
        }).then(
            ({data}) =>{
                let newCourseArr = ["课程名称"],
                    newCourseId = [-100],
                    newCourseType = [-100];
                for(let i=0 ; i<data.length; i++){
                    newCourseArr.push(data[i].name);
                    newCourseId.push(data[i].courseId);
                    newCourseType.push(data[i].courseType);
                }
                this.setState({
                    demoCourse: {
                        arr: newCourseArr,
                        id : newCourseId,
                        type : newCourseType
                    }
                });
            },
            () => {
                alert("未能获取可选试讲课类型,不能安排试讲!");
            }
        ).catch((err) => {
            console.log(err);
        });
    },

    /**
     * 点击"筛选"按钮,触发ajax请求,刷新列表
     * @private
     */
    _search : function () {
        let firstName = this.refs.hotSearch.state.firstName,
            lastName = this.refs.hotSearch.state.lastName,
            cellphoneNumber = this.refs.hotSearch.state.cellphoneNumber,
            email = this.refs.hotSearch.state.email,
            nationality = this.refs.hotSearch.state.nationality,
            timezone = this.refs.timezone.state.value,
            stateStep = this.refs.stateStep.state.value,
            data = {
                page : 0,
                size : this.state.pageSize,
                stateStep : this.state.stateStep,
                token : store.get("accessToken")
            };
        (firstName.length >0) && (data.firstName = firstName);
        (lastName.length >0) && (data.lastName=lastName);
        (cellphoneNumber.length >0) && (data.cellphoneNumber=cellphoneNumber);
        (email.length >0) && (data.email=email);
        (nationality != "-100") && (data.nationality=nationality);
        (timezone != -100) && (data.timezone=timezone);
        (stateStep != -100) && (data.stateStep=stateStep);

        let getHead = {
            url : searchUrl,
            data : data
        };

        Get(getHead).then(
            ({data})=> {
                if (data == null) {
                    this.setState({
                        curPage: 1,
                        totalPages: 1,
                        getHead : getHead,
                        list: []
                    });
                } else {
                    this.setState({
                        getHead: getHead,
                        curPage: 1,
                        totalPages: data.totalPages,
                        list: data.content
                    });
                }
            },
            ()=> {
                alert("查询失败!");
                this.setState({
                    curPage: 1,
                    totalPages: 1,
                    getHead : getHead,
                    list: []
                });
            }
        ).catch((err)=>{
            console.log(err);
        });

    },

    /**
     * 不改变url,获取第page页数据
     * @param page: 表示需要获取的页面,从1开始
     * @private
     */
    _getPage : function (page) {
        let getHead = Object.assign({},this.state.getHead);
        getHead.data.page = page - 1;
        Get(getHead).then(
            ({data}) => {
                if(data == null ){
                    alert("没有数据!");
                    return;
                }
                this.setState({
                    curPage : page,
                    list : data.content
                });
            },
            () => {
                console.log("获取教师列表失败!");
            }
        ).catch((err)=>{
            console.log(err);
        });
    },

    /**
     * 跳转到上一页
     * @private
     */
    _prePage : function () {
        if(this.state.curPage == 1)
            return;
        this._getPage(this.state.curPage - 1);
    },

    /**
     * 跳转到首页
     * @private
     */
    _firstPage : function () {
        if(this.state.curPage == 1)
            return;
        this._getPage(1);
    },

    /**
     * 跳转到尾页
     * @private
     */
    _lastPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.totalPages);
    },

    /**
     * 跳转到下一页
     * @private
     */
    _nextPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.curPage + 1);
    },

    /**
     * 跳转到指定页
     * @param page: 目标页数
     * @private
     */
    _JumpPage : function (page) {
        if(this.state.curPage == page)
            return;
        this._getPage(page);
    },

    /**
     * 点击"表格"中的"捕捞"按钮,触发"捕捞模态框"
     * @param i : 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arrangeFish : function (i) {
        this.setState({
            curRow : i
        });
        $(".modalFish .modal").modal();
    },

    /**
     * 点击"捕捞模态框"中的"确定"按钮,触发捕捞事件
     */
    fish : function () {
        let emails = [this.state.list[this.state.curRow].email];
        let postHead = {
            url : `${fishUrl}?token=${store.get("accessToken")}`,
            data : {
                "emails" : emails
            }
        };
        Post(postHead).then(
            () => {
                $(".modalFish .modal").modal('hide');
                this._getPage(this.state.curPage);
                this._showMsg("捕捞成功");
            },
            () => {
                alert("捕捞失败,请重试!");
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    },

    /**
     * 点击"详情"按钮,触发详情模态框,通过ajax请求获取当前教师的信息,显示在详情模态框中
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arangeMore : function(i){
        this.setState({
            curRow : i
        });
        let getHead = {
            url : infoUrl,
            data : {
                email : this.state.list[i].email,
                token : store.get("accessToken")
            }
        };

        Get(getHead).then(
            ({data, returnCode})=>{
                if(returnCode == 401)
                    return;
                if(data){
                    this.setState({
                        curInfo : data
                    });
                    $(".modalPond .modal").modal();
                }else{
                    alert("该用户的信息为空!");
                }
            },
            ()=>{
                alert("获取该用户的信息失败!")
            }
        ).catch((err)=>{
            console.log(err);
        });
    }
});

export default TeacherPond;