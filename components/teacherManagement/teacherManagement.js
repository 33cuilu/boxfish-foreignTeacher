/**
 * Created by cuilu on 16/5/18.
 * 师资管理页
 */

//引入插件
import React from 'react';
import {Post,Get,getById} from '../../util/ajax.js';

//引入组件
import ModalManagement from './modalManagement.js';
import ContentInput from './../commons/contentInput.js';
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import ModalManagementFrozen from "./modalManagementFrozen.js";
import ModalManagementActivation from './modalManagementActivation.js';
import ModalTryScore from './../commons/modalTryScore.js';
import ModalInterviewScore from './modalInterviewScore.js';

//引入样式
import "../../less/teacherManagement.less";

var configData = require('../../config/config.json');

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList`;
var batchIsActiveUrl = `http://${configData.ip}/web/teacherOralEn/batchIsActive`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail`;
var arrangeAccountUrl = `http://${configData.ip}/web/common/distributeAccount`;
var trialScoreUrl = `http://${configData.ip}/web/teacherOralEn/updateTrialScore`;
var interviewScoreUrl = ``;

var TeacherManagement = React.createClass({
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
                hasCheckBox : true,
                hasOperate : true
            },
            list : [],
            selected : []
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
                stateStep : this.state.stateStep
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
                "checkbox" : <input type="checkbox" checked={isCheck}  onChange={(e)=>{this.select(e,i)}}/>,
                "createTime" : v.createTime,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "nickName" : v.nickName,
                "gender" : getById(configData.gender, v.gender),
                "country" : v.nationality,
                "timezone" : v.timezone,
                "cellphoneNumber" : v.cellphoneNumber,
                "email" : v.email,
                "snack" : getById(configData.snack, v.snack),
                "city" : v.city,
                "interviewScore" : v.interviewScore,
                "trialScore" : v.trialScore,
                "markScore" : v.markScore,
                "isActive" : getById(configData.isActive, v.isActive),
                "operate" : (
                    <div>
                        <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arrangeAccount(i)}}>分配账号</button>
                        <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arrangeInterviewScore(i)}}>面试评分</button>
                        <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arrangeTryScore(i)}}>试讲评分</button>
                        <button className="btn btn-link btn-xs" onClick={(e)=>{this.arrangeMore(i)}}>详情</button>
                    </div>
                )
            };
        });
        return(
            <div className="teacherManagement">
                <ModalManagement info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}}/>
                <ModalManagementFrozen callback={this.isActive}/>
                <ModalManagementActivation callback={this.isActive}/>
                <ModalTryScore callback={()=>{this._getPage(this.state.curPage)}}/>
                <ModalInterviewScore callback={()=>{this._getPage(this.state.curPage)}}/>
                <div className="forms" id="forms">
                    <div className="input">
                        <div className="form row">
                            <ContentInput ref="contentInput"/>
                            <div className="field more">
                                <span className="glyphicon glyphicon-triangle-bottom" id="btn" onClick={this._changeForm}></span>
                            </div>
                        </div>
                        <div className="form row" >
                            <DataPicker ref="createTime" name="报名日期"/>
                            <div className="field">
                                <input type="text" className="form-control" ref="nickName" placeholder="账号" />
                            </div>
                            <div className="field">
                                <input type="text" className="form-control" ref="city" placeholder="城市"/>
                            </div>
                            <SelectComponent ref="gender" contentData={configData.gender} />
                            <SelectComponent ref="snack" contentData={configData.snack} />
                            <SelectComponent ref="isActive" contentData={configData.isActive} />
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
                <PageList curPage={this.state.curPage} totalPages={this.state.totalPages} onPre={this._prePage} onFirst={this._firstPage} onLast={this._lastPage} onNext={this._nextPage}/>
            </div>
        );
    },

    /**
     * 查询表单的展开动画
     * @private
     */
    _changeForm : function() {
        $("#forms").toggleClass("forms-height");
    },

    /**
     * 点击"筛选"按钮,触发ajax请求,刷新列表
     * @private
     */
    _search : function () {
        let firstName = this.refs.contentInput.state.firstName,
            lastName = this.refs.contentInput.state.lastName,
            nationality = this.refs.contentInput.state.nationality,
            timezone = this.refs.contentInput.state.timezone,
            cellphoneNumber = this.refs.contentInput.state.cellphoneNumber,
            email = this.refs.contentInput.state.email,
            createTimeStart = this.refs.createTime.state.start,
            createTimeEnd = this.refs.createTime.state.end,
            nickName = this.refs.nickName.value,
            city = this.refs.city.value.trim(),
            gender = this.refs.gender.state.value - 0,
            snack = this.refs.snack.state.value - 0,
            isActive = this.refs.isActive.state.value - 0,
            data = {
                page : 0,
                size : this.state.pageSize,
                stateStep : this.state.stateStep
            };
        (firstName.length >0) && (data.firstName = firstName);
        (lastName.length >0) && (data.lastName=lastName);
        (nationality != -1) && (data.nationality=nationality);
        (timezone != -100) && (data.timezone=timezone);
        (cellphoneNumber.length >0) && (data.cellphoneNumber=cellphoneNumber);
        (email.length >0) && (data.email=email);
        (createTimeStart.length >0) && (data.createTimeStart=createTimeStart) &&(data.createTimeEnd=createTimeEnd);
        (nickName.length >0) && (data.nickName=nickName);
        (city.length >0) && (data.city=city);
        (gender != -1) && (data.gender=gender);
        (snack != -1) && (data.snack=snack);
        (isActive != -1) && (data.isActive=isActive);

        let getHead = {
            url : searchUrl,
            data : data
        };

        console.log(data);
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
        let emails = [];
        for(let i=0; i<this.state.list.length; i++){
            if(this.state.selected[i] == true){
                emails.push(this.state.list[i].email);
            }
        }
        if(emails.length <=0){
            alert("至少选中一个教师!");
            return;
        }
        let postHead = {
            url : batchIsActiveUrl,
            data : {
                "emails": emails,
                "stateValue": state
            }
        };
        //console.log(emails);
        Post(postHead).then(
            () => {
                $(".modalManagementFrozen .modal").modal('hide');
                $(".modalManagementActivation .modal").modal('hide');
                this._getPage(this.state.curPage);
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
        if(this.state.nickName){
            alert("该教师已经分配账号!");
            return;
        }
        let postHead = {
            url : arrangeAccountUrl,
            data : {
                "email": this.state.list[i].email
            }
        };
        Post(postHead).then(
            () => {
                alert("分配成功");
            },
            () => {
                alert("分配账号失败,请重试!");
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    },

    /**
     * 点击表格中的"面试评分"按钮,触发"面试评分模态框".
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arrangeInterviewScore : function (i) {
        this.setState({
            curRow : i
        });
        $(".interviewScore .modal").modal();
    },

    /**
     * 点击"面试评分模态框"中的"确定"按钮,触发面试评分事件.
     * @param index1: 国家水平选项序号
     * @param index2: 口语水平选项序号
     * @param index3: 零食选项序号
     * @param index4: 教学经验选项序号
     * @public (子组件"评分模态框"调用)
     */
    interviewScore : function (index1,index2,index3,index4) {
        let id1 = configData.nationalityLevel.id[index1],
            id2 = configData.spokenLevel.id[index2],
            id3 = configData.snack.id[index3],
            id4 = configData.experienceDetail.id[index4],
            getHead = {
                url : interviewScoreUrl,
                data : {
                    "email" : this.state.list[this.state.curRow].email,
                    "interviewScoresMap" : {
                        "nationalityLevel": id1,
                        "spokenLevel": id2,
                        "snack": id3,
                        "teachingExperience": id4
                    }
                }
            };
        Post(getHead).then(
            () => {
                $(".interviewScore .modal").modal('hide');
                this._getPage(this.state.curPage);
            },
            () => {
                alert("面试评分失败,请重试");
            }
        ).catch(
            (err) => {
                concole.log(err);
            }
        );
    },

    /**
     * 点击表格中的"试讲评分",触发"试讲评分模态框".
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arrangeTryScore : function (i) {
        this.setState({
            curRow : i
        });
        $(".tryScore .modal").modal();
    },

    /**
     * 点击"试讲评分模态框"中"确定"按钮,触发试讲评分事件.
     * @param id1: 创意和表达选择序号
     * @param id2: 适应和引导选择序号
     * @public (子组件"评分模态框"调用)
     */
    trialScore : function(id1,id2) {
        if(id1 == -100 || id2 == -100){
            alert("请在为每个项目打分!");
            return;
        }
        let getHead = {
            url: trialScoreUrl,
            data: {
                "email": this.state.list[this.state.curRow].email,
                "trialScoresMap": {
                    "creativeAndExpression": id1,
                    "adaptAndLead": id2
                }
            }
        };

        Post(getHead).then(
            () => {
                $(".trialScore .modal").modal('hide');
                this._getPage(this.state.curPage);
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
                "email" : this.state.list[i].email
            }
        };
        Get(getHead).then(
            ({data})=>{
                if(data){
                    this.setState({
                        curInfo : data
                    });
                    $(".modalManagement .modal").modal();
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

export default TeacherManagement;
