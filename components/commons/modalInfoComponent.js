/**
 * Created by cuilu on 16/5/25.
 * 详情模态框body-footer部分
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './dataPicker.js';
import SelectComponent from './selectComponent.js';

var config = require("../../test/config.json");

var ModalInfoComponent = React.createClass({
    render : function(){
        return(
            <div className="ModalInfoComponent">
                <div className="field">
                    <label>试讲账号:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>学生账号:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>demo 课:</label>
                    <SelectComponent contentData={config.timeSlice} />
                </div>
                <div className="field">
                    <label>试讲时间:</label>
                    <DataPicker />
                </div>
            </div>
        );
    }
});

export default ModalInfoComponent;