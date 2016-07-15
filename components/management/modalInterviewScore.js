/**
 * Created by tinna on 16/6/7.
 *  师资管理的面试评分模模态框
 */

//引入插件
import React from 'react'
import {Post,Get,getScoreById} from '../../util/ajax.js';

//引入组件
import SelectComponent from './../commons/selectComponent.js';

//引入样式
import "../../less/modalInterviewScore.less";

var configData = require("../../config/config.json");

var ModalInterviewScore = React.createClass({
    getInitialState : function () {
        return {
            nationalityLevel : -100,
            spokenLevel : -100,
            snack : -100,
            teachingExperience : -100,
            interviewScore : {
                nationalityLevel : -100,
                snack : -100,
                spokenLevel :-100,
                teachingExperience : -100
            }
        }
    },
    componentWillReceiveProps : function(nextProps){
        if(nextProps.defaultContent){
            this.setState({
                nationalityLevel : nextProps.defaultContent.nationalityLevel,
                spokenLevel : nextProps.defaultContent.spokenLevel,
                snack : nextProps.defaultContent.snack,
                teachingExperience : nextProps.defaultContent.teachingExperience
        });
        }

    },
    render : function(){
        return (
            <div className="interviewScore">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                    <label>国家级别:</label>
                                    <SelectComponent value={this.state.nationalityLevel} contentData={configData.nationalityLevel} ref="nationalityLevel"
                                                     onChange={(value)=>{this.changeNationalityLevel(value)}}/>
                                <span>{getScoreById(configData.nationalityLevel,+this.state.nationalityLevel)}</span>
                                    <label>零食:</label>
                                    <SelectComponent value={this.state.snack} contentData={configData.snack} ref="snack"
                                                     onChange={(value)=>{this.changeSnack(value)}}/>
                                <span>{getScoreById(configData.snack, +this.state.snack)}</span>
                                    <label>口语水平:</label>
                                    <SelectComponent value={this.state.spokenLevel} contentData={configData.spokenLevel} ref="spokenLevel"
                                                     onChange={(value)=>{this.changeSpokenLevel(value)}}/>
                                <span>{getScoreById(configData.spokenLevel, +this.state.spokenLevel)}</span>
                                    <label>教学经验:</label>
                                    <SelectComponent value={this.state.teachingExperience} ref="teachingExperience" contentData={configData.experienceDetail}
                                                     onChange={(value)=>{this.changeExperience(value)}}/>
                                <span>{getScoreById(configData.experienceDetail, +this.state.teachingExperience)}</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this._submit}>确定</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    changeNationalityLevel : function (value) {
        this.setState({
            nationalityLevel: value
        });
    },
    changeSnack : function (value) {
        this.setState({
            snack : value
        });
    },
    changeSpokenLevel : function (value) {
        this.setState({
            spokenLevel : value
        });
    },
    changeExperience : function (value) {
        this.setState({
            teachingExperience : value
        })
    },
    _submit : function () {
        let id1 = this.refs.nationalityLevel.state.value - 0,
            id2 = this.refs.snack.state.value - 0,
            id3 = this.refs.spokenLevel.state.value - 0,
            id4 = this.refs.teachingExperience.state.value - 0;
        this.props.callback(id1, id2, id3, id4);
    }
});

export default ModalInterviewScore;