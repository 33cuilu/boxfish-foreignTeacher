/**
 * Created by cuilu on 16/5/24.
 *面试页安排试讲模态框
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../util/ajax.js';

//引入组件
import SingleDataPicker from './singleDataPicker.js';
import SelectComponent from './selectComponent.js';

//引入样式
import "../less/tryLesson.less";

var config = require("../test/config.json");
var teacherAccountsUrl = 'http://192.168.0.247:8099/web/common/trialTeacherList';
var studentAccountsUrl = 'http://192.168.0.247:8099/web/common/trialStudentList';
var timeSlotUrl = 'http://192.168.0.247:8099/timeslot/list/0';
var demoCourseUrl = 'http://192.168.0.247:8099/web/common/demoCourses';
var submitUrl = 'http://192.168.0.247:8099/web/common/chooseTriallecture';

var TryLesson = React.createClass({
    getInitialState : function () {
        return {
            teacherUrl : teacherAccountsUrl,
            teacherAccounts :{
                arr : [], //教师名字
                id : []  //教师ID
            },
            studentUrl : studentAccountsUrl,
            studentAccounts : {
                arr: [], //学生名字
                id: []  //学生ID
            },
            timeUrl : timeSlotUrl,
            timeSlot : {
                arr: [], //具体时间范围
                id: []  //时间区间的ID
            },
            courseUrl : demoCourseUrl,
            demoCourse : {
                index : 0,
                arr: [],  //课程名称
                id: [],  //课程ID
                type: []  //课程类型
            }
        };
    },
    componentDidMount : function () { //也可以写在update里面
        //获取试讲账号列表
        this._getTeacherAccounts(this.state.teacherUrl);

        //获取学生账号列表
        this._getStudentAccounts(this.state.studentUrl);

        //获取试讲时间列表
        this._getTimeSlot(this.state.timeUrl);

        //获取demo课列表
        this._getCourse(this.state.courseUrl);
    },
    render : function(){
        return(
            <div className="tryLesson">
                <div className="fade modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="element">
                                    <label>试讲账号:</label>
                                    <SelectComponent ref="teacherAccounts" contentData={this.state.teacherAccounts}/>
                                </div>
                                <div className="element">
                                    <label>学生账号:</label>
                                    <SelectComponent ref="studentAccounts" contentData={this.state.studentAccounts}/>
                                </div>
                                <div className="element">
                                    <label>demo 课:</label>
                                    <SelectComponent ref="course" contentData={this.state.demoCourse}/>
                                </div>
                                <div className="element" style={{height:"65px"}}>
                                    <label>试讲时间:</label>
                                    <div className="try-time">
                                        <SingleDataPicker ref="date" style={{width:"170px"}} />
                                        <SelectComponent ref="timeSlot" contentData={this.state.timeSlot}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this._submit} data-dismiss="modal">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                newTeacherArr[i] = data[i].nickName;
                newTeacherId[i] = data[i].teacherId;
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
                newStudentArr[i] = data[i].nickName;
                newStudentId[i] = data[i].studentId;
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
                newCourseArr[i] = data[i].name;
                newCourseId[i] = data[i].courseId;
                newCourseType[i] = data[i].courseType;
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
                newTimeArr[i] = `${data[i].startTime} - ${data[i].endTime}`;
                newTimeId[i] = data[i].slotId;
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
    _submit : function () {

        let teacherOralEnId = this.props.row.teacherId,
            teacherId = this.state.teacherAccounts.id[this.refs.teacherAccounts.state.index],
            studentId = this.state.studentAccounts.id[this.refs.studentAccounts.state.index],
            courseId = this.state.demoCourse.id[this.refs.course.state.index],
            courseName = this.state.demoCourse.arr[this.refs.course.state.index],
            date = this.refs.date.state.value,
            hour = this.state.timeSlot.arr[this.refs.timeSlot.state.index],
            startHour = hour.substr(0,8),
            endHour = hour.substr(-8,8),
            startTime = `${date} ${startHour}`,
            endTime = `${date} ${endHour}`,
            courseType = this.state.demoCourse.type[this.refs.course.state.index],
            timeSlotId = this.state.timeSlot.id[this.refs.timeSlot.state.index];

        Post({
            url : submitUrl,
            data : {
                "teacherOralEnId" : teacherOralEnId,
                "teacherId": teacherId,
                "studentId": studentId,
                "courseId": courseId,
                "courseName": courseName,
                "startTime": startTime,
                "endTime": endTime,  /*"2017-05-06 12:12:55"*/
                "courseType": courseType,
                "timeSlotId": timeSlotId
            }
        }).then(({data}) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });

        /*Post({
            url : submitUrl,
            data : {
                "teacherOralEnId" : "11061",
                "teacherId": "1399500",
                "studentId": "1399576",
                "courseId": "L3NoYXJlL3N2bi9NT1ZJRSBUSU1FIDIvMDA0LlNocmVr5LmL552h576O5Lq66buR56ul6K-dLnhsc3g",
                "courseName": "Shrek之睡美人黑童话",
                "startTime": "2017-05-06 12:00:00",
                "endTime": "2017-05-06 12:30:00",
                "courseType": "外教demo课",
                "timeSlotId": "9"
            }
        }).then(({code,data}) => {
            console.log(data);
        }).catch();*/
    }
});

export default TryLesson;