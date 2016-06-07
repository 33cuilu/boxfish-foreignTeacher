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
import ModalAdopts from './modalAdopts.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherLecture.less";

var configData = require('../../test/config.json');

var teacherAccountsUrl = `http://${configData.ip}/web/common/trialTeacherList`;
var studentAccountsUrl = `http://${configData.ip}/web/common/trialStudentList`;
var timeSlotUrl = `http://${configData.ip}/timeslot/list/0`;
var demoCourseUrl = `http://${configData.ip}/web/common/demoCourses`;

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList?`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail?`;
var inPondsUrl = `http://${configData.ip}/web/teacherOralEn/putPond`;

var TeacherLecture = React.createClass({
    getInitialState : function () {
        return {
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
    componentDidMount : function () {
        //获取空列表
        Get({
            url : `${searchUrl}page=0&size=0`
        }).then(
            ({data})=> {
                if (data == null) {
                    this.setState({
                        curURL : myurl,
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
    render : function(){
        let rowContent = this.state.list[this.state.curRow];
        let tableList = this.state.list.map((v,i) => {
                let tryTime = v.triallectureStartTime ?
                    <div>{v.triallectureStartTime} - {v.triallectureEndTime}
                        <button className="btn btn-default btn-xs" onClick={(e)=>{this._arangeTryLesson(i)}}>修改</button></div> :
                    <button key={i} className="btn btn-default btn-xs" onClick={(e)=>{this._arangeTryLesson(i)}}>
                        安排试讲
                    </button> ;
                return {
                    "checkbox" : <input type="checkbox" onChange={(e)=>{this.select(e,i)}}/>,
                    "teacherId" : v.teacherId,
                    "firstName" : v.firstName,
                    "lastName" : v.lastName,
                    "country" : v.nationality,
                    "timeZone" : v.timezone,
                    "telNum" : v.cellphoneNumber,
                    "email" : v.email,
                    "triallectureTime" : tryTime,
                    "operate" : (
                        <div>
                            <button className="btn btn-default btn-xs" onClick={(e)=>{this._arrangeScore(i)}}>评分</button>
                            <button className="btn btn-default btn-xs" onClick={(e)=>{this._arangeAdopt(i)}}>通过</button>
                            <button className="btn btn-default btn-xs" onClick={(e)=>{this._arangeInPond(i)}}>入池</button>
                            <a onClick={(e)=>{this._arangeMore(i)}}>详情</a>
                        </div>
                    )
                };
            });
        return(
            <div className="TeacherLecture">
                <ModalLecture info={this.state.curInfo} callback={this.updateList}/>
                <TryLesson row={rowContent} teacher={this.state.teacherAccounts} student={this.state.studentAccounts}
                           time={this.state.timeSlot} course={this.state.demoCourse} callback={this.updateTime}/>
                <ModalTryScore value={this.state.list[this.state.curRow]} />
                <ModalAdopt callback={this.adopts}/>
                <ModalAdopts callback={this.adopts}/>
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
                        <button className="btn btn-default btn-sm" onClick={this._arangeInPonds}>批量入池</button>
                        <button className="btn btn-default btn-sm" onClick={this._arangeAdopts}>批量通过</button>
                    </div>
                </div>
                <PageList curPage={this.state.curPage} totalPages={this.state.totalPages} onPre={this._prePage} onFirst={this._firstPage} onLast={this._lastPage} onNext={this._nextPage}/>
            </div>
        );
    },
    _getTeacherAccounts : function (myUrl) {
        Get({
            url : myUrl
        }).then(({data}) =>{
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
            });
        }).catch((err) => {
            console.log(err);
        });
    },
    _getStudentAccounts : function (myUrl) {
        Get({
            url : myUrl
        }).then(({data}) =>{
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
        }).catch((err) => {
            console.log(err);
        });
    },
    _getCourse : function (myUrl) {
        Get({
            url : myUrl
        }).then(({data}) =>{
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
        }).catch((err) => {
            console.log(err);
        });
    },
    _getTimeSlot : function (myUrl) {
        Get({
            url : myUrl
        }).then(({data}) =>{
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
        }).catch((err) => {
            console.log(err);
        });
    },
    _changeForm : function() {
        $("#forms").toggleClass("forms-height");
    },
    select : function (e,index) {
        let selectList = this.state.select;
        selectList[index] = e.target.checked;
        this.setState({
            selected : selectList
        });
    },
    selectAll : function (state) {
        let selectList = this.state.select.map(() => {return (state);});
        this.setState({
            selected : selectList
        });
    },
    updateList : function (line) {
        let index = this.state.curRow;
        Object.assign(this.state.list[index],line);
        let newList = [].concat(this.state.list.slice(0,index), line, this.state.list.slice(index + 1));
        this.setState({
            list : newList
        });
    },
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
    _search : function () {
         let firstName = this.refs.contentInput.state.firstName,
            lastName = this.refs.contentInput.state.lastName,
            country = this.refs.contentInput.state.country,
            timeZone = this.refs.contentInput.state.timeZone,
            telNum = this.refs.contentInput.state.telNum,
            email = this.refs.contentInput.state.email,
            interviewTime = this.refs.interviewTime.state.value.trim(),
            tryTime = this.refs.tryLessonTime.state.value.trim(),
            statu = configData.reservationTry.id[this.refs.reservationTry.state.index],
            myurl = `${searchUrl}page=0&size=${this.state.pageSize}`;

        myurl += (firstName.length >0) ? `&firstName=${firstName}` : '';
        myurl += (lastName.length >0) ? `&lastName=${lastName}` : '';
        myurl += (country != -1) ? `&nationality=${country}` : '';
        myurl += (timeZone != -1) ? `&timeZone=${timeZone}` : '';
        myurl += (telNum.length >0) ? `&cellphoneNumber=${telNum}`: '';
        myurl += (email.length >0) ? `&email=${email}`: '';
        myurl += (interviewTime.length >0) ? `&interviewTimeStart=${interviewTime.substr(0,19)}&interviewTimeEnd=${interviewTime.substr(-19,19)}`: '';
        myurl += (tryTime.length >0) ? `&triallectureStartTimeStart=${tryTime.substr(0,19)}&triallectureStartTimeEnd=${tryTime.substr(-19,19)}`: '';
        myurl += (statu != -1) ? `&isHasTriallectureTime=${statu}`: '';

        console.log(myurl);
        //let testurl = `${searchUrl}page=0&size=10`;
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
    _prePage : function () {
        if(this.state.curPage == 1)
            return;
        this._getPage(this.state.curPage - 1);
    },
    _firstPage : function () {
        if(this.state.curPage == 1)
            return;
        this._getPage(1);
    },
    _lastPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.totalPages);
    },
    _nextPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.curPage + 1);
    },
    _arangeTryLesson : function(i){
        this.setState({
            curRow : i
        });
        $(".tryLesson .modal").modal();
    },
    _arrangeScore : function () {
        this.setState({
            curRow : i
        });
        $(".tryScore .modal").modal();
    },
    score : function(creative,adaptation) {
        let line = this.state.list[this.state.curRow];
        line.creative = creative;
        line.adaptation = adaptation;
        let newList = [].concat(this.state.list.slice(0,index), line, this.state.list.slice(index + 1));
        Post({
            url : inPondsUrl,
            data : {
                "emails": email
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
            }).catch();
    },
    _arangeAdopt : function(i){
        this.setState({
            curRow : i
        });
        $(".modalAdopt .modal").modal();
    },
    _arangeAdopts : function(){
        $(".modalAdopts .modal").modal();
    },
    adopts : function (num) {
        let emails = [];
        if(num == 1){
            emails = emails.push(this.state.list[this.state.curRow].email);
        }else{
            console.log(this.state.selected);
            emails = this.state.selected.map((v,i) => {
                if(v){
                    return (this.state.list[i].email);
                }else{
                    return;
                }
            });
        }
        Post({
            url : inPondsUrl,
            data : {
                "emails": emails
            }
        }).then(
            ({code,data}) => {
                $(".modalAdopt .modal").modal('hide');
                $(".modalAdopts .modal").modal('hide');
            },
            () => {
                alert("通过操作失败,请重试!");
            }).catch();
    },
    _arangeInPond : function(i){
        this.setState({
            curRow : i
        });
        $(".modalInPond .modal").modal();
    },
    _arangeInPonds : function(){
        $(".modalInPonds .modal").modal();
    },
    inPonds : function (num,reason) {
        let emails = [];
        if(num == 1){
            emails = emails.push(this.state.list[this.state.curRow].email);
        }else{
            console.log(this.state.selected);
            emails = this.state.selected.map((v,i) => {
                if(v){
                    return (this.state.list[i].email);
                }else{
                    return;
                }
            });
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
            },
            () => {
                alert("入池失败,请重试!");
            }).catch();
    },
    _arangeMore : function(i){
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