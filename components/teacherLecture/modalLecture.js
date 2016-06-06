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

var configData = require("../../test/config.json");

var submitUrl = `http://${configData.ip}/web/teacherOralEn/updateTeacher`;

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
                                        <SelectComponent ref="gender" value={gender} contentData={configData.sex} />
                                    </div>
                                    <BasicInfo {...this.props.info} ref="basicInfo" />
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
    _submit : function () {
        
    }
});

export default ModalLecture;