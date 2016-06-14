/**
 * Created by cuilu on 16/5/18.
 * 教师管理页详情模态框
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';

//引入样式
import '../../less/modalManagement.less';
import '../../less/modalLecture.less';


var configData = require("../../config/config.json");

var submitUrl = `http://${configData.ip}/web/teacherOralEn/updateTeacher`;

var ModalManagement = React.createClass({
    render : function(){
        let info = this.props.info;
        return(
            <div className="modalManagement">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>报名日期:</label>
                                        <DataPicker type="1" ref="createTime" value={info.createTime} />
                                    </div>
                                    <div className="field">
                                        <label>审核日期:</label>
                                        <DataPicker type="1" ref="auditTime" value={info.auditTime} />
                                    </div>
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <TimePicker type="1" ref="interviewTime" value={info.interviewTime} />
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <TimePicker type="2" ref="triallectureTime" value={info.triallectureTime} />
                                    </div>
                                    <BasicInfo ref="basicInfo" value={info}/>
                                    <div className="field">
                                        <label>性别:</label>
                                        <SelectComponent ref="gender" contentData={configData.gender} value={info.gender} />
                                    </div>
                                    <div className="field">
                                        <label>综合评分:</label>
                                        <input type="text" className="form-control" value={info.markScore}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-primary" onClick={this._submit}>保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _submit : function () {
        console.log(this.props.info);
        let content = {
            "createTime": this.refs.createTime.state.value,
            "auditTimeStart": this.refs.auditTime.state.start,
            "auditTimeEnd": this.refs.auditTime.state.end,
            "triallectureStartTimeStart": this.refs.triallectureTime.state.start,
            "triallectureStartTimeEnd": this.refs.triallectureTime.state.end,
            "interviewTimeStart": this.refs.interviewTime.state.start,
            "interviewTimeEnd": this.refs.interviewTime.state.end,
            "firstName": this.refs.basicInfo.state.firstName,
            "lastName": this.refs.basicInfo.state.lastName,
            "cellphoneNumber": this.refs.basicInfo.state.cellphoneNumber,
            "email": this.props.info.email,
            "gender": this.refs.gender.state.value - 0,
            "skype": this.refs.basicInfo.state.skype,
            "nationality": this.refs.basicInfo.state.nationality,
            "timezone": this.refs.basicInfo.state.timezone,
            "city": this.refs.basicInfo.state.city,
            "degree": this.refs.basicInfo.state.degree,
            "school": this.refs.basicInfo.state.school,
            "schoolCountry": this.refs.basicInfo.state.schoolCountry,
            "specialty": this.refs.basicInfo.state.specialty,
            "schoolStartYear": this.refs.basicInfo.state.schoolStartYear,
            "schoolEndYear": this.refs.basicInfo.state.schoolEndYear,
            "occupation": this.refs.basicInfo.state.occupation
        };
        //console.log(content);
        Post({
            url : submitUrl,
            data : content
        }).then(
            () => {
                //显示更改后的数据
                $(".modalLecture .modal").modal('hide');
                this.props.callback();
            },
            ()=>{
                alert("安排试讲失败,可能因为网络原因,也可能是安排出现冲突!");
            }
        ).catch((err) => {
            console.log(err);
        });
    }
});

export default ModalManagement;