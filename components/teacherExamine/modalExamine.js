/**
 * Created by cuilu on 16/5/18.
 * 审核页详情模态框
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';

//引入样式
import '../../less/modalExamine.less';

var config = require("../../test/config.json");

var ModalExamine = React.createClass({
    render : function(){
        return(
            <div className="modalExamine">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>报名日期:</label>
                                        <DataPicker />
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <BasicInfo ref="basicInfo"/>
                                    <div className="field">
                                        <label>在校时间:</label>
                                        <DataPicker ref="schoolingTime"/>
                                    </div>
                                    <div className="field">
                                        <label>教学经验:</label>
                                        <SelectComponent ref="teachingExperience" contentData={config.experienceDetail} />
                                    </div>
                                    <div className="field">
                                        <label>国家:</label>
                                        <SelectComponent contentData={config.country} />
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

export default ModalExamine;