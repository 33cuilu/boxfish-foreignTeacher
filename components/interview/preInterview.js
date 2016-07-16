/**
 * Created by cuilu on 16/5/18.
 * 面试页
 */


//引入插件
import React from 'react';
import store from 'store';
import {Post,Get,getById} from '../../util/ajax.js';

//引入组件
import ModalDetail from '../commons/modalDetail.js';
import HotSearch from './../commons/hotSearch.js';
import OtherSearch from './../commons/otherSearch.js';
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import ModalAdopt from './../commons/modalAdopt.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalUnArrange from './../commons/modalUnArrange.js';


//引入配置文件
var configData = require('../../config/config.json');

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail`;
var inPondsUrl = `http://${configData.ip}/web/teacherOralEn/putPond`;
var passUrl = `http://${configData.ip}/web/teacherOralEn/updateStatePass`;
var genderUrl = `http://${configData.ip}/web/teacherOralEn/updateGender`;
var interviewTimeUrl = `http://${configData.ip}/web/teacherOralEn/updateDate`;
var teamUrl = `http://${configData.ip}/web/teacherOralEn/updateTeam`;
var unArrangeUrl = `http://${configData.ip}/web/teacherOralEn/unArrange`;

var TeacherInterview = React.createClass({

    /**
     * 设置组件的状态
     * @returns {{stateStep: number, nextState: number, pageSize: number, totalPages: number, curPage: number, getHead: {}, curRow: number, curInfo: {}, tableStyle: {tableSize: number, selectAll: boolean, hasCheckBox: boolean, hasOperate: boolean}, list: Array, msg: string}}
     */
    getInitialState : function () {
        return {
            stateStep : 1,
            nextState : 2,
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            getHead : {},
            curRow : 0,
            curInfo : {},
            tableStyle : {
                tableSize : 10,
                selectAll : false,
                hasCheckBox : false,
                hasOperate : true
            },
            list : [],
            msg : ''
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
    },

    /**
     * 渲染面试页面
     * @returns {XML}
     */
    render : function(){
        let tableList = this.state.list.map((v,i) => {
            return {
                "createTime" : v.createTime,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "cellphoneNumber" : v.cellphoneNumber,
                "email" : v.email,
                "nationality" : v.nationality,
                "location" : v.location,
                "timezone" : v.timezone,
                "channel" : v.channel,
                "interviewChannel" : getById(configData.interviewChannel, v.interviewChannel),
                "interviewAccount" : v.interviewAccount,
                "gender" : <SelectComponent contentData={configData.gender} value={v.gender} onChange={(value)=>{this.updateGender(i,value)}}/>,
                "team" : <SelectComponent contentData={configData.team} value={v.team} onChange={(value)=>{this.updateTeam(i,value)}}/>,
                "interviewTime" : <TimePicker type="1" value={v.interviewTime} place=".tableContainer" unclear={true} minDay={true} onChange={(date)=>{this.updateInterviewTime(i,date)}}/>,
                "operate" : (
                    <div>
                        <i className="glyphicon glyphicon-ok" onClick={(e)=>{this.arangeAdopt(i)}}></i>
                        <i className="glyphicon glyphicon-remove" onClick={(e)=>{this.arangeInPond(i)}}></i>
                        <button className="btn btn-xs btn-warning" onClick={(e)=>{this.arrangeWait(i)}}>待安排</button>
                        <button className="btn btn-xs btn-primary" onClick={(e)=>{this.arangeMore(i)}}>详情</button>
                    </div>
                )
            };
        });
        return(
            <div className="TeacherInterview">
                <ModalDetail info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}}/>
                <ModalAdopt callback={this.adopt}/>
                <ModalInPond callback={this.inPonds}/>
                <ModalUnArrange callback={this.unArrange} />
                <div className="msg-feedback">{this.state.msg}</div>
                <div className="forms" id="forms">
                    <div className="input">
                        <HotSearch ref="hotSearch"/>
                        <div className="form row">
                            <OtherSearch ref="otherSearch" />
                            <SelectComponent contentData={configData.gender} ref="gender" />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary" onClick={this._search}>筛选</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table ref="table" contentData={configData.interviewTable} list={tableList} tableStyle={this.state.tableStyle} />
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
        $('.msg-feedback').fadeIn(0).delay(1000).fadeOut(1000);
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
            location = this.refs.otherSearch.state.location,
            channel = this.refs.otherSearch.state.value,
            timezone = this.refs.otherSearch.state.timezone,
            gender = this.refs.otherSearch.state.gender,
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
        (location != "-100" ) && (data.location=location);
        (channel != -100) && (data.channel=channel);
        (timezone != -100) && (data.timezone=timezone);
        (gender != -100) && (data.gender=gender);

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
     * 点击表格中的时间选择部件,触发安排面试时间事件.向后台发送ajax请求,并更新当前教师的信息
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @param date: 表示选择的面试时间
     * @public (子组件"表格"调用)
     */
    updateInterviewTime : function (i,date) {
        let postHead = {
                url : `${interviewTimeUrl}?token=${store.get("accessToken")}`,
                data : {
                    "email": this.state.list[i].email,
                    "dateColumn": 1,
                    "dateValue": date
                }
            };
        Post(postHead).then(
            () =>{
                this._getPage(this.state.curPage);
                this._showMsg("操作成功");
            },
            () =>{
                console.log("安排面试时间失败!");
            }
        ).catch(
            (err) =>{console.log(err);}
        );
    },

    /**
     * 点击表格中的性别下拉列表,触发为当前教师选择性别事件.向后台发送ajax请求,并更新当前教师的信息
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @param value: 表示性别,0为女,1为男
     * @public (子组件"表格"调用)
     */
    updateGender : function (i,value) {
        if(value == -100){
            alert("不可取消性别!");
            this._getPage(this.state.curPage);
            return;
        }
        let postHead = {
                url : `${genderUrl}?token=${store.get("accessToken")}`,
                data : {
                    "email": this.state.list[i].email,
                    "gender": value - 0
                }
            };
        Post(postHead).then(
            () =>{
                this._getPage(this.state.curPage);
                this._showMsg("操作成功");
            },
            () =>{
                console.log("更改性别失败!");
            }
        ).catch(
            (err) =>{console.log(err);}
        );
    },

    /**
     * 点击表格中的分组下拉列表,触发为当前教师选择分组事件.向后台发送ajax请求,并更新当前教师的信息
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @param value: 表示分组,1为team1,2为team2,3为team3,4为team4
     * @public (子组件"表格"调用)
     */
    updateTeam : function (i,value) {
        console.log("change team");
        if(value == -100){
            alert("不可取消分组!");
            this._getPage(this.state.curPage);
            return;
        }
        let postHead = {
            url : `${teamUrl}?token=${store.get("accessToken")}`,
            data : {
                "email": this.state.list[i].email,
                "team": +value
            }
        };
        Post(postHead).then(
            () =>{
                this._getPage(this.state.curPage);
                this._showMsg("操作成功");
            },
            () =>{
                console.log("更改分组失败!");
            }
        ).catch(
            (err) =>{console.log(err);}
        );
    },

    /**
     * 点击"通过"按钮,触发通过模态框,确定当前通过的教师序号
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arangeAdopt : function(i){
        this.setState({
            curRow: i
        });
        $(".modalAdopt .modal").modal();
    },

    /**
     * 通过模态框中点击"确定"按钮,触发通过事件.通过ajax请求将当前教师的email发送给后台,然后ajax请求重新获取教师列表
     * @param name: 面试官的姓名
     * @public (子组件"通过模态框"调用)
     */
    adopt : function (name) {
        if(name.length == 0){
            alert("面试官姓名不能为空");
            return;
        }
        if(name.length >= 10){
            alert("面试官姓名超过10个汉字");
            return;
        }
        let postHead = {
                url : `${passUrl}?token=${store.get("accessToken")}`,
                data : {
                    "email": this.state.list[this.state.curRow].email,
                    "stateStep": this.state.nextState
                }
            };
        Post(postHead).then(
            ({returnCode, returnMsg}) => {
                if(returnCode == 401){
                    $(".modalAdopt .modal").modal('hide');
                    return;
                }
                if(returnMsg !== "success"){
                    alert(returnMsg);
                    $(".modalAdopt .modal").modal('hide');
                }else{
                    $(".modalAdopt .modal").modal('hide');
                    this._getPage(this.state.curPage);
                    this._showMsg("操作成功");
                }
            },
            () => {
                alert("通过操作失败,请重试!");
            }).catch();
    },

    /**
     * 点击"入池"按钮,触发入池模态框,确定当前入池的教师序号
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arangeInPond : function(i){
        this.setState({
            curRow: i
        });
        $(".modalInPond .modal").modal();
    },

    /**
     * 入池模态框和批量入池模态框中点击"确定"按钮,触发入池事件.通过ajax请求将选中的教师的emails数组发送给后台,然后ajax请求重新获取教师列表
     * @param num: 表明需要执行"入池"还是"批量入池"操作. 1表示"入池",2表示"批量入池".
     * @param reason: 表明"入池"或"批量入池"的原因,不能为空.
     * @public (子组件"入池模态框"和"批量入池模态框"调用)
     */
    inPonds : function (num,reason) {
        if(reason.length <=0){
            alert("入池理由不能为空");
            return;
        }
        if(reason.length >=50){
            alert("入池理由超过50字");
            return;
        }
        let emails = [];
        emails.push(this.state.list[this.state.curRow].email);

        let postHead = {
            url : `${inPondsUrl}?token=${store.get("accessToken")}`,
            data : {
                "emails": emails,
                "noPassReason": reason
            }
        };
        Post(postHead).then(
            () => {
                $(".modalInPond .modal").modal('hide');
                this._getPage(this.state.curPage);
                this._showMsg("操作成功");
            },
            () => {
                alert("入池失败,请重试!");
            }).catch(
            (err) => {
                console.log(err);
            }
        );
    },

    /**
     * 点击待安排按钮,触发待安排模态框
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     */
    arrangeWait: function (i) {
        this.setState({
            curRow: i
        });
        $(".modalUnArrange .modal").modal();
    },

    /**
     * 待安排模态框中点击"确定"按钮,触发进入安排队列事件.
     */
    unArrange : function () {
        let postHead = {
            url : `${unArrangeUrl}?token=${store.get("accessToken")}`,
            data : {
                "email": this.state.list[this.state.curRow].email,
                "stateStep": this.state.nextState
            }
        };
        Post(postHead).then(
            () => {
                $(".modalUnArrange .modal").modal('hide');
                this._getPage(this.state.curPage);
                this._showMsg("操作成功");
            },
            () => {
                alert("操作失败,请重试!");
            }).catch(
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
    arangeMore : function (i) {
        this.setState({
            curRow: i
        });
        let getHead = {
            url : infoUrl,
            data : {
                email : this.state.list[i].email,
                token : store.get("accessToken")
            }
        };
        Get(getHead).then(
            ({data,returnCode})=>{
                if(returnCode == 401)
                    return;
                if(data){
                    this.setState({
                        curInfo : data
                    });
                    $(".modalDetail .modal").modal();
                }else{
                    alert("该用户的详情为空!");
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

export default TeacherInterview;