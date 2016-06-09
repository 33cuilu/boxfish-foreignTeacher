/**
 * Created by cuilu on 16/5/18.
 * 面试页详情模态框
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';

//引入样式
import '../../less/modalInterview.less';

var configData = require("../../test/config.json");
var submitUrl = `http://${configData.ip}/web/teacherOralEn/updateTeacher`;

var ModalInterview = React.createClass({
    render : function(){
        return(
            <div className="modalInterview">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>审核日期:</label>
                                        <DataPicker ref="checkDate" value={this.props.info.auditTime}/>
                                    </div>
                                    <BasicInfo value={this.props.info} ref="basicInfo"/>
                                    <div className="field">
                                        <label>教学经验:</label>
                                        <SelectComponent ref="teachingExperience" value={this.props.info.teachingExperience} contentData={configData.experienceDetail} />
                                    </div>
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

export default ModalInterview;