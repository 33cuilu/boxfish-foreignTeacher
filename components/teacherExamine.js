/**
 * Created by cuilu on 16/5/18.
 * 审核页
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../util/ajax.js';

//引入组件
import ModalExamine from './ModalExamine.js';
import ContentInput from './contentInput.js';
import DataPicker from './dataPicker.js';
import SelectComponent from './selectComponent.js';
import Table from './table.js';
import ModalExamineAdopt from './modalExamineAdopt.js';
import ModalExamineAdopts from './modalExamineAdopts.js';
import ModalInPond from './modalInPond.js';
import ModalInPonds from './modalInPonds.js';

//引入样式
import "../less/teacherExamine.less";

var configData = require('../test/config.json');
var config = require('../test/config.json');

var TeacherExamine = React.createClass({
    _changeForm : function(event) {
        $("#forms").toggleClass("forms-height");
    },
    render : function(){
        return(
            <div className="teacherExamine">
                <ModalExamine />
                <ModalExamineAdopt />
                <ModalExamineAdopts />
                <ModalInPond />
                <ModalInPonds />
                <div className="forms" id="forms">
                    <div className="form row">
                        <ContentInput />
                        <div className="field more">
                            <span className="glyphicon glyphicon-triangle-bottom" onClick={this._changeForm}></span>
                        </div>
                    </div>
                    <div className="form row">
                        <DataPicker />
                        <SelectComponent contentData={config.snacks} />
                        <SelectComponent contentData={config.experience} />
                        <div className="field">
                            <button className="btn btn-default">筛选</button>
                        </div>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.examineTable} callBackAdopt={this._arangeAdopt}
                           callBackInPond={this._arangePond} />
                </div>
                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-default" onClick={this._arangePonds}>批量入池</button>
                        <button className="btn btn-default" onClick={this._arangeAdopts}>批量通过</button>
                        <div className="btn-right-select">
                            <label>零食</label>
                            <SelectComponent contentData={config.snacks} />
                            <button className="btn btn-default">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _arangeAdopt : function(){
        $(".modalExamineAdopt .modal").modal();
    },
    _arangeAdopts : function(){
        $(".modalExamineAdopts .modal").modal();
    },
    _arangePond : function(){
        $(".modalInPond .modal").modal();
    },
    _arangePonds : function(){
        $(".modalInPonds .modal").modal();
    }
});

export default TeacherExamine;