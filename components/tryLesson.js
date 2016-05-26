/**
 * Created by cuilu on 16/5/24.
 *面试页安排试讲模态框
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../util/ajax.js';

//引入组件
import DataPicker from './dataPicker.js';
import SelectComponent from './selectComponent.js';

//引入样式
import "../less/tryLesson.less";

var config = require("../test/config.json");

var TryLesson = React.createClass({
    render : function(){
        return(
            <div className="tryLesson">
                <div className="fade modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="element">
                                    <label>试讲账号:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="element">
                                    <label>学生账号:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="element">
                                    <label>demo 课:</label>
                                    <SelectComponent contentData={config.course} />
                                </div>
                                <div className="element" style={{height:"65px"}}>
                                    <label>试讲时间:</label>
                                    <div className="try-time">
                                        <DataPicker style={{width:"170px"}} />
                                        <SelectComponent contentData={config.timeSlice} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default TryLesson;