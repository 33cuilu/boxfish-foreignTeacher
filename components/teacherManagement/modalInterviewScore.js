/**
 * Created by tinna on 16/6/7.
 *  师资管理的面试评分模模态框
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import SelectComponent from './../commons/selectComponent.js';

//引入样式
import "../../less/modalInterviewScore.less";

var configData = require("../../test/config.json");

var ModalInterviewScore = React.createClass({
    render : function(){
        return (
            <div className="interviewScore">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                    <label>国家级别:</label>
                                    <SelectComponent contentData={configData.nationalLevel} /> <span>100</span>
                                    <label>零食:</label>
                                    <SelectComponent contentData={configData.snacks} /> <span>100</span>
                                    <label>口语水平:</label>
                                    <SelectComponent contentData={configData.spokenLevel} /> <span>100</span>
                                    <label>教学经验:</label>
                                    <SelectComponent ref="teachingExperience" contentData={configData.experienceDetail}/> <span>100</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this._submit} data-dismiss="modal">确定</button>
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

export default ModalInterviewScore;