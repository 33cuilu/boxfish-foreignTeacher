/**
 * Created by cuilu on 16/5/18.
 * 师资管理页
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import ModalManagement from './modalManagement.js';
import ContentInput from './../commons/contentInput.js';
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import ModalManagementFrozen from "./modalManagementFrozen.js";
import ModalManagementActivation from './modalManagementActivation.js';

//引入样式
import "../../less/teacherManagement.less";

var configData = require('../../test/config.json');
var config = require('../../test/config.json');

var TeacherManagement = React.createClass({
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
        return(
            <div className="teacherManagement">
                <ModalManagement />
                <ModalManagementFrozen />
                <ModalManagementActivation />
                <div className="forms" id="forms">
                    <div className="form row">
                        <ContentInput />
                        <div className="field more">
                            <span className="glyphicon glyphicon-triangle-bottom" id="btn" onClick={this._changeForm}></span>
                        </div>
                    </div>
                    <div className="form row" >
                        <DataPicker />
                        <div className="field">
                            <input type="text" className="form-control" placeholder="账号" />
                        </div>
                        <SelectComponent contentData={config.sex} />
                        <SelectComponent contentData={config.snacks} />
                        <SelectComponent contentData={config.city} />
                        <SelectComponent contentData={config.accountStatus} />
                        <div className="field">
                            <button className="btn btn-default">筛选</button>
                        </div>
                    </div>
                </div>

                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-default" onClick={this._arangeFrozen}>冻结</button>
                        <button className="btn btn-default" onClick={this._arangeActivation}>激活</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.managementTable} list={this.state.list} tableStyle={this.state.tableStyle}/>
                </div>
                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-default">分配账号</button>
                    </div>
                </div>
            </div>
        );
    },
    _arangeFrozen : function(){
        $(".modalManagementFrozen .modal").modal();
    },
    _arangeActivation : function(){
        $(".modalManagementActivation .modal").modal();
    }
});

export default TeacherManagement;
