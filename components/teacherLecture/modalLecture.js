/**
 * Created by cuilu on 16/5/18.
 * 试讲页
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

var ModalLecture = React.createClass({
    render : function(){
        return(
            <div className="modalLecture">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <DataPicker />
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="field">
                                        <label>试讲账号:</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="field">
                                        <label>学生账号:</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="field">
                                        <label>demo 课:</label>
                                        <SelectComponent contentData={config.timeSlice} />
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <TimePicker ref="tryTime"/>
                                    </div>
                                    <BasicInfo ref="basicInfo" />
                                    <div className="field">
                                        <label>综合评分:</label>
                                        <input type="text" className="form-control" />
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
    }
});

export default ModalLecture;