/**
 * Created by cuilu on 16/5/24.
 *面试页安排试讲模态框
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import SingleDataPicker from './../commons/singleDataPicker.js';
import SelectComponent from './../commons/selectComponent.js';

//引入样式
import "../../less/tryLesson.less";

var config = require("../../test/config.json");
var submitUrl = `http://${config.ip}/web/common/chooseTriallecture`;

var TryLesson = React.createClass({
    render : function(){
        return(
            <div className="tryLesson">
                <div className="fade modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="element">
                                    <label>试讲账号:</label>
                                    <SelectComponent ref="teacherAccounts" contentData={this.props.teacher}/>
                                </div>
                                <div className="element">
                                    <label>学生账号:</label>
                                    <SelectComponent ref="studentAccounts" contentData={this.props.student}/>
                                </div>
                                <div className="element">
                                    <label>demo 课:</label>
                                    <SelectComponent ref="course" contentData={this.props.course}/>
                                </div>
                                <div className="element" style={{height:"65px"}}>
                                    <label>试讲时间:</label>
                                    <div className="try-time">
                                        <SingleDataPicker ref="date" style={{width:"170px"}} />
                                        <SelectComponent ref="timeSlot" contentData={this.props.time}/>
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
    _submit : function () {
        console.log(this.props.course);
        let email = this.props.row.email,
            teacherId = this.props.teacher.id[this.refs.teacherAccounts.state.index],
            studentId = this.props.student.id[this.refs.studentAccounts.state.index],
            courseId = this.props.course.id[this.refs.course.state.index],
            courseName = this.props.course.arr[this.refs.course.state.index],
            date = this.refs.date.state.value,
            hour = this.props.time.arr[this.refs.timeSlot.state.index],
            startHour = hour.substr(0,8),
            endHour = hour.substr(-8,8),
            startTime = `${date} ${startHour}`,
            endTime = `${date} ${endHour}`,
            courseType = this.props.course.type[this.refs.course.state.index],
            timeSlotId = this.props.time.id[this.refs.timeSlot.state.index];

        Post({
            url : submitUrl,
            data : {
                "email" : email,
                "teacherId": teacherId,
                "studentId": studentId,
                "courseId": courseId,
                "courseName": courseName,
                "startTime": startTime,
                "endTime": endTime,
                "courseType": courseType,
                "timeSlotId": timeSlotId
            }
        }).then(
            ({data}) => {
            //显示更改后的时间
                this.props.callback(`${startTime}`, `${endTime}`);
            },
            ()=>{
                alert("安排试讲失败,可能因为网络原因,也可能是安排出现冲突!");
            }
        ).catch((err) => {
            console.log(err);
        });
        /*Post({
            url : submitUrl,
            data : {
                "teacherOralEnId" : "129644",
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