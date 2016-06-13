/**
 * Created by cuilu on 16/5/18.
 * 审核页
 */

//引入插件
import React from 'react';
import {Post,Get,getById} from '../../util/ajax.js';

//引入组件
import ModalExamine from './modalExamine.js';
import ContentInput from './../commons/contentInput.js';
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import ModalExamineAdopt from './modalExamineAdopt.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherExamine.less";

var configData = require('../../test/config.json');

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail`;
var inPondsUrl = `http://${configData.ip}/web/teacherOralEn/putPond`;
var passUrl = `http://${configData.ip}/web/teacherOralEn/updateStatePass`;
var updateSnackUrl = '';

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
                hasCheckBox : true,
                hasOperate : true
            },
            list : [],
            selected : [],
            snack : -1
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
                let selectList = new Array(data.content.length);
                for(let i=0; i<selectList.length; i++){
                    selectList[i] = false;
                }
                if (data == null) {
                    this.setState({
                        getHead : getHead,
                        selected : selectList
                    });
                } else {
                    this.setState({
                        getHead: getHead,
                        totalPages: data.totalPages,
                        list: data.content,
                        selected : selectList
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
            return {
                "checkbox" : <input type="checkbox" onChange={(e)=>{this.select(e,i)}}/>,
                "createTime" : v.createTime,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "country" : v.nationality,
                "timezone" : v.timezone,
                "cellphoneNumber" : v.cellphoneNumber,
                "email" : v.email,
                "snack" : getById(configData.snack, v.snack),
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
            <div className="teacherExamine">
                <ModalExamine info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}}/>
                <ModalExamineAdopt callback={this.adopt}/>
                <ModalInPond callback={this.inPonds}/>
                <ModalInPonds callback={this.inPonds}/>
                <div className="forms" id="forms">
                    <div className="input">
                        <div className="form row">
                            <ContentInput ref="contentInput"/>
                            <div className="field more">
                                <span className="glyphicon glyphicon-triangle-bottom" onClick={this._changeForm}></span>
                            </div>
                        </div>
                        <div className="form row">
                            <DataPicker ref="createTime" name="报名日期"/>
                            <SelectComponent ref="snack" contentData={configData.snack} />
                            <SelectComponent ref="experience" contentData={configData.experience} />
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
                    <div className="btn-right">
                        <button className="btn btn-warning btn-sm" onClick={this._arangeInPonds}>批量入池</button>
                        <div className="btn-right-select">
                            <label>零食:</label>
                            <SelectComponent ref="bottomSnack" size="small" contentData={configData.snack} onChange={(index)=>{this.setState({snack : index})}}/>
                            <button className="btn btn-primary btn-sm" onClick={this._updateSnack}>确定</button>
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
    _changeForm : function(event) {
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
            snack = configData.snack.id[this.refs.snack.state.index],
            teachingExperience = configData.experience.id[this.refs.experience.state.index],
            data = {
                page : 0,
                size : this.state.pageSize,
                stateStep : this.state.stateStep
            };
        (firstName.length >0) && (data.firstName = firstName);
        (lastName.length >0) && (data.lastName=lastName);
        (nationality != -1) && (data.nationality=nationality);
        (timezone != "时区") && (data.timezone=timezone);
        (cellphoneNumber.length >0) && (data.cellphoneNumber=cellphoneNumber);
        (email.length >0) && (data.email=email);
        (createTimeStart.length >0) && (data.createTimeStart=createTimeStart) &&(data.createTimeEnd=createTimeEnd);
        (snack != -1) && (data.snack=snack);
        (teachingExperience != -1) && (data.teachingExperience=teachingExperience);

        let getHead = {
            url : searchUrl,
            data : data
        };

        console.log(getHead);
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
        console.log(getHead);
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
     * 点击表格中的复选框,触发当前行选中事件
     * @param e: 点击事件
     * @param index: 选中的行在表格中的序号
     * @public (子组件"表格"调用)
     */
    select : function (e,index) {
        let selectList = this.state.selected.concat([]);
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
            url : passUrl,
            data : {
                "email": this.state.list[this.state.curRow].email,
                "stateStep": this.state.nextState
            }
        };
        Post(postHead).then(
            ({returnMsg}) => {
                if(returnMsg !== "success"){
                    /*此处需要判断返回信息,决定提示信息*/
                    alert(returnMsg);
                    $(".modalExamineAdopt .modal").modal('hide');
                }else {
                    $(".modalExamineAdopt .modal").modal('hide');
                    this._getPage(this.state.curPage);
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
        let line = this.state.list[this.state.curRow];
        let emails = [];
        if(num == 1){
            emails.push(line.email);
        }else{
            for(let i=0; i<this.state.list.length; i++){
                if(this.state.selected[i] == true){
                    emails.push(this.state.list[i].email);
                }
            }
        }
        console.log(this.state.selected);
        if(emails.length <=0){
            alert("请选中入池的教师!");
            return;
        }
        Post({
            url : inPondsUrl,
            data : {
                "emails": emails,
                "noPassReason": reason
            }
        }).then(
            () => {
                $(".modalInPond .modal").modal('hide');
                $(".modalInPonds .modal").modal('hide');
                this._getPage(this.state.curPage);
            },
            () => {
                alert("入池失败,请重试!");
            }).catch();
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
        Get({
            url : infoUrl,
            data : {
                email : curEmail
            }
        }).then(
            ({data})=>{
                if(data){
                    this.setState({
                        curInfo : data
                    });
                    $(".modalExamine .modal").modal();
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
     * 表格下方可以批量修改"零食".点击"确定"按钮即可提交更改,触发批量修改事件
     * @private
     */
    _updateSnack : function () {
        let emails = [];
        for(let i=0; i<this.state.list.length; i++){
            if(this.state.selected[i] == true){
                emails.push(this.state.list[i].email);
            }
        }
        if(emails.length <=0){
            alert("请选中至少一个教师!");
            return;
        }
        Post({
            url : updateSnackUrl,
            data : {
                "emails": emails,
                "snack": this.state.snack
            }
        }).then(
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

export default TeacherExamine;