/**
 * Created by cuilu on 16/5/18.
 * 试讲页
 */

//引入插件
import React from 'react';
import store from 'store';
import {Post,Get} from '../../util/ajax.js';

//引入组件
import ModalDetail from '../commons/modalDetail.js';
import HotSearch from './../commons/hotSearch.js';
import OtherSearch from './../commons/otherSearch.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import TryLesson from './tryLesson.js';
import EditLesson from './editLesson.js';
import ModalTryScore from './../commons/modalTryScore.js';
import ModalAdopt from './modalAdopt.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherLecture.less";

var configData = require('../../config/config.json');

var teacherAccountsUrl = `http://${configData.ip}/web/common/trialTeacherList/2`;
var studentAccountsUrl = `http://${configData.ip}/web/common/trialStudentList/2`;
var timeSlotUrl = `http://${configData.ip}/timeslot/list/0`;
var demoCourseUrl = `http://${configData.ip}/web/common/demoCourses/2`;

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList`;
var editLessonUrl = `http://${configData.ip}/web/common/triallecture/en/`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail`;
var inPondsUrl = `http://${configData.ip}/web/teacherOralEn/putPond`;
var passUrl = `http://${configData.ip}/web/teacherOralEn/updateStatePass`;
var trialScoreUrl = `http://${configData.ip}/web/teacherOralEn/updateTrialScore`;

var TeacherLecture = React.createClass({
    /**
     * 设置组件的状态
     * @returns {{pageSize: number, totalPages: number, curPage: number, curURL: string, curRow: number, curInfo: {}, teacherAccounts: {arr: Array, id: Array}, studentAccounts: {arr: Array, id: Array}, timeSlot: {arr: Array, id: Array}, demoCourse: {arr: Array, id: Array, type: Array}, tableStyle: {tableSize: number, hasCheckBox: boolean, hasOperate: boolean}, list: Array, selected: Array}}
     * @private
     */
    getInitialState : function () {
        return {
            stateStep : 2,
            nextState : 3,
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            getHead : {},
            curRow : 0,
            curInfo : {},
            teacherAccounts :{
                arr : [], //教师名字
                id : []  //教师ID
            },
            studentAccounts : {
                arr: [], //学生名字
                id: []  //学生ID
            },
            timeSlot : {
                arr: [], //具体时间范围
                id: []  //时间区间的ID
            },
            demoCourse : {
                arr: [],  //课程名称
                id: [],  //课程ID
                type: []  //课程类型
            },
            tableStyle : {
                tableSize : 10,
                selectAll : false,
                hasCheckBox : true,
                hasOperate : true
            },
            lectureScore : {
                creativeAndExpression : -100,
                adaptAndLead : -100
            },
            demoCourseInfo : {},
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

        //获取试讲账号列表
        this._getTeacherAccounts(teacherAccountsUrl);

        //获取学生账号列表
        this._getStudentAccounts(studentAccountsUrl);

        //获取试讲时间列表
        this._getTimeSlot(timeSlotUrl);

        //获取demo课列表
        this._getCourse(demoCourseUrl);
    },

    /**
     * 渲染面试页面
     * @returns {XML}
     * @private
     */
    render : function(){
        let rowContent = this.state.list[this.state.curRow];
        let tableList = this.state.list.map((v,i) => {
            let tryTime = v.triallectureStartTime ?
                    <div>
                        <label>{v.triallectureStartTime} - {v.triallectureEndTime}</label>
                        <button className="btn-primary btn-xs" onClick={(e)=>{this.arrangeEditLesson(i)}}>修改</button>
                    </div> :
                    <button key={i} className="btn btn-primary btn-xs" onClick={(e)=>{this.arrangeTryLesson(i)}}>
                        安排试讲
                    </button>;
            let isCheck = ($.inArray(v.email,this.state.selected) != -1);
            return {
                "checkbox" : <input type="checkbox" checked={isCheck}  onChange={(e)=>{this.select(e,i)}}/>,
                    "interviewTime" : v.interviewTime,
                    "firstName" : v.firstName,
                    "lastName" : v.lastName,
                    "nationality" : v.nationality,
                    "timezone" : v.timezone,
                    "cellphoneNumber" : v.cellphoneNumber,
                    "email" : v.email,
                    "interviewScore" : v.interviewScore,
                    "trialScore" : v.trialScore,
                    "markScore" : v.markScore,
                    "triallectureTime" : tryTime,
                    "operate" : (
                        <div>
                            <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arrangeScore(i)}}>评分</button>
                            <button className="btn btn-success btn-xs" onClick={(e)=>{this.arangeAdopt(i)}}>通过</button>
                            <button className="btn btn-warning btn-xs" onClick={(e)=>{this.arangeInPond(i)}}>入池</button>
                            <button className="btn btn-link btn-xs" onClick={(e)=>{this.arangeMore(i)}}>详情</button>
                        </div>
                    )
                };
            });
        return(
            <div className="TeacherLecture">
                <ModalDetail info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}}/>
                <TryLesson row={rowContent} teacher={this.state.teacherAccounts} student={this.state.studentAccounts}
                           time={this.state.timeSlot} course={this.state.demoCourse} callback={()=>{this._getPage(this.state.curPage)}}/>
                <EditLesson row={rowContent} info={this.state.demoCourseInfo} teacher={this.state.teacherAccounts} student={this.state.studentAccounts}
                            time={this.state.timeSlot} course={this.state.demoCourse} callback={()=>{this._getPage(this.state.curPage)}}/>
                <ModalTryScore value={this.state.list[this.state.curRow]} callback={this.trialScore} defaultContent={this.state.lectureScore}/>
                <ModalAdopt callback={this.adopt}/>
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
                    <Table contentData={configData.lectureTable} list={tableList} tableStyle={this.state.tableStyle} selectAll={this.selectAll}/>
                </div>

                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-warning btn-sm" onClick={this._arangeInPonds}>批量入池</button>
                    </div>
                </div>
                <PageList curPage={this.state.curPage} totalPages={this.state.totalPages} onPre={this._prePage} onFirst={this._firstPage} onLast={this._lastPage} onNext={this._nextPage}/>
            </div>
        );
    },

    /**
     * 获取可分配的老师试讲账号列表
     * @param myUrl: 老师试讲账号接口地址
     * @private
     */
    _getTeacherAccounts : function (myUrl) {
        Get({
            url : myUrl,
            data : {
                token : store.get("accessToken")
            }
        }).then(
            ({data}) => {
                let newTeacherArr = ["教师账号"],
                    newTeacherId = [-100];
                for(let i=0 ; i<data.length; i++){
                    newTeacherArr.push(data[i].nickName);
                    newTeacherId.push(data[i].teacherId);
                }
                this.setState({
                        teacherAccounts: {
                            arr : newTeacherArr,
                            id : newTeacherId
                        }
                    }
                );
            },
            () => {
                alert("未能获取可选的教师试讲账号,不能安排试讲!");
            }
        ).catch((err) => {
            console.log(err);
        });
    },

    /**
     * 获取可分配的学生听课账号列表
     * @param myUrl: 学生听课账号接口地址
     * @private
     */
    _getStudentAccounts : function (myUrl) {
        Get({
            url : myUrl,
            data : {
                token : store.get("accessToken")
            }
        }).then(
            ({data}) => {
                let newStudentArr = ["学生账号"],
                    newStudentId = [-100];
                for(let i=0 ; i<data.length; i++){
                    newStudentArr.push(data[i].nickName);
                    newStudentId.push(data[i].studentId);
                }
                this.setState({
                    studentAccounts: {
                        arr : newStudentArr,
                        id : newStudentId
                    }
                });
            },
            () => {
                alert("未能获取可选学生听课账号,不能安排试讲!");
            }
        ).catch((err) => {
            console.log(err);
        });
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
     * 获取试讲可选时间段列表
     * @param myUrl: 试讲可选时间段接口地址
     * @private
     */
    _getTimeSlot : function (myUrl) {
        Get({
            url : myUrl,
            data : {
                token : store.get("accessToken")
            }
        }).then(
            ({data}) => {
                let newTimeArr = ["上课时间"],
                    newTimeId = [-100];
                for(let i=0 ; i<data.length; i++){
                    newTimeArr.push(`${data[i].startTime} - ${data[i].endTime}`);
                    newTimeId.push(data[i].slotId);
                }
                this.setState({
                    timeSlot: {
                        arr: newTimeArr,
                        id : newTimeId
                    }
                });
            },
            () => {
                alert("未能获取可选时间列表,不能安排试讲!");
            }
        ).catch((err) => {
            console.log(err);
        });
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
            interviewTimeStart = this.refs.interviewTime.state.start,
            interviewTimeEnd = this.refs.interviewTime.state.end,
            triallectureStartTimeStart = this.refs.triallectureTime.state.start,
            triallectureStartTimeEnd = this.refs.triallectureTime.state.end,
            isTrial = this.refs.reservationTry.state.value - 0,
            data = {
                page : 0,
                size : this.state.pageSize,
                stateStep : this.state.stateStep,
                token : store.get("accessToken")
            };

        (firstName.length >0) && (data.firstName = firstName);
        (lastName.length >0) && (data.lastName=lastName);
        (nationality != -100) && (data.nationality=nationality);
        (timezone != -100) && (data.timezone=timezone);
        (cellphoneNumber.length >0) && (data.cellphoneNumber=cellphoneNumber);
        (email.length >0) && (data.email=email);
        (interviewTimeStart.length >0) && (data.interviewTimeStart=interviewTimeStart) &&(data.interviewTimeEnd=interviewTimeEnd);
        (triallectureStartTimeStart.length >0) && (data.triallectureStartTimeStart=triallectureStartTimeStart) &&(data.triallectureStartTimeEnd=triallectureStartTimeEnd);
        (isTrial != -100) && (data.isTrial=isTrial);

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
                        selected: selectList
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
                if(data == null )
                    return;
                this.setState({
                    curPage : page,
                    list : data.content,
                    selected : []
                });
            },
            () => {
                alert("获取教师列表失败!");
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
     * 点击表格中的"安排试讲"按钮,触发"安排试讲模态框"
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arrangeTryLesson : function(i){
        this.setState({
            curRow : i
        });
        $(".tryLesson .modal").modal();
    },

    /** 点击表格中的"修改"按钮,触发"修改试讲安排模态框"
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arrangeEditLesson : function (i) {
        this.setState({
            curRow : i
        });
        let getHead = {
            url : editLessonUrl,
            data : {
                "email" : this.state.list[i].email,
                "token" : store.get("accessToken")
            }
        };
        Get(getHead).then(
            ({data,returnCode})=>{
                if(returnCode == 401)
                    return;
                if(data.startTime.length <= 0){
                    alert("未安排试讲,系统错误,请反馈给开发人员!");
                }else{
                    this.setState({
                        demoCourseInfo: data
                    });
                    $(".editLesson .modal").modal();
                }
            },
            ({returnMsg})=>{
                console.log(returnMsg);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        );

    },

    /**
     * 点击表格中的"评分"按钮,触发"评分模态框"
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public: (子组件"表格"调用)
     */
    arrangeScore : function (i) {
        let obj = this.state.list[i];
        let lScore = {
            creativeAndExpression : -100,
            adaptAndLead : -100
        };
        if(obj.trialScoresMap){
            lScore = {
                creativeAndExpression : obj.trialScoresMap.creativeAndExpression||-100,
                adaptAndLead : obj.trialScoresMap.adaptAndLead||-100
            };
        }
        this.setState({
            curRow : i,
            lectureScore : lScore
        });
        $(".trialScore .modal").modal();
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
        let postHead = {
                url: `${trialScoreUrl}?token=${store.get("accessToken")}`,
                data: {
                    "email": this.state.list[this.state.curRow].email,
                    "trialScoresMap": {
                        "creativeAndExpression": id1,
                        "adaptAndLead": id2
                    }
                }
            };

        Post(postHead).then(
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
     * 点击"通过"按钮,触发通过模态框,确定当前通过的教师序号
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arangeAdopt : function(i){
        this.setState({
            curRow : i
        });
        let trialScoreMap = this.state.list[i].trialScoresMap;
        if( trialScoreMap == null || trialScoreMap.adaptAndLead == 0 || trialScoreMap.creativeAndExpression == 0){
            alert("该教师试讲评分某一项为0,不能通过!");
            return;
        }
        $(".modalAdopt .modal").modal();
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
                    $(".modalAdopt .modal").modal('hide');
                    return;
                }
                if(returnMsg !== "success"){
                    /*此处需要判断返回信息,决定提示信息*/
                    alert(returnMsg);
                    $(".modalAdopt .modal").modal('hide');
                }else{
                    $(".modalAdopt .modal").modal('hide');
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
        if(reason.length <=0){
            alert("请填写入池理由!");
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

export default TeacherLecture;