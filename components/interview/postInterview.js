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
import ModalInterviewAdopt from './modalInterviewAdopt.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherInterview.less";

//引入配置文件
var configData = require('../../config/config.json');

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail`;
var inPondsUrl = `http://${configData.ip}/web/teacherOralEn/putPond`;
var passUrl = `http://${configData.ip}/web/teacherOralEn/updateStatePass`;
var genderUrl = `http://${configData.ip}/web/teacherOralEn/updateGender`;
var interviewTimeUrl = `http://${configData.ip}/web/teacherOralEn/updateDate`;
var updateLevelUrl = `http://${configData.ip}/web/teacherOralEn/updateLevel`;

var TeacherInterview = React.createClass({

    /**
     * 设置组件的状态
     * @returns {{pageSize: number, totalPages: number, curPage: number, curURL: string, curRow: number, curInfo: {}, tableStyle: {tableSize: number, hasCheckBox: boolean, hasOperate: boolean}, list: Array, selected: Array, nationalityLevel: number, snack: number, spokenLevel: number}}
     * @private
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
                hasCheckBox : true,
                hasOperate : true
            },
            list : [],
            selected : [],
            nationalityLevel : -100,
            snack : -100,
            spokenLevel : -100
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
                        getHead : getHead,
                        selected : []
                    });
                } else {
                    this.setState({
                        getHead: getHead,
                        totalPages: data.totalPages,
                        list: data.content,
                        selected : []
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
            let isCheck = ($.inArray(v.email,this.state.selected) != -1);
            return {
                "checkbox" : <input type="checkbox" checked={isCheck}  onChange={(e)=>{this.select(e,i)}}/>,
                "auditTime" : v.auditTime,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "nationality" : v.nationality,
                "timezone" : v.timezone,
                "cellphoneNumber" : v.cellphoneNumber,
                "email" : v.email,
                "nationalityLevel" : getById(configData.nationalityLevel, v.nationalityLevel),
                "interviewTime" : <TimePicker type="1" value={v.interviewTime} place=".tableContainer" unclear={true} minDay={true} onChange={(date)=>{this.updateInterviewTime(i,date)}}/>,
                "gender" : <SelectComponent contentData={configData.gender} value={v.gender} onChange={(value)=>{this.updateGender(i,value)}}/>,
                "snack" : getById(configData.snack, v.snack),
                "spokenLevel" : getById(configData.spokenLevel, v.spokenLevel),
                "teachingExperience" : getById(configData.experienceDetail, v.teachingExperience),
                "operate" : (
                    <div>
                        <button className="btn btn-success btn-xs" onClick={(e)=>{this.arangeAdopt(i)}}>通过</button>
                        <button className="btn btn-warning btn-xs" onClick={(e)=>{this.arangeInPond(i)}}>入池</button>
                        <button className="btn btn-link btn-xs" onClick={(e)=>{this.arangeMore(i)}}>详情</button>
                    </div>
                )
            };
        });
        return(
            <div className="TeacherInterview">
                <ModalDetail info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}}/>
                <ModalInterviewAdopt callback={this.adopt}/>
                <ModalInPond callback={this.inPonds}/>
                <ModalInPonds callback={this.inPonds}/>
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
                    <Table ref="table" contentData={configData.interviewTable} list={tableList} tableStyle={this.state.tableStyle} selectAll={this.selectAll}/>
                </div>
                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-warning btn-sm" onClick={this._arangeInPonds}>批量入池</button>
                        <div className="btn-right-select">
                            <label>国家级别</label>
                            <SelectComponent size="small" ref="nationalityLevelBottom" contentData={configData.nationalityLevel} onChange={(value)=>{this.setState({nationalityLevel : value - 0})}}/>
                            <button className="btn btn-primary btn-sm" onClick={(e)=>{this._edit("nationalityLevel")}}>确定</button>
                        </div>
                        <div className="btn-right-select">
                            <label>零食</label>
                            <SelectComponent size="small" ref="snackBottom" contentData={configData.snack} onChange={(value)=>{this.setState({snack : value - 0})}}/>
                            <button className="btn btn-primary btn-sm" onClick={(e)=>{this._edit("snack")}}>确定</button>
                        </div>
                        <div className="btn-right-select">
                            <label>口语水平</label>
                            <SelectComponent size="small" ref="spokenLevelBottom" contentData={configData.spokenLevel} onChange={(value)=>{this.setState({spokenLevel : value - 0})}}/>
                            <button className="btn btn-primary btn-sm" onClick={(e)=>{this._edit("spokenLevel")}}>确定</button>
                        </div>
                    </div>
                </div>
                <PageList curPage={this.state.curPage} totalPages={this.state.totalPages} onPre={this._prePage} onFirst={this._firstPage} onLast={this._lastPage} onNext={this._nextPage}/>
            </div>
        );
    },

    /**
     * 查询表单的展开动画
     * @private
     */
    _changeForm : function() {
        $("#forms").toggleClass("forms-extern-more");
    },

    /**
     * 点击"筛选"按钮,触发ajax请求,刷新列表
     * @private
     */
    _search : function () {
        let auditTimeStart = this.refs.checkDate.state.start,
            auditTimeEnd = this.refs.checkDate.state.end,
            firstName = this.refs.contentInput.state.firstName,
            lastName = this.refs.contentInput.state.lastName,
            nationality = this.refs.contentInput.state.nationality,
            timezone = this.refs.contentInput.state.timezone,
            cellphoneNumber = this.refs.contentInput.state.cellphoneNumber,
            email = this.refs.contentInput.state.email,
            snack = this.refs.snack.state.value - 0,
            gender = this.refs.gender.state.value - 0,
            nationalityLevel = this.refs.nationalityLevel.state.value - 0,
            spokenLevel = this.refs.spokenLevel.state.value - 0,
            isHasTeachingExperience = this.refs.experience.state.value - 0,
            interviewTimeStart = this.refs.interviewTime.state.start,
            interviewTimeEnd = this.refs.interviewTime.state.end,
            isHasInterviewTime = this.refs.reservationInterview.state.value - 0,
            data = {
                page : 0,
                size : this.state.pageSize,
                stateStep : this.state.stateStep,
                token : store.get("accessToken")
            };

        (auditTimeStart.length >0) && (data.auditTimeStart=auditTimeStart) &&(data.auditTimeEnd=auditTimeEnd);
        (firstName.length >0) && (data.firstName = firstName);
        (lastName.length >0) && (data.lastName=lastName);
        (nationality != -100) && (data.nationality=nationality);
        (timezone != -100) && (data.timezone=timezone);
        (cellphoneNumber.length >0) && (data.cellphoneNumber=cellphoneNumber);
        (email.length >0) && (data.email=email);
        (snack != -100 ) && (data.snack=snack);
        (gender != -100) && (data.gender=gender);
        (nationalityLevel != -100) && (data.nationalityLevel=nationalityLevel);
        (spokenLevel != -100) && (data.spokenLevel=spokenLevel);
        (isHasTeachingExperience != -100) && (data.isHasTeachingExperience=isHasTeachingExperience);
        (interviewTimeStart.length >0) && (data.interviewTimeStart=interviewTimeStart) &&(data.interviewTimeEnd=interviewTimeEnd);
        (isHasInterviewTime != -100) && (data.isHasInterviewTime=isHasInterviewTime);

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
                        list: [],
                        selected : []
                    });
                } else {
                    this.setState({
                        getHead: getHead,
                        curPage: 1,
                        totalPages: data.totalPages,
                        list: data.content,
                        selected : []
                    });
                }
            },
            ()=> {
                alert("查询失败!");
                this.setState({
                    curPage: 1,
                    totalPages: 1,
                    getHead : getHead,
                    list: [],
                    selected: []
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
                    list : data.content,
                    selected : []
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
     * 点击表格中的复选框,触发当前行选中事件
     * @param e: 点击事件
     * @param i: 选中的行在表格中的序号
     * @public (子组件"表格"调用)
     */
    select : function (e,i) {
        let selectList = this.state.selected;
        if(e.target.checked){
            selectList = this.state.selected.concat(this.state.list[i].email);
        }else{
            this.state.selected.splice($.inArray(this.state.list[i].email, this.state.selected),1);
        }
        this.setState({
            selected : selectList
        });
    },

    /**
     * 点击表头中的复选框,触发全选事件
     * @param state: 全选状态. false表示不选中,true表示选中
     * @public (子组件"表格"调用)
     */
    selectAll : function (state) {
        let selectList = [];
        if(state){
            for(let i=0; i< this.state.list.length; i++){
                selectList.push(this.state.list[i].email);
            }
        }
        this.setState({
            selected : selectList
        });
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
     * @param index: 表示性别,0为女,1为男
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
            },
            () =>{
                console.log("更改性别失败!");
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
        $(".modalInterviewAdopt .modal").modal();
    },

    /**
     * 通过模态框中点击"确定"按钮,触发通过事件.通过ajax请求将当前教师的email发送给后台,然后ajax请求重新获取教师列表
     * @public (子组件"通过模态框"调用)
     */
    adopt : function () {
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
                    $(".modalInterviewAdopt .modal").modal('hide');
                    return;
                }
                if(returnMsg !== "success"){
                    alert(returnMsg);
                    $(".modalInterviewAdopt .modal").modal('hide');
                }else{
                    $(".modalInterviewAdopt .modal").modal('hide');
                    this._getPage(this.state.curPage);
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
     * 点击"批量入池"按钮,触发批量入池模态框
     * @private
     */
    _arangeInPonds : function(){
        $(".modalInPonds .modal").modal();
    },

    /**
     * 入池模态框和批量入池模态框中点击"确定"按钮,触发入池事件.通过ajax请求将选中的教师的emails数组发送给后台,然后ajax请求重新获取教师列表
     * @param num: 表明需要执行"入池"还是"批量入池"操作. 1表示"入池",2表示"批量入池".
     * @param reason: 表明"入池"或"批量入池"的原因,不能为空.
     * @public (子组件"入池模态框"和"批量入池模态框"调用)
     */
    inPonds : function (num,reason) {
        if(reason.length <=0){
            alert("请填写入池理由");
            return;
        }
        let emails = [];
        if(num == 1){
            emails.push(this.state.list[this.state.curRow].email);
        }else{
            emails = this.state.selected;
        }
        if(emails.length <=0){
            alert("请选中入池的教师!");
            return;
        }
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
                $(".modalInPonds .modal").modal('hide');
                this._getPage(this.state.curPage);
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
                    alert("该用户的信息为空!");
                }
            },
            ()=>{
                alert("获取该用户的信息失败!")
            }
        ).catch((err)=>{
            console.log(err);
        });
    },

    /**
     * 表格下方可以批量修改"国家级别","零食"和"口语水平".点击"确定"按钮即可提交更改,触发批量修改事件
     * @param attr: 需要批量更改的属性名称. nationalityLevel"国家级别", snack表示更改"零食", spokenLevel表示更改"口语水平".
     * @private
     */
    _edit : function (attr) {
        let emails = this.state.selected;
        if(emails.length <=0){
            alert("请选中至少一个教师!");
            return;
        }
        let postHead = {
            url: `${updateLevelUrl}?token=${store.get("accessToken")}`,
            data : {
                "emails": emails,
                "changeLevel":0,
                "intValue":1
            }
        };
        switch (attr){
            case "nationalityLevel" :
                if(this.state.nationalityLevel == -100){
                    alert("请选择一个国家级别!");
                    return;
                }
                postHead.data.changeLevel = 2;
                postHead.data.intValue = this.state.nationalityLevel;
                break;
            case "snack" :
                if(this.state.snack == -100){
                    alert("请选择一种零食!");
                    return;
                }
                postHead.data.changeLevel = 1;
                postHead.data.intValue = this.state.snack;
                break;
            default:
                if(this.state.spokenLevel == -100){
                    alert("请选择一种口语水平!");
                    return;
                }
                postHead.data.changeLevel = 3;
                postHead.data.intValue = this.state.spokenLevel;
                break;
        }
        Post(postHead).then(
            () => {
                this._getPage(this.state.curPage);
            },
            () => {
                alert("修改失败,请重试!");
            }).catch(
            (err) => {
                console.log(err);
            }
        );
    }
});

export default TeacherInterview;