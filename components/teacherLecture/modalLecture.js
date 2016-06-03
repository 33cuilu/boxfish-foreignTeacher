/**
 * Created by cuilu on 16/5/18.
 * 试讲页
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SingleDataPicker from './../commons/singleDataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';
import AbilityInfo from './../commons/abilityInfo';

//引入样式
import '../../less/modalLecture.less';

var config = require("../../test/config.json");

var ModalLecture = React.createClass({
    render : function(){
        let {interviewTime,gender} = this.props.info;
        return(
            <div className="modalLecture">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <DataPicker ref="interviewTime" value={interviewTime}/>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <SelectComponent ref="gender" value={gender} contentData={config.sex} />
                                    </div>
                                    <div className="field">
                                        <label>试讲账号:</label>
                                        <SelectComponent ref="teacherAccounts" contentData={this.props.teacher}/>
                                    </div>
                                    <div className="field">
                                        <label>学生账号:</label>
                                        <SelectComponent ref="studentAccounts" contentData={this.props.student}/>
                                    </div>
                                    <div className="field">
                                        <label>demo 课:</label>
                                        <SelectComponent ref="course" contentData={this.props.course}/>
                                    </div>
                                    <div className="field">
                                        <label>试讲日期:</label>
                                        <SingleDataPicker ref="date" />
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <SelectComponent ref="timeSlot" contentData={this.props.time}/>
                                    </div>
                                    <BasicInfo {...this.props.info} ref="basicInfo" />
                                    <div className="field">
                                        <label>综合评分:</label>
                                        <input type="text" ref="score" className="form-control" />
                                    </div>
                                    <AbilityInfo ref="abilityInfo"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-primary">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    /*_initial : function () {
        let {a,b,c,d} = this.props.info;
        let info = this.props.info,
            interviewTime = info.interviewTime,
            gender = info.gender,
            tryID = info.triallectureTeacher,
            studentID = info.triallectureStudent,
            demoCourse = info.demoCourse,
            triallectureDate = info.triallectureStartTime,
            triallectureTime = `${info.triallectureStartTime} - ${info.triallectureEndTime}`,
            basicInfo = {
                firstName : info.firstName,
                tel : info.cellphoneNumber,
                lastName : info.lastName,
                email : info.email,
                occupation : info.occupation,
                skype : info.skype,
                timezone : info.timezone,
                city : info.city,
                degree : info.degree,
                school : info.school,
                schoolCountry : info.schoolCountry,
                specialty : info.specialty
            },
            score = info.score,
            abilityInfo = {
                countryLevel : info.nationalLevel,
                snack : info.snack,
                spokenLevel : info.spokenLevel,
                teachingExperience : info. teachingExperience
            };
    },*/
    _submit : function () {
        
    }
});

export default ModalLecture;