/**
 * Created by cuilu on 16/5/18.
 * 池子页
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import ModalPond from './modalPond.js';
import ContentInput from './../commons/contentInput.js';
import DataPicker from './../commons/dataPicker.js';
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';

//引入样式
import "../../less/teacherPond.less";

var configData = require('../../test/config.json');
var config = require('../../test/config.json');

var TeacherPond = React.createClass({
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
            let tryTime = v.triallectureStartTime ?
                `${v.triallectureStartTime} - ${v.triallectureEndTime}`:
                <button key={i} className="btn btn-default btn-xs" onClick={(e)=>{this._arangeTryLesson(i)}}>
                    安排试讲
                </button> ;
            return {
                "checkbox" : <input type="checkbox" />,
                "teacherId" : v.teacherId,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "country" : v.nationality,
                "timeZone" : v.timezone,
                "telNum" : v.cellphoneNumber,
                "email" : v.email,
                "triallectureTime" : tryTime,
                "operate" : (
                    <div>
                        <button className="btn btn-default btn-xs" onClick={this._arangeAdopt}>捕捞</button>
                        <a onClick={this._arangeMore}>详情</a>
                    </div>
                )
            };
        });
        return(
            <div className="TeacherLecture">
                <ModalPond />
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
                            <DataPicker ref="checkDate" name="审核日期"/>
                            <TimePicker ref="interviewTime" name="面试时间"/>
                            <TimePicker ref="tryTime" name="试讲时间"/>
                            <SelectComponent ref="snack" contentData={config.snacks} />
                            <SelectComponent ref="notPass" contentData={config.notPass} />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary">筛选</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.pondTable} list={tableList} tableStyle={this.state.tableStyle}/>
                </div>
            </div>
        );
    }
});

export default TeacherPond;