/**
 * Created by cuilu on 16/5/18.
 * 审核页
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import ModalExamine from './modalExamine.js';
import ContentInput from './../commons/contentInput.js';
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import ModalExamineAdopt from './modalExamineAdopt.js';
import ModalExamineAdopts from './modalExamineAdopts.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherExamine.less";

var configData = require('../../test/config.json');
var config = require('../../test/config.json');

var TeacherExamine = React.createClass({
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
                "loginDate" : "",
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "country" : v.nationality,
                "timeZone" : v.timezone,
                "telNum" : v.cellphoneNumber,
                "email" : v.email,
                "snack" : v.snack,
                "teachingExperience" : v.teachingExperience,
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
            <div className="teacherExamine">
                <ModalExamine />
                <ModalExamineAdopt ref="adopt"/>
                <ModalExamineAdopts ref="adopts"/>
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
                            <DataPicker ref="loginDate" name="注册日期"/>
                            <SelectComponent ref="snack" contentData={config.snacks} />
                            <SelectComponent ref="experience" contentData={config.experience} />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary">筛选</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.examineTable} callBackAdopt={this._arangeAdopt}
                           callBackInPond={this._arangePond} list={this.state.list} tableStyle={this.state.tableStyle}/>
                </div>
                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-default" onClick={this._arangePonds}>批量入池</button>
                        <button className="btn btn-default" onClick={this._arangeAdopts}>批量通过</button>
                        <div className="btn-right-select">
                            <label>零食:</label>
                            <SelectComponent ref="bottomSnack" contentData={config.snacks} />
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