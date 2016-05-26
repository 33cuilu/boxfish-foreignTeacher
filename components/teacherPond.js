/**
 * Created by cuilu on 16/5/18.
 * 池子页
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../util/ajax.js';

//引入组件
import ModalPond from './modalPond.js';
import ContentInput from './contentInput.js';
import DataPicker from './dataPicker.js';
import SelectComponent from './selectComponent.js';
import Table from './table.js';

//引入样式
import "../less/teacherPond.less";

var configData = require('../test/config.json');
var config = require('../test/config.json');

var TeacherPond = React.createClass({
    _changeForm : function(event) {
        $("#forms").toggleClass("forms-height");
    },
    render : function(){
        return(
            <div className="TeacherLecture">
                <ModalPond />
                <div className="forms" id="forms">
                    <div className="form row">
                        <ContentInput />
                        <div className="field more">
                            <span className="glyphicon glyphicon-triangle-bottom" onClick={this._changeForm}></span>
                        </div>
                    </div>
                    <div className="form row">
                        <DataPicker />
                        <DataPicker />
                        <DataPicker />
                        <SelectComponent contentData={config.snacks} />
                        <SelectComponent contentData={config.notPass} />
                        <div className="field">
                            <button className="btn btn-default">筛选</button>
                        </div>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.pondTable} />
                </div>
            </div>
        );
    }
});

export default TeacherPond;