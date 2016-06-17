/**
 * Created by cuilu on 16/5/18.
 * 池子页详情模态框
 */

//引入插件
import React from 'react'
import {Post,Get,getById} from '../../util/ajax.js';

//引入插件

//引入样式
import '../../less/modalPond.less';

var configData = require('./../../config/config.json');

var ModalPond = React.createClass({
    render : function(){
        let info = this.props.info || {};
        return(
            <div className="modalPond">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>审核时间:</label>
                                        <label>{info.auditTime}</label>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <label>{configData.gender.arr[info.gender]}</label>
                                    </div>
                                    <div className="field">
                                        <label>First Name:</label>
                                        <label>{info.firstName}</label>
                                    </div>
                                    <div className="field">
                                        <label>手机号:</label>
                                        <label>{info.cellphoneNumber}</label>
                                    </div>
                                    <div className="field">
                                        <label>Last Name:</label>
                                        <label>{info.lastName}</label>
                                    </div>
                                    <div className="field">
                                        <label>邮箱:</label>
                                        <label>{info.email}</label>
                                    </div>
                                    <div className="field">
                                        <label>职业:</label>
                                        <label>{info.occupation}</label>
                                    </div>
                                    <div className="field">
                                        <label>Skype ID:</label>
                                        <label>{info.skype}</label>
                                    </div>
                                    <div className="field">
                                        <label>时区:</label>
                                        <label>{info.timezone}</label>
                                    </div>
                                    <div className="field">
                                        <label>城市:</label>
                                        <label>{info.city}</label>
                                    </div>
                                    <div className="field">
                                        <label>学历:</label>
                                        <label>{getById(configData.degree, info.degree)}</label>
                                    </div>
                                    <div className="field">
                                        <label>学校名称:</label>
                                        <label>{info.school}</label>
                                    </div>
                                    <div className="field">
                                        <label>学校所在国家:</label>
                                        <label>{info.schoolCountry}</label>
                                    </div>
                                    <div className="field">
                                        <label>专业:</label>
                                        <label>{info.specialty}</label>
                                    </div>
                                    <div className="field">
                                        <label>在校时间:</label>
                                        <label>{info.schoolingTime}</label>
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>创意和表达:</label>
                                        <label>{info.creativeAndExpression}</label>
                                    </div>
                                    <div className="field">
                                        <label>适应和引导:</label>
                                        <label>{info.adaptAndLead}</label>
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>国家级别:</label>
                                        <label>{getById(configData.nationalityLevel, info.nationalityLevel)}</label>
                                        <label>{info.nationalityLevel}</label>
                                    </div>
                                    <div className="field">
                                        <label>零食:</label>
                                        <label>{getById(configData.snack, info.snack)}</label>
                                        <label>{info.snack}</label>
                                    </div>
                                    <div className="field">
                                        <label>口语水平:</label>
                                        <label>{getById(configData.spokenLevel, info.spokenLevel)}</label>
                                    </div>
                                    <div className="field">
                                        <label>教学经验:</label>
                                        <label>{getById(configData.experienceDetail, info.teachingExperience)}</label>
                                        <label>{info.teachingExperience}</label>
                                    </div>
                                </div>
                                <div className="modal-body-footer">
                                    <div className="field">
                                        <label>试讲账号:</label>
                                        <label>{info.triallectureTeacher}</label>
                                    </div>
                                    <div className="field">
                                        <label>学生账号:</label>
                                        <label>{info.triallectureStudent}</label>
                                    </div>
                                    <div className="field">
                                        <label>demo 课:</label>
                                        <label>{getById(this.props.course, info.demoCourse)}</label>
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <label>{`${info.triallectureStartTime} - ${info.triallectureEndTime}`}</label>
                                    </div>
                                </div>
                                <div className="modal-body-remarks">
                                    <label>入池理由:</label>
                                    <textarea rows="4" readOnly="readonly">{info.reason}</textarea>
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