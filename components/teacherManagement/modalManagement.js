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
import AbilityInfo from './../commons/abilityInfo';

//引入样式
import '../../less/modalLecture.less';

var config = require("../../test/config.json");

var ModalManagement = React.createClass({
    render : function(){
        return(
            <div className="modalManagement">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>报名日期:</label>
                                        <DataPicker ref="loginDate"/>
                                    </div>
                                    <div className="field">
                                        <label>审核日期:</label>
                                        <DataPicker ref="checkDate"/>
                                    </div>
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <TimePicker ref="interviewTime"/>
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <TimePicker ref="tryTime"/>
                                    </div>
                                    <BasicInfo ref="basicInfo"/>
                                    <div className="field">
                                        <label>在校时间:</label>
                                        <DataPicker ref="schoolingTime"/>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <SelectComponent ref="gender" contentData={config.sex} />
                                    </div>
                                    <div className="field">
                                        <label>综合评分:</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="modal-body-body">
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
    }
});

export default ModalManagement;