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
                                        <p>{info.auditTime}</p>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <p>{configData.gender.arr[info.gender]}</p>
                                    </div>
                                    <div className="field">
                                        <label>First Name:</label>
                                        <p>{info.firstName}</p>
                                    </div>
                                    <div className="field">
                                        <label>手机号:</label>
                                        <p>{info.cellphoneNumber}</p>
                                    </div>
                                    <div className="field">
                                        <label>Last Name:</label>
                                        <p>{info.lastName}</p>
                                    </div>
                                    <div className="field">
                                        <label>邮箱:</label>
                                        <p>{info.email}</p>
                                    </div>
                                    <div className="field">
                                        <label>职业:</label>
                                        <p>{info.occupation}</p>
                                    </div>
                                    <div className="field">
                                        <label>Skype ID:</label>
                                        <p>{info.skype}</p>
                                    </div>
                                    <div className="field">
                                        <label>时区:</label>
                                        <p>{info.timezone}</p>
                                    </div>
                                    <div className="field">
                                        <label>城市:</label>
                                        <p>{info.city}</p>
                                    </div>
                                    <div className="field">
                                        <label>学历:</label>
                                        <p>{getById(configData.degree, info.degree)}</p>
                                    </div>
                                    <div className="field">
                                        <label>学校名称:</label>
                                        <p>{info.school}</p>
                                    </div>
                                    <div className="field">
                                        <label>学校所在国家:</label>
                                        <p>{info.schoolCountry}</p>
                                    </div>
                                    <div className="field">
                                        <label>专业:</label>
                                        <p>{info.specialty}</p>
                                    </div>
                                    <div className="field">
                                        <label>在校时间:</label>
                                        <p>{info.schoolingTime}</p>
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>创意和表达:</label>
                                        <p>{info.creativeAndExpression}</p>
                                    </div>
                                    <div className="field">
                                        <label>适应和引导:</label>
                                        <p>{info.adaptAndLead}</p>
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>国家级别:</label>
                                        <p>{getById(configData.nationalityLevel, info.nationalityLevel)}</p>
                                        <p>{info.nationalityLevel}</p>
                                    </div>
                                    <div className="field">
                                        <label>零食:</label>
                                        <p>{getById(configData.snack, info.snack)}</p>
                                        <p>{info.snack}</p>
                                    </div>
                                    <div className="field">
                                        <label>口语水平:</label>
                                        <p>{getById(configData.spokenLevel, info.spokenLevel)}</p>
                                    </div>
                                    <div className="field">
                                        <label>教学经验:</label>
                                        <p>{getById(configData.experienceDetail, info.teachingExperience)}</p>
                                        <p>{info.teachingExperience}</p>
                                    </div>
                                </div>
                                <div className="modal-body-footer">
                                    <div className="field">
                                        <label>试讲账号:</label>
                                        <p>{info.triallectureAccount}</p>
                                    </div>
                                    <div className="field">
                                        <label>学生账号:</label>
                                        <p>{info.studentAccount}</p>
                                    </div>
                                    <div className="field">
                                        <label>demo 课:</label>
                                        <p>{getById(this.props.course, info.demoCourse)}</p>
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <p>{`${info.triallectureStartTimeStart} - ${info.triallectureStartTimeEnd}`}</p>
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