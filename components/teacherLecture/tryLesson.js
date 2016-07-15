/**
 * Created by cuilu on 16/5/24.
 *面试页安排试讲模态框
 */

//引入插件
import React from 'react';
import store from 'store';
import {Post,getCourseTypeById,getById} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';

//引入样式
import "../../less/tryLesson.less";

var configData = require("../../config/config.json");
var submitUrl = `http://${configData.ip}/web/common/chooseTriallecture`;

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
                                        <DataPicker type="1" ref="date" show="true" />
                                        <SelectComponent ref="timeSlot" contentData={this.props.time}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this._submit}>确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _submit : function () {
        if(!this.props.row.email){
            alert("该用户没有邮箱,用户不存在!");
        }
        let date = this.refs.date.state.value.substr(0,10),
            hour = getById(this.props.time, this.refs.timeSlot.state.value),
            startHour = hour.substr(0,8),
            endHour = hour.substr(-8,8),
            data = {
            "email" : this.props.row.email,
            "teacherId": this.refs.teacherAccounts.state.value - 0,
            "studentId": this.refs.studentAccounts.state.value - 0,
            "courseId": this.refs.course.state.value,
            "courseName": getById(this.props.course, this.refs.course.state.value),
            "courseType": getCourseTypeById(this.props.course, this.refs.course.state.value),
            "startTime": `${date} ${startHour}`,
            "endTime": `${date} ${endHour}`,
            "timeSlotId": this.refs.timeSlot.state.value - 0
        };
        if(date.length <= 0){
            alert("请选择试讲日期!");
            return;
        }
        console.log(data);
        if(data.teacherId == -100){
            alert("请选择试讲账号!");
            return;
        }
        if(data.studentId == -100){
            alert("请选择学生账号!");
            return;
        }
        if(data.courseId == "-100"){
            alert("请选择demo课!");
            return;
        }
        if(data.timeSlotId == -100){
            alert("请选择上课时间!");
            return;
        }

        Post({
            url : `${submitUrl}?token=${store.get("accessToken")}`,
            data : data
        }).then(
            () => {
            //显示更改后的时间
                $(".tryLesson .modal").modal('hide');
                this.props.callback();
            },
            (err)=>{
                alert(err.responseJSON.message);
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