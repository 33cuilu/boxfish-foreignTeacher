/**
 * Created by tinna on 16/6/06.
 *  面试页打分模态框
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import SelectComponent from './../commons/selectComponent.js';

//引入样式

var config = require("../../test/config.json");

var ModalScore = React.createClass({
    render : function(){
        return(
            <div className="modalScore">
                <div className="fade modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <label>创意和表达:</label>
                                <SelectComponent ref="creative" contentData={this.props.creative}/>
                                <label>适应和引导:</label>
                                <SelectComponent ref="adaptation" contentData={this.props.adaptation}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this._submit} data-dismiss="modal">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ModalScore;