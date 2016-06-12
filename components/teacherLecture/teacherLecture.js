/**
 * Created by cuilu on 16/5/18.
 * 试讲页
 */

//引入插件
import React from 'react';
import {Post,Get} from '../../util/ajax.js';

//引入组件
import ModalLecture from './modalLecture.js';
import ContentInput from './../commons/contentInput.js';
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import TryLesson from './tryLesson.js';
import ModalTryScore from './../commons/modalTryScore.js';
import ModalAdopt from './modalAdopt.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherLecture.less";

var configData = require('../../test/config.json');

var teacherAccountsUrl = `http://${configData.ip}/web/common/trialTeacherList/2`;
var studentAccountsUrl = `http://${configData.ip}/web/common/trialStudentList/2`;
var timeSlotUrl = `http://${configData.ip}/timeslot/list/0`;
var demoCourseUrl = `http://${configData.ip}/web/common/demoCourses/2`;

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList?`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail?`;
var inPondsUrl = `http://${configData.ip}/web/teacherOralEn/putPond`;
var passUrl = `http://${configData.ip}/web/teacherOralEn/updateStatePass`;
var tryScoreUrl = `http://${configData.ip}/web/teacherOralEn/updateTrialScore`;

var TeacherLecture = React.createClass({
    /**
     * 设置组件的状态
     * @returns {{pageSize: number, totalPages: number, curPage: number, curURL: string, curRow: number, curInfo: {}, teacherAccounts: {arr: Array, id: Array}, studentAccounts: {arr: Array, id: Array}, timeSlot: {arr: Array, id: Array}, demoCourse: {arr: Array, id: Array, type: Array}, tableStyle: {tableSize: number, hasCheckBox: boolean, hasOperate: boolean}, list: Array, selected: Array}}
     * @private
     */
    getInitialState : function () {
        return {
            stateStep : 3,
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            curURL : '',
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
                        <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arangeTryLesson(i)}}>
                            修改
                        </button>
                    </div> :
                    <button key={i} className="btn btn-primary btn-xs" onClick={(e)=>{this.arangeTryLesson(i)}}>
                        安排试讲
                    </button> ;
                return {
                    "checkbox" : <input type="checkbox" onChange={(e)=>{this.select(e,i)}}/>,
                    "interviewTime" : v.interviewTime,
                    "firstName" : v.firstName,
                    "lastName" : v.lastName,
                    "country" : v.nationality,
                    "timezone" : v.timezone,
                    "telNum" : v.cellphoneNumber,
                    "email" : v.email,
                    "interviewScore" : v.interviewScore,
                    "triallectureScore" : v.triallectureScore,
                    "combinedScore" : v.combinedScore,
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
                <ModalLecture info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}}/>
                <TryLesson row={rowContent} teacher={this.state.teacherAccounts} student={this.state.studentAccounts}
                           time={this.state.timeSlot} course={this.state.demoCourse} callback={()=>{this._getPage(this.state.curPage)}}/>
                <ModalTryScore value={this.state.list[this.state.curRow]} callback={this.score}/>
                <ModalAdopt callback={this.adopt}/>
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
                        <div className="form row extend">
                            <TimePicker ref="interviewTime" name="面试时间"/>
                            <TimePicker ref="tryLessonTime" name="试讲时间"/>
                            <SelectComponent ref="reservationTry" contentData={configData.reservationTry} />
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
            url : myUrl
        }).then(
            ({data}) => {
                let newTeacherArr = [],
                    newTeacherId = [];
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
            url : myUrl
        }).then(
            ({data}) => {
                let newStudentArr = [],
                    newStudentId = [];
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
            url : myUrl
        }).then(
            ({data}) =>{
                let newCourseArr = [],
                    newCourseId = [],
                    newCourseType = [];
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
            url : myUrl
        }).then(
            ({data}) => {
                let newTimeArr = [],
                    newTimeId = [];
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
            country = this.refs.contentInput.state.country,
            timeZone = this.refs.contentInput.state.timeZone,
            telNum = this.refs.contentInput.state.telNum,
            email = this.refs.contentInput.state.email,
            interviewTimeStart = this.refs.interviewTime.state.start,
            interviewTimeEnd = this.refs.interviewTime.state.end,
            tryTimeStart = this.refs.tryLessonTime.state.start,
            tryTimeEnd = this.refs.tryLessonTime.state.end,
            statu = configData.reservationTry.id[this.refs.reservationTry.state.index],
            myurl = `${searchUrl}page=0&size=${this.state.pageSize}`;

        myurl += (firstName.length >0) ? `&firstName=${firstName}` : '';
        myurl += (lastName.length >0) ? `&lastName=${lastName}` : '';
        myurl += (country != -1) ? `&nationality=${country}` : '';
        myurl += (timeZone != "时区") ? `&timeZone=${timeZone}` : '';
        myurl += (telNum.length >0) ? `&cellphoneNumber=${telNum}`: '';
        myurl += (email.length >0) ? `&email=${email}`: '';
        myurl += (interviewTimeStart.length >0) ? `&interviewTimeStart=${interviewTimeStart}&interviewTimeEnd=${interviewTimeEnd}`: '';
        myurl += (tryTimeStart.length >0) ? `&triallectureStartTimeStart=${tryTimeStart}&triallectureStartTimeEnd=${tryTimeEnd}`: '';
        myurl += (statu != -1) ? `&isHasTriallectureTime=${statu}`: '';

        console.log(myurl);
        Get({
            url : myurl
        }).then(
            ({code,message,data})=> {
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
        }).then(({code,message,data})=>{
            if(data == null )
                return;
            this.setState({
                curPage : page,
                list : data.content
            });
        }).catch((err)=>{
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
     * 点击表格中的"安排试讲"按钮,触发"安排试讲模态框"
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arangeTryLesson : function(i){
        this.setState({
            curRow : i
        });
        $(".tryLesson .modal").modal();
    },

    /**
     * 安排试讲模态框中点击"确定"按钮,触发安排试讲事件,任何一项为空,则不能安排试讲
     * @param start: 试讲开始时间
     * @param end: 试讲结束时间
     * @public (子组件"安排试讲模态框"调用)
     */
    updateTime : function (start,end) {
        let index = this.state.curRow;
        let line = this.state.list[index];
        line.triallectureStartTime = start;
        line.triallectureEndTime = end.substr(-8,8);
        let newList = [].concat(this.state.list.slice(0,index), line, this.state.list.slice(index + 1));
        this.setState({
            list : newList
        });
    },

    /**
     * 点击表格中的"评分"按钮,触发"评分模态框"
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public: (子组件"表格"调用)
     */
    arrangeScore : function (i) {
        this.setState({
            curRow : i
        });
        $(".tryScore .modal").modal();
    },

    /**
     * "评分模态框"中点击"确定按钮",触发评分事件.
     * @param index1: 创意和表达选择的ID
     * @param index2: 适应和引导选择的ID
     * @public (子组件"评分模态框"调用)
     */
    score : function(index1,index2) {
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
     * 点击"通过"按钮,触发通过模态框,确定当前通过的教师序号
     * @param i: 表示选择的是表格中的第i个教师,从0开始
     * @public (子组件"表格"调用)
     */
    arangeAdopt : function(i){
        this.setState({
            curRow : i
        });
        $(".modalAdopt .modal").modal();
    },

    /**
     * 通过模态框中点击"确定"按钮,触发通过事件.通过ajax请求将当前教师的email发送给后台,然后ajax请求重新获取教师列表
     * @public (子组件"通过模态框"调用)
     */
    adopt : function () {
        let emails = [].concat(this.state.list[this.state.curRow].email);
        Post({
            url : passUrl,
            data : {
                "emails": emails,
                "stateStep":this.state.stateStep
            }
        }).then(
            () => {
                $(".modalAdopt .modal").modal('hide');
                this._getPage(this.state.curPage);
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
            ({code,data}) => {
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
            url : `${infoUrl}email=${curEmail}`
        }).then(
            ({data})=>{
                if(data){
                    this.setState({
                        curInfo : data
                    });
                    $(".modalLecture .modal").modal();
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