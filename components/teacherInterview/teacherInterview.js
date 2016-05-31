/**
 * Created by cuilu on 16/5/18.
 * 面试页
 */


//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import ModalInterview from './modalInterview.js';
import ContentInput from './../commons/contentInput.js';
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import ModalInterviewAdopt from './modalInterviewAdopt.js';
import ModalInterviewAdopts from './modalInterviewAdopts.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherInterview.less";

var configData = require('../../test/config.json');
var config = require('../../test/config.json');

var TeacherInterview = React.createClass({
    getInitialState : function () {
        return {
            tableStyle: {
                tableSize : 10,
                hasCheckBox : true,
                hasOperate : true
            },
            list: []
        };
    },
    _changeForm : function(event) {
        $("#forms").toggleClass("forms-height");
    },
    render : function(){
        let tableList = this.state.list.map((v,i) => {
            return {
                "checkbox" : <input type="checkbox" />,
                "checkDate" : "",
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "country" : v.nationality,
                "timeZone" : v.timezone,
                "telNum" : v.cellphoneNumber,
                "email" : v.email,
                "level" : "",
                "gender" : <SelectComponent ref="tableGender" contentData={config.sex} />,
                "snack" : v.snack,
                "spokenLevel" : v.spokenLevel,
                "teachingExperience" : v.teachingExperience,
                "interviewTime" : <DataPicker ref=""/>,
                "operate" : (
                    <div>
                        <button className="btn btn-default btn-xs" onClick={this._arangeAdopt}>通过</button>
                        <button className="btn btn-default btn-xs" onClick={this._arangeInPond}>入池</button>
                        <a onClick={this._arangeMore}>详情</a>
                    </div>
                )
            };
        });
        return(
            <div className="TeacherInterview">
                <ModalInterview />
                <ModalInterviewAdopt ref="adopt"/>
                <ModalInterviewAdopts ref="adopts"/>
                <ModalInPond ref="inPond"/>
                <ModalInPonds ref="inPonds"/>
                <div className="forms" id="forms">
                    <div className="input">
                        <div className="form row">
                            <ContentInput ref="contentInput"/>
                            <div className="field more">
                                <span className="glyphicon glyphicon-triangle-bottom" onClick={this._changeForm}></span>
                            </div>
                        </div>
                        <div className="form row">
                            <DataPicker ref="checkDate"/>
                            <SelectComponent contentData={config.snacks} />
                            <SelectComponent contentData={config.nativeLevel} />
                            <SelectComponent contentData={config.experience} />
                            <SelectComponent contentData={config.reservationState} />

                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-default">筛选</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.interviewTable} list={tableList} tableStyle={this.state.tableStyle}/>
                </div>
                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-default" onClick={this._arangePonds}>批量入池</button>
                        <button className="btn btn-default" onClick={this._arangeAdopts}>批量通过</button>
                        <div className="btn-right-select">
                            <label>国家级别</label>
                            <SelectComponent contentData={config.nationalLevel} />
                            <button className="btn btn-default">确定</button>
                        </div>
                        <div className="btn-right-select">
                            <label>零食</label>
                            <SelectComponent contentData={config.snacks} />
                            <button className="btn btn-default">确定</button>
                        </div>
                        <div className="btn-right-select">
                            <label>口语水平</label>
                            <SelectComponent contentData={config.nativeLevel} />
                            <button className="btn btn-default">确定</button>
                        </div>
                        <div className="btn-right-select">
                            <label>时区</label>
                            <SelectComponent contentData={config.timeZone} />
                            <button className="btn btn-default">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _arangeAdopt : function(){
        $(".modalInterviewAdopt .modal").modal();
    },
    _arangeAdopts : function(){
        $(".modalInterviewAdopts .modal").modal();
    },
    _arangePond : function(){
        $(".modalInPond .modal").modal();
    },
    _arangePonds : function(){
        $(".modalInPonds .modal").modal();
    }
});

export default TeacherInterview;