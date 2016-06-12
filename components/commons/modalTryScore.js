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

var configData = require("../../test/config.json");
var submitUrl = ``;

var ModalTryScore = React.createClass({
    render : function(){
        return(
            <div className="tryScore">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <label>创意和表达:</label>
                                <SelectComponent ref="creativeAndExpression" contentData={configData.creativeAndExpression} />
                                <label>适应和引导:</label>
                                <SelectComponent ref="adaptAndLead" contentData={configData.adaptAndLead} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this._submit} data-dismiss="modal">确定</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _submit : function () {
        this.props.callback(this.refs.creativeAndExpression.state.index, this.refs.adaptAndLead.state.index);
    }
});

export default ModalTryScore;