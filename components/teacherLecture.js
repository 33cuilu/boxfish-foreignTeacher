/**
 * Created by cuilu on 16/5/18.
 * 试讲页
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../util/ajax.js';

//引入组件
import ModalLecture from './modalLecture.js';
import ContentInput from './contentInput.js';
import DataPicker from './dataPicker.js';
import SelectComponent from './selectComponent.js';
import Table from './table.js';
import TryLesson from './tryLesson.js';
import ModalAdopt from './modalAdopt.js';
import ModalAdopts from './modalAdopts.js';
import ModalInPond from './modalInPond.js';
import ModalInPonds from './modalInPonds.js';

//引入样式
import "../less/teacherLecture.less";

var configData = require('../test/config.json');
var config = require("../test/config.json");

var TeacherLecture = React.createClass({
    _changeForm : function(event) {
        $("#forms").toggleClass("forms-height");
    },
    render : function(){
        return(
            <div className="TeacherLecture">
                <ModalLecture />
                <TryLesson />
                <ModalAdopt />
                <ModalAdopts />
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
                        <DataPicker />
                        <SelectComponent contentData={config.reservationState} />
                        <div className="field">
                            <button className="btn btn-default">筛选</button>
                        </div>
                    </div>
                </div>

                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.lectureTable} callBackFunc={this._arangeTryLesson}
                           callBackAdopt={this._arangeAdopt} callBackInPond={this._arangeInPond}
                           callBackMore={this._arangeMore} />
                </div>

                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-default" onClick={this._arangeInPonds}>批量入池</button>
                        <button className="btn btn-default" onClick={this._arangeAdopts}>批量通过</button>
                    </div>
                </div>
            </div>
        );
    },

    _arangeTryLesson : function(){
        $(".tryLesson .modal").modal();
    },
    _arangeAdopt : function(){
        $(".modalAdopt .modal").modal();
    },
    _arangeInPond : function(){
        $(".modalInPond .modal").modal();
    },
    _arangeMore : function(){
        $(".modalLecture .modal").modal();
    },
    _arangeInPonds : function(){
        $(".modalInPonds .modal").modal();
    },
    _arangeAdopts : function(){
        $(".modalAdopts .modal").modal();
    }
});

export default TeacherLecture;