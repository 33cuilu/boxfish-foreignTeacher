/**
 * Created by cuilu on 16/5/18.
 * 审核页
 */

//引入插件
import React from 'react';
import store from 'store';
import {Post,Get,getById} from '../../util/ajax.js';

//引入组件
import ModalDetail from '../commons/modalDetail.js';
import HotSearch from './../commons/hotSearch.js';
import OtherSearch from './../commons/otherSearch.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import ModalExamineAdopt from './modalExamineAdopt.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

var configData = require('../../config/config.json');

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail`;
var inPondsUrl = `http://${configData.ip}/web/teacherOralEn/putPond`;
var passUrl = `http://${configData.ip}/web/teacherOralEn/updateStatePass`;

var TeacherExamine = React.createClass({
    /**
     * 设置组件的状态
     * @returns {{pageSize: number, totalPages: number, curPage: number, curURL: string, curRow: number, curInfo: {}, tableStyle: {tableSize: number, hasCheckBox: boolean, hasOperate: boolean}, list: Array, selected: Array}}
     * @private
     */
    getInitialState : function () {
        return {
            stateStep : 0,
            nextState : 1,
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
                }else {
                    this.setState({
                        getHead: getHead,
                        totalPages: data.totalPages,
                        list: data.content,
                        selected : []
                    });
                }
            },
            (err)=> {
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
                "interviewTime" : v.interviewTime,
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
                "createTime" : v.createTime,
                "operate" : (
                    <div>
                        <i className="glyphicon glyphicon-ok" onClick={(e)=>{this.arangeAdopt(i)}}></i>
                        <i className="glyphicon glyphicon-remove" onClick={(e)=>{this.arangeInPond(i)}}></i>
                        <button className="btn btn-xs btn-primary" onClick={(e)=>{this.arangeMore(i)}}>详情</button>
                    </div>
                )
            };
        });
        return(
            <div className="teacherExamine">
                <ModalDetail info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage); this._showMsg("保存成功")}}/>
                <ModalExamineAdopt callback={this.adopt}/>
                <ModalInPond callback={this.inPonds}/>
                <ModalInPonds callback={this.inPonds}/>
                <div className="msg-feedback">{this.state.msg}</div>
                <div className="forms" id="forms">
                    <div className="input">
                        <HotSearch ref="hotSearch"/>
                        <div className="form row">
                            <OtherSearch ref="otherSearch" />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary" onClick={this._search}>筛选</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.examineTable} list={tableList} tableStyle={this.state.tableStyle} selectAll={this.selectAll}/>
                </div>
                <div className="main-btn">
                    <div className="btn-left">
                        <button className="btn btn-warning btn-sm" onClick={this._arangeInPonds}>批量入池</button>
                    </div>
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
            email = this.refs.hotSearch.state.email,
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
        (email.length >0) && (data.email=email);
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
     * 不改变url,获取第page页数据,所有复选框都不选
     * @param page: 表示需要获取的页面,从1开始
     * @private
     */
    _getPage : function (page) {
        let getHead = Object.assign({},this.state.getHead); //$.extend(true,{},this.state.getHead)
        getHead.data.page = page - 1;
        //console.log(getHead);
        Get(getHead).then(
            ({data}) => {
                if(data == null ){
                    alert("获取页面失败!");
                    return;
                }else{
                    this.setState({
                        curPage : page,
                        list : data.content,
                        selected : []  //重置复选框
                    });
                }
            },
            ({returnMsg}) => {
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
            selectList = this.state.selected.concat([]);
            selectList.splice(this.state.selected.indexOf(this.state.list[i].email),1);
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
     * 点击"通过"按钮,触发通过模态框,确定当前通过的教师序号
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arangeAdopt : function(i){
        this.setState({
            curRow : i
        });
        $(".modalExamineAdopt .modal").modal();
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
            ({returnCode,returnMsg}) => {
                if(returnCode == 401){
                    $(".modalExamineAdopt .modal").modal('hide');
                    return;
                }
                if(returnMsg !== "success"){
                    /*此处需要判断返回信息,决定提示信息*/
                    alert(returnMsg);
                    $(".modalExamineAdopt .modal").modal('hide');
                }else {
                    $(".modalExamineAdopt .modal").modal('hide');
                    this._getPage(this.state.curPage);
                    this._showMsg("操作成功");
                }
            },
            () => {
                alert("通过操作失败,请重试!");
            }).catch(
            () => {
                console.log(err);
            }
        );
    },

    /**
     * 点击"入池"按钮,触发入池模态框,确定当前入池的教师序号
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arangeInPond : function(i){
        this.setState({
            curRow : i
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
            alert("入池理由不能为空!");
            return;
        }
        if(reason.length>=50){
            alert("字数不得超过50字!");
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
                this._showMsg("操作成功");
            },
            () => {
                alert("入池失败,请重试!");
            }).catch(
            (err)=>{
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
        let curEmail = this.state.list[i].email;
        let getHead = {
            url : infoUrl,
            data : {
                email : curEmail,
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

export default TeacherExamine;