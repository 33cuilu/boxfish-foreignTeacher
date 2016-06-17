/**
 * Created by tinna on 16/6/17.
 * 面试页修改试讲模态框
 */

//引入插件
import React from 'react';
import {Post,getCourseTypeById,getById} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';

//引入样式
import "../../less/tryLesson.less";

var configData = require("../../config/config.json");

var submitUrl = `http://${configData.ip}/web/common/updateTriallecture`;

var EditLesson = React.createClass({
    render : function(){
        let info = this.props.info;
        return(
            <div className="editLesson">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="element">
                                    <label>试讲账号:</label>
                                    <SelectComponent ref="teacherAccounts" contentData={this.props.teacher} value={info.teacherId}/>
                                </div>
                                <div className="element">
                                    <label>学生账号:</label>
                                    <label>{getById(this.props.student, this.props.info.studentId)}</label>
                                </div>
                                <div className="element">
                                    <label>demo 课:</label>
                                    <SelectComponent ref="course" contentData={this.props.course} value={info.courseId}/>
                                </div>
                                <div className="element" style={{height:"65px"}}>
                                    <label>试讲时间:</label>
                                    <div className="try-time">
                                        <DataPicker type="1" ref="date" value={(info.startTime)? info.startTime.substr(0,10):''}/>
                                        <SelectComponent ref="timeSlot" contentData={this.props.time} value={info.timeSlotId}/>
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
                "teacherId": (+this.refs.teacherAccounts.state.value != -100) ? +this.refs.teacherAccounts.state.value : '',
                "studentId": this.props.info.studentId,
                "courseId": (+this.refs.course.state.value != -100)? this.refs.course.state.value: '',
                "courseName": getById(this.props.course, this.refs.course.state.value),
                "courseType": getCourseTypeById(this.props.course, this.refs.course.state.value),
                "startTime": `${date} ${startHour}`,
                "endTime": `${date} ${endHour}`,
                "timeSlotId": (+this.refs.timeSlot.state.value != -100)? +this.refs.timeSlot.state.value : ''
            };
        if(date.length <= 0){
            alert("请选择试讲日期!");
            return;
        }
        console.log(data);
        for(let attr in data){
            if(attr!="courseType" && attr!="courseName" && !data[attr]){
                alert(`您有未选择的信息${attr},请填写!`);
                return;
            }
        }

        Post({
            url : submitUrl,
            data : data
        }).then(
            () => {
                //显示更改后的时间
                $(".editLesson .modal").modal('hide');
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

export default EditLesson;