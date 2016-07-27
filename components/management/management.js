/**
 * Created by cuilu on 16/5/18.
 * 师资管理页
 */

//引入插件
import React from 'react';
import {Post,Get,getById} from '../../util/ajax.js';
import store from 'store';

//引入组件
import ModalDetail from './../commons/modalDetail.js';
import HotSearch from './../commons/hotSearch.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import ModalManagementFrozen from "./modalManagementFrozen.js";
import ModalManagementActivation from './modalManagementActivation.js';
import ModalScore from './../commons/modalScore.js';

//引入样式
import "../../less/teacherManagement.less";

var configData = require('../../config/config.json');

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList`;
var batchIsActiveUrl = `http://${configData.ip}/web/teacherOralEn/batchIsActive`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail`;
var arrangeAccountUrl = `http://${configData.ip}/web/common/distributeAccount`;
var scoreUrl = `http://${configData.ip}/web/teacherOralEn/updateTrialScore`;

var Management = React.createClass({
    /**
     * 设置组件的状态
     * @returns {{pageSize: number, totalPages: number, curPage: number, curURL: string, curRow: number, curInfo: {}, tableStyle: {tableSize: number, hasCheckBox: boolean, hasOperate: boolean}, list: Array, selected: Array}}
     * @private
     */
    getInitialState : function () {
        return {
            stateStep : 4,
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            getHead : {},
            curRow : 0,
            curInfo : {},
            tableStyle: {
                tableSize : 10,
                selectAll : false,
                hasCheckBox : true,
                hasOperate : true
            },
            score : {
                creativeAndExpression : -100,
                adaptAndLead : -100,
                nationalityLevel : -100,
                snack : -100,
                spokenLevel : -100,
                teachingExperience : -100
            },
            list : [],
            selected : [],
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
     * @private
     */
    render : function(){
        let tableList = this.state.list.map((v,i) => {
            let isCheck = ($.inArray(v.email,this.state.selected) != -1);
            return {
                "checkbox" : <input type="checkbox" checked={isCheck} onChange={(e)=>{this.select(e,i)}}/>,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "cellphoneNumber" : v.cellphoneNumber,
                "email" : v.email,
                "nationality" : v.nationality,
                "location" : v.location,
                "timezone" : v.timezone,
                "channel" : getById(configData.channel, v.channel),
                "interviewTime" : v.interviewTime,
                "triallectureTime" : v.triallectureStartTime?`${v.triallectureStartTime} - ${v.triallectureEndTime}`:'',
                "nationalityLevel" : getById(configData.nationalityLevel, v.nationalityLevel),
                "snack" : getById(configData.snack, v.snack),
                "spokenLevel" : getById(configData.spokenLevel, v.spokenLevel),
                "teachingExperience" : getById(configData.experienceDetail, v.experienceDetail),
                "creaticve" : v.creativeAndExpression,
                "expand" : v.adaptAndLead,
                "markScore" : v.markScore,
                "note" : v.note,
                "isActive" : getById(configData.isActive, v.isActive),
                "operate" : (
                    <div>
                        <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arrangeAccount(i)}}>分配账号</button>
                        <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arrangeScore(i)}}>评分</button>
                        <button className="btn btn-link btn-xs" onClick={(e)=>{this.arrangeMore(i)}}>详情</button>
                    </div>
                )
            };
        });
        return(
            <div className="teacherManagement">
                <ModalDetail info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}}/>
                <ModalManagementFrozen callback={this.isActive}/>
                <ModalManagementActivation callback={this.isActive}/>
                <ModalScore defaultContent={this.state.score}  callback={this.score}/>

                <div className="forms" id="forms">
                    <div className="input">
                        <HotSearch ref="hotSearch" type="1"/>
                        <div className="form row">
                            <SelectComponent contentData={configData.location} ref="location" />
                            <SelectComponent contentData={configData.channel} ref="channel" />
                            <SelectComponent contentData={configData.timezone} ref="timezone" />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary" onClick={this._search}>筛选</button>
                    </div>
                </div>

                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-primary btn-sm" onClick={this._arrangeFrozen}>冻结</button>
                        <button className="btn btn-success btn-sm" onClick={this._arrangeActivation}>激活</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.managementTable} list={tableList} tableStyle={this.state.tableStyle} selectAll={this.selectAll}/>
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
     * 点击"筛选"按钮,触发ajax请求,刷新列表
     * @private
     */
    _search : function () {
        let firstName = this.refs.hotSearch.state.firstName,
            lastName = this.refs.hotSearch.state.lastName,
            cellphoneNumber = this.refs.hotSearch.state.cellphoneNumber,
            nickName = this.refs.hotSearch.state.nickName,
            nationality = this.refs.hotSearch.state.nationality,
            location = this.refs.otherSearch.state.location,
            timezone = this.refs.otherSearch.state.timezone,
            channel = this.refs.otherSearch.state.value,
            data = {
                page : 0,
                size : this.state.pageSize,
                stateStep : this.state.stateStep,
                token : store.get("accessToken")
            };
        (firstName.length >0) && (data.firstName = firstName);
        (lastName.length >0) && (data.lastName=lastName);
        (cellphoneNumber.length >0) && (data.cellphoneNumber=cellphoneNumber);
        (nickName.length >0) && (data.nickName=nickName);
        (nationality != "-100") && (data.nationality=nationality);
        (location != "-100" ) && (data.location=location);
        (channel != -100) && (data.channel=channel);
        (timezone != -100) && (data.timezone=timezone);

        let getHead = {
            url : searchUrl,
            data : data
        };

        Get(getHead).then(
            ({data})=> {
                let selectList = new Array(data.content.length);
                for(let i=0; i<selectList.length; i++){
                    selectList[i] = false;
                }
                if (data == null) {
                    this.setState({
                        curPage: 1,
                        totalPages: 1,
                        getHead : getHead,
                        list: [],
                        selected : selectList
                    });
                } else {
                    this.setState({
                        getHead: getHead,
                        curPage: 1,
                        totalPages: data.totalPages,
                        list: data.content,
                        selected : selectList
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
                let selectList = new Array(data.content.length);
                for(let i=0; i<selectList.length; i++){
                    selectList[i] = false;
                }
                if(data == null ){
                    alert("没有数据!");
                    return;
                }
                this.setState({
                    curPage : page,
                    list : data.content,
                    selected : selectList
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
     * 点击"冻结"按钮,触发"冻结模态框"
     * @private
     */
    _arrangeFrozen : function(){
        $(".modalManagementFrozen .modal").modal();
    },

    /**
     * 点击"激活"按钮,触发"激活模态框"
     * @private
     */
    _arrangeActivation : function(){
        $(".modalManagementActivation .modal").modal();
    },

    /**
     * 点击"冻结模态框"或"激活模态框"中的"确定"按钮,触发冻结或激活事件
     * @param state: 账号更改后的状态. 0表示冻结,1表示激活
     * @public (子组件"冻结模态框"和"激活模态框"调用)
     */
    isActive : function (state) {
        let emails = this.state.selected;
        if(emails.length <=0){
            alert("至少选中一个教师!");
            return;
        }
        let postHead = {
            url : `${batchIsActiveUrl}?token=${store.get("accessToken")}`,
            data : {
                "emails": emails,
                "stateValue": state
            }
        };
        Post(postHead).then(
            () => {
                $(".modalManagementFrozen .modal").modal('hide');
                $(".modalManagementActivation .modal").modal('hide');
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
     * 点击表格中的"分配账号"按钮,触发分配账号事件.向后台发送ajax请求
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arrangeAccount : function (i) {
        let postHead = {
            url : `${arrangeAccountUrl}?token=${store.get("accessToken")}`,
            data : {
                "email": this.state.list[i].email
            }
        };
        Post(postHead).then(
            ({returnCode}) => {
                if(returnCode == 401)
                    return;
                this._getPage(this.state.curPage);
                this._showMsg("操作成功");
            },
            () => {
                alert("分配账号失败!");
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    },

    /**
     * 点击表格中的"评分"按钮,触发"评分模态框".
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arrangeScore : function (i) {
        let obj = this.state.list[i];
        let score = {
                creativeAndExpression : (obj.trialScoresMap)?obj.trialScoresMap.creativeAndExpression:-100,
                adaptAndLead : (obj.trialScoresMap)?obj.trialScoresMap.adaptAndLead:-100,
                nationalityLevel : obj.nationalityLevel||-100,
                spokenLevel : obj.spokenLevel||-100,
                snack : obj.snack||-100,
                teachingExperience : obj.teachingExperience||-100
            };
        this.setState({
            curRow : i,
            score : score
        });
        $(".modalScore .modal").modal();
    },

    /**
     * 点击"试讲评分模态框"中"确定"按钮,触发试讲评分事件.
     * @param id1: 创意和表达选择序号
     * @param id2: 适应和引导选择序号
     * @param id3: 国家水平选择序号
     * @param id4: 口语水平选择序号
     * @param id5: 零食选择序号
     * @param id6: 教学经验选择序号
     * @public (子组件"评分模态框"调用)
     */
    score : function(id1,id2,id3,id4,id5,id6) {
        if(id1 == -100 || id2 == -100 || id3 == -100 || id4 == -100 || id5 == -100 || id6 == -100){
            alert("请为每个项目打分!");
            return;
        }
        let postHead = {
            url: `${scoreUrl}?token=${store.get("accessToken")}`,
            data: {
                "email": this.state.list[this.state.curRow].email,
                "trialScoresMap": {
                    "creativeAndExpression": id1,
                    "adaptAndLead": id2
                },
                "nationalityLevel" : id3,
                "spokenLevel" : id4,
                "snack" : id5,
                "teachingExperience" : id6
            }
        };

        Post(postHead).then(
            () => {
                $(".modalScore .modal").modal('hide');
                this._getPage(this.state.curPage);
                this._showMsg("保存成功");
            },
            () => {
                alert("试讲评分操作失败,请重试!");
            }
        ).catch(
            (err) => { console.log(err)}
        );
    },

    /**
     * 点击"详情"按钮,触发详情模态框,通过ajax请求获取当前教师的信息,显示在详情模态框中
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arrangeMore : function (i) {
        this.setState({
            curRow : i
        });
        let getHead = {
            url : infoUrl,
            data : {
                "email" : this.state.list[i].email,
                "token" : store.get("accessToken")
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
    }
});

export default Management;
