/**
 * Created by tinna on 16/6/06.
 *  面试页打分模态框
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import SelectComponent from './selectComponent.js';

//引入样式
import '../../less/modalTryScore.less';

var configData = require("../../config/config.json");

var ModalTryScore = React.createClass({
    getInitialState : function () {
        return {
            creativeAndExpression : -100,
            adaptAndLead : -100,
            lectureScore : {
                creativeAndExpression : -100,
                adaptAndLead : -100
            }
        }
    },
    componentWillReceiveProps : function(nextProps){
        if(nextProps.defaultContent){
            this.setState({
                creativeAndExpression : nextProps.defaultContent.creativeAndExpression,
                adaptAndLead : nextProps.defaultContent.adaptAndLead
            });
        }

    },
    render : function(){
        return(
            <div className="trialScore">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <label>创意和表达:</label>
                                <SelectComponent ref="creativeAndExpression" value={this.state.creativeAndExpression} contentData={configData.creativeAndExpression} />
                                <label>适应和引导:</label>
                                <SelectComponent ref="adaptAndLead" value={this.state.adaptAndLead} contentData={configData.adaptAndLead} />
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
    _submit : function () {
        let id1 = this.refs.creativeAndExpression.state.value - 0;
        let id2 = this.refs.adaptAndLead.state.value - 0;
        this.props.callback(id1, id2);
    }
});

export default ModalTryScore;