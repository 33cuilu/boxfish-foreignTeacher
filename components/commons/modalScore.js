/**
 * Created by tinna on 16/6/06.
 *  面试页打分模态框
 */

//引入插件
import React from 'react';
import {getScoreById} from '../../util/ajax.js';

//引入组件
import SelectComponent from './selectComponent.js';

//引入样式
import '../../less/modalScore.less';

var configData = require("../../config/config.json");

var ModalScore = React.createClass({
    getInitialState : function () {
        return {
            creativeAndExpression : -100,
            adaptAndLead : -100,
            nationalityLevel : -100,
            spokenLevel : -100,
            snack : -100,
            teachingExperience : -100
        }
    },
    componentWillReceiveProps : function(nextProps){
        if(nextProps.defaultContent){
            this.setState({
                creativeAndExpression : nextProps.defaultContent.creativeAndExpression,
                adaptAndLead : nextProps.defaultContent.adaptAndLead,
                nationalityLevel : nextProps.defaultContent.nationalityLevel,
                spokenLevel : nextProps.defaultContent.spokenLevel,
                snack : nextProps.defaultContent.snack,
                teachingExperience : nextProps.defaultContent.teachingExperience
            });
        }

    },
    render : function(){
        return(
            <div className="modalScore">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <label>创意和表达:</label>
                                <SelectComponent ref="creativeAndExpression" value={this.state.creativeAndExpression} contentData={configData.creativeAndExpression}
                                                 onChange={(value)=>{this.changeCreativeAndExpression(value)}}/>
                                <label>适应和引导:</label>
                                <SelectComponent ref="adaptAndLead" value={this.state.adaptAndLead} contentData={configData.adaptAndLead}
                                                 onChange={(value)=>{this.changeAdaptAndLead(value)}}/>
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
                                <button type="button" className="btn btn-primary" onClick={this._submit} >确定</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    changeCreativeAndExpression : function (value) {
        this.setState({
            creativeAndExpression: value
        });
    },
    changeAdaptAndLead : function (value) {
        this.setState({
            adaptAndLead : value
        });
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
        let id1 = +this.refs.creativeAndExpression.state.value,
            id2 = +this.refs.adaptAndLead.state.value,
            id3 = +this.refs.nationalityLevel.state.value,
            id4 = +this.refs.snack.state.value,
            id5 = +this.refs.spokenLevel.state.value,
            id6 = +this.refs.teachingExperience.state.value;
        this.props.callback(id1, id2, id3, id4, id5, id6);
    }
});

export default ModalScore;