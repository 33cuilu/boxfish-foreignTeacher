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

var configData = require('../../test/config.json');

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList?`;
var frozenUrl = ``;
var activationUrl = ``;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail?`;
var arrangeAccountUrl = '';
var tryScoreUrl = '';
var interviewScoreUrl = '';

var TeacherManagement = React.createClass({
    /**
     * 设置组件的状态
     * @returns {{pageSize: number, totalPages: number, curPage: number, curURL: string, curRow: number, curInfo: {}, tableStyle: {tableSize: number, hasCheckBox: boolean, hasOperate: boolean}, list: Array, selected: Array}}
     * @private
     */
    getInitialState : function () {
        return {
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            curURL : '',
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
        let myurl = `${searchUrl}page=0&size=10`;
        Get({
            url : myurl
        }).then(
            ({data})=> {
                if (data == null) {
                    this.setState({
                        curURL : myurl
                    });
                } else {
                    let selectList = new Array(data.content.length);
                    for(let i=0; i<selectList.length; i++){
                        selectList[i] = false;
                    }
                    this.setState({
                        curURL: myurl,
                        totalPages: data.totalPages,
                        list: data.content,
                        select : selectList
                    });
                }
            },
            ()=> {
                alert("查询失败!");
                this.setState({
                    curURL : myurl
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
            return {
                "checkbox" : <input type="checkbox" onChange={(e)=>{this.select(e,i)}}/>,
                "createTimeStart" : v.createTimeStart,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "nickName" : v.nickName,
                "gender" : getById(configData.gender, v.gender),
                "country" : v.nationality,
                "timezone" : v.timezone,
                "telNum" : v.cellphoneNumber,
                "email" : v.email,
                "snack" : getById(configData.snacks, v.snack),
                "city" : v.city,
                "interviewScore" : v.interviewScore,
                "triallectureScore" : v.triallectureScore,
                "combinedScore" : v.combinedScore,
                "accountStatus" : getById(configData.accountStatus, v.accountStatus),
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
                <ModalManagementFrozen callback={this.frozen}/>
                <ModalManagementActivation callback={this.activation}/>
                <ModalTryScore callback={this.tryScore}/>
                <ModalInterviewScore callback={this.interviewScore}/>
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
                            <SelectComponent ref="snack" contentData={configData.snacks} />
                            <SelectComponent ref="accountStatu" contentData={configData.accountStatus} />
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
            country = this.refs.contentInput.state.country,
            timeZone = this.refs.contentInput.state.timeZone,
            telNum = this.refs.contentInput.state.telNum,
            email = this.refs.contentInput.state.email,
            createTimeStart = this.refs.createTime.state.start,
            createTimeEnd = this.refs.createTime.state.end,
            nickName = this.refs.nickName.value,
            city = this.refs.city.value.trim(),
            gender = configData.gender.id[this.refs.gender.state.index],
            snack = configData.snacks.id[this.refs.snack.state.index],
            statu = configData.accountStatus.id[this.refs.accountStatu.state.index],
            myurl = `${searchUrl}page=0&size=${this.state.pageSize}`;

        myurl += (firstName.length >0) ? `&firstName=${firstName}` : '';
        myurl += (lastName.length >0) ? `&lastName=${lastName}` : '';
        myurl += (country != -1) ? `&nationality=${country}` : '';
        myurl += (timeZone != "时区") ? `&timeZone=${timeZone}` : '';
        myurl += (telNum.length >0) ? `&cellphoneNumber=${telNum}`: '';
        myurl += (email.length >0) ? `&email=${email}`: '';
        myurl += (createTimeStart.length >0) ? `&createTimeStart=${interviewTimeStart}&createTimeEnd=${interviewTimeEnd}`: '';
        myurl += (nickName.length >0) ? `&nickName=${nickName}`: '';
        myurl += (city.length >0) ? `&city=${city}`: '';
        myurl += (gender != -1) ? `&gender=${gender}`: '';
        myurl += (snack != -1) ? `&snack=${snack}`: '';
        myurl += (statu != -1) ? `&accountStatus=${statu}`: '';

        console.log(myurl);
        Get({
            url : myurl
        }).then(
            ({data})=> {
                if (data == null) {
                    this.setState({
                        curPage: 1,
                        totalPages: 1,
                        curURL : myurl,
                        list: []
                    });
                } else {
                    let selectList = new Array(data.content.length);
                    for(let i=0; i<selectList.length; i++){
                        selectList[i] = false;
                    }
                    this.setState({
                        curURL: myurl,
                        curPage: 1,
                        totalPages: data.totalPages,
                        list: data.content,
                        select : selectList
                    });
                }
            },
            ()=> {
                alert("查询失败!");
                this.setState({
                    curPage: 1,
                    totalPages: 1,
                    curURL : myurl,
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
        let myurl = this.state.curURL.replace(/page=0/,`page=${page-1}`);
        Get({
            url : myurl
        }).then(
            ({data}) => {
                if(data == null )
                    return;
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
     * 点击"冻结"按钮,触发"冻结模态框"
     * @private
     */
    _arrangeFrozen : function(){
        $(".modalManagementFrozen .modal").modal();
    },

    /**
     * 点击"冻结模态框"中的"确定"按钮,触发冻结事件
     * @public (子组件"冻结模态框"调用)
     */
    frozen : function () {
        let emails = [];
        let newList = this.state.list.concat([]);
        for(let i=0; i<this.state.list.length; i++){
            if(this.state.selected[i] == true){
                emails.push(this.state.list[i].email);
                newList.accountStatus = 0;
            }
        }
        if(emails.length <=0){
            alert("请选中冻结的教师!");
            return;
        }
        console.log(emails);
        console.log(newList);
        return;
        Post({
            url : frozenUrl,
            data : {
                "emails": emails
            }
        }).then(
            () => {
                $(".modalManagementFrozen .modal").modal('hide');
                this.setState({
                    list : newList
                });
            },
            () => {
                alert("冻结失败,请重试!");
            }).catch();
    },

    /**
     * 点击"激活"按钮,触发"激活模态框"
     * @private
     */
    _arrangeActivation : function(){
        $(".modalManagementActivation .modal").modal();
    },

    /**
     * 点击"激活模态框"中的"确定"按钮,触发激活事件
     * @public (子组件"激活模态框"调用)
     */
    activation : function () {
        let emails = [];
        let newList = this.state.list.concat([]);
        for(let i=0; i<this.state.list.length; i++){
            if(this.state.selected[i] == true){
                emails.push(this.state.list[i].email);
                newList.accountStatus = 1;
            }
        }
        if(emails.length <=0){
            alert("请选中激活的教师!");
            return;
        }
        console.log(emails);
        console.log(newList);
        return;
        Post({
            url : activationUrl,
            data : {
                "emails": emails
            }
        }).then(
            () => {
                $(".modalManagementActivation .modal").modal('hide');
                this.setState({
                    list : newList
                });
            },
            () => {
                alert("激活失败,请重试!");
            }).catch();
    },

    /**
     * 点击表格中的复选框,触发当前行选中事件
     * @param e: 点击事件
     * @param index: 选中的行在表格中的序号
     * @public (子组件"表格"调用)
     */
    select : function (e,index) {
        let selectList = this.state.select;
        selectList[index] = e.target.checked;
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
        let selectList = this.state.list.map(() => {return (state);});
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
        if(this.state.initAccount){
            alert("该教师已经分配账号!");
            return;
        }
        Post({
            url : arrangeAccountUrl,
            data : {
                "email": this.state.list[i].email
            }
        }).then(
            () => {
                alert("分配成功");
            },
            () => {
                alert("分配账号失败,请重试!");
            }
        ).catch();
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
     * 点击"面试评分模态框"中的确定,触发面试评分事件
     * @param index1: 国家水平选项
     * @param index2: 口语水平选项
     * @param index3: 零食选项
     * @param index4: 教师经验选项
     * @public (子组件"面试评分模态框"调用)
     */
    interviewScore : function (index1,index2,index3,index4) {
        let index = this.state.curRow,
            line = this.state.list[index],
            score1 = configData.nationalLevel.score[index1],
            score2 = configData.spokenLevel.score[index2],
            score3 = configData.snacks.score[index3],
            score4 = configData.experienceDetail.score[index4];
        line.interviewScore = score1 + score2 + score3 + score4;
        line.combinedScore = line.interviewScore + line.triallectureScore;
        let newList = [].concat(this.state.list.slice(0,index), line, this.state.list.slice(index + 1));
        console.log({
            "email": this.state.list[index].email,
            "trialScoresMap": {
                "nationalLevel": score1,
                "spokenLevel": score2,
                "snack": score3,
                "exprience": score4
            }
        });
        return;
        Post({
            url : interviewScoreUrl,
            data : {
                "email": this.state.list[index].email,
                "trialScoresMap": {
                    "nationalLevel": score1,
                    "spokenLevel": score2,
                    "snack": score3,
                    "exprience": score4
                }
            }
        }).then(
            () => {
                $(".tryScore .modal").modal('hide');
                this.setState({
                    list : newList
                });
            },
            () => {
                alert("评分操作失败,请重试!");
            }).catch((err) => { console.log(err)});
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
     * "试讲评分模态框"中点击"确定"按钮,触发评分事件.
     * @param index1: 创意和表达选择的ID
     * @param index2: 适应和引导选择的ID
     * @public (子组件"评分模态框"调用)
     */
    tryScore : function (index1,index2) {
        let index = this.state.curRow,
            line = this.state.list[index],
            score1 = configData.creativeAndExpression.id[index1],
            score2 = configData.adaptAndLead.id[index2];
        line.triallectureScore = score1 + score2;
        line.combinedScore = line.interviewScore + score1 + score2;
        let newList = [].concat(this.state.list.slice(0,index), line, this.state.list.slice(index + 1));
        Post({
            url : tryScoreUrl,
            data : {
                "email": this.state.list[index].email,
                "trialScoresMap": {
                    "creativeAndExpression": score1,
                    "adaptAndLead": score2
                }
            }
        }).then(
            () => {
                $(".tryScore .modal").modal('hide');
                this.setState({
                    list : newList
                });
            },
            () => {
                alert("评分操作失败,请重试!");
            }).catch((err) => { console.log(err)});
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
        let curEmail = this.state.list[i].email;
        Get({
            url : `${infoUrl}email=${curEmail}`
        }).then(
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
