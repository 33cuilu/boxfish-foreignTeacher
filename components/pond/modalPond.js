/**
 * Created by cuilu on 16/5/18.
 * 池子页详情模态框
 */

//引入插件
import React from 'react'
import {getScoreById,getById} from '../../util/ajax.js';

//引入插件

//引入样式
import '../../less/modalPond.less';

var configData = require('./../../config/config.json');

var ModalPond = React.createClass({
    render : function(){
        let info = this.props.info || {},
            trialScore = info.trialScoresMap,
            adaptAndLead = (trialScore)? trialScore.adaptAndLead : '',
            creativeAndExpression = (trialScore)? trialScore.creativeAndExpression : '';
        return(
            <div className="modalPond">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>审核日期:</label>
                                        <label className="info" >{info.auditTime}</label>
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>First Name:</label>
                                        <label className="info">{info.firstName}</label>
                                    </div>
                                    <div className="field">
                                        <label>Last Name:</label>
                                        <label className="info">{info.lastName}</label>
                                    </div>
                                    <div className="field">
                                        <label>手机号:</label>
                                        <label className="info">{info.cellphoneNumber}</label>
                                    </div>
                                    <div className="field">
                                        <label>邮箱:</label>
                                        <label className="info">{info.email}</label>
                                    </div>
                                    <div className="field">
                                        <label>面试渠道:</label>
                                        <label className="info">{info.interviewChannel}</label>
                                    </div>
                                    <div className="field">
                                        <label>面试账号:</label>
                                        <label className="info">{info.interviewAccount}</label>
                                    </div>
                                    <div className="field">
                                        <label>时区:</label>
                                        <label className="info">{info.timezone}</label>
                                    </div>
                                    <div className="field">
                                        <label>国家:</label>
                                        <label className="info">{info.nationality}</label>
                                    </div>
                                    <div className="field">
                                        <label>常驻地:</label>
                                        <label className="info">{info.location}</label>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <label className="info">{getById(configData.gender, info.gender)}</label>
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>试讲账号:</label>
                                        <label className="info">{info.triallectureTeacher}</label>
                                    </div>
                                    <div className="field">
                                        <label>学生账号:</label>
                                        <label className="info">{info.triallectureStudent}</label>
                                    </div>
                                    <div className="field">
                                        <label>demo 课:</label>
                                        <label className="info">{getById(this.props.course, info.demoCourse)}</label>
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <label className="info">{(info.triallectureStartTime)?`${info.triallectureStartTime} - ${info.triallectureEndTime}`:''}</label>
                                    </div>
                                    <div className="field">
                                        <label>面试考官:</label>
                                        <label className="info">{info.interviewer}</label>
                                    </div>
                                    <div className="field">
                                        <label>试讲考官:</label>
                                        <label className="info">{info.triallectureInterviewer}</label>
                                    </div>
                                </div>
                                <div className="modal-body-footer">
                                    <div className="field">
                                        <label>创意:</label>
                                        <label className="info">{creativeAndExpression}</label>
                                    </div>
                                    <div className="field">
                                        <label>零食:</label>
                                        <label className="info">{getById(configData.snack, info.snack)}</label>
                                        <label className="score">{getScoreById(configData.snack, info.snack)}</label>
                                    </div>
                                    <div className="field">
                                        <label>拓展:</label>
                                        <label className="info">{adaptAndLead}</label>
                                    </div>
                                    <div className="field">
                                        <label>口语水平:</label>
                                        <label className="info">{getById(configData.spokenLevel, info.spokenLevel)}</label>
                                        <label className="score">{getScoreById(configData.spokenLevel, info.spokenLevel)}</label>
                                    </div>
                                    <div className="field">
                                        <label>教学经验:</label>
                                        <label className="info">{getById(configData.experienceDetail, info.teachingExperience)}</label>
                                        <label className="score">{getScoreById(configData.experienceDetail, info.teachingExperience)}</label>
                                    </div>
                                    <div className="field">
                                        <label>国家级别:</label>
                                        <label className="info">{getById(configData.nationalityLevel, info.nationalityLevel)}</label>
                                        <label className="score">{getScoreById(configData.nationalityLevel ,info.nationalityLevel)}</label>
                                    </div>
                                </div>
                                <div className="modal-body-remarks">
                                    <label>入池理由:</label>
                                    <textarea rows="4" readOnly={true} value={info.noPassReason} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ModalPond;