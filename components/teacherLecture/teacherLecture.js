/**
 * Created by cuilu on 16/5/18.
 * 试讲页
 */

//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import ModalLecture from './modalLecture.js';
import ContentInput from './../commons/contentInput.js';
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import TryLesson from './tryLesson.js';
import ModalAdopt from './modalAdopt.js';
import ModalAdopts from './modalAdopts.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherLecture.less";

var configData = require('../../test/config.json');

var urlApi = 'http://192.168.0.162:8099/web/teacherOralEn/teacherStepList?';


var TeacherLecture = React.createClass({
    getInitialState : function () {
        return {
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            curURL : '',
            curRow : 0,
            reservationStatus : {
                arr : ["预约状态","已预约试讲","未预约试讲"], //预约状态
                id : ["","",""]  //国家ID
            },
            tableStyle : {
                tableSize : 10,
                hasCheckBox : true,
                hasOperate : true
            },
            list : [],
            selected : []
        };
    },
    render : function(){
        let rowContent = this.state.list[this.state.curRow];
        let tableList = this.state.list.map((v,i) => {
                let tryTime = v.triallectureStartTime ?
                    `${v.triallectureStartTime} - ${v.triallectureEndTime}`:
                    <button key={i} className="btn btn-default btn-xs" onClick={(e)=>{this._arangeTryLesson(i)}}>
                        安排试讲
                    </button> ;
                return {
                    "checkbox" : <input type="checkbox" onChange={(e)=>{this.select(e,i)}}/>,
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
                            <button className="btn btn-default btn-xs" onClick={this._arangeAdopt}>通过</button>
                            <button className="btn btn-default btn-xs" onClick={this._arangeInPond}>入池</button>
                            <a onClick={this._arangeMore}>详情</a>
                        </div>
                    )
                };
            });

        return(
            <div className="TeacherLecture">
                <ModalLecture />
                <TryLesson row={rowContent} callback={this.updateTime}/>
                <ModalAdopt />
                <ModalAdopts />
                <ModalInPond />
                <ModalInPonds />
                <div className="forms" id="forms">
                    <div className="input">
                        <div className="form row">
                            <ContentInput ref="contentInput"/>
                            <div className="field more">
                                <span className="glyphicon glyphicon-triangle-bottom" onClick={this._changeForm}></span>
                            </div>
                        </div>
                        <div className="form row extend">
                            <TimePicker ref="interviewTime" name="面试时间"/>
                            <TimePicker ref="tryLessonTime" name="试讲时间"/>
                            <SelectComponent ref="reservationStatus" contentData={configData.reservationState} />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary" onClick={this._search}>筛选</button>
                    </div>
                </div>

                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.lectureTable} list={tableList} tableStyle={this.state.tableStyle} selectAll={this.selectAll}/>
                </div>

                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-default btn-sm" onClick={this._arangeInPonds}>批量入池</button>
                        <button className="btn btn-default btn-sm" onClick={this._arangeAdopts}>批量通过</button>
                    </div>
                </div>
                <PageList curPage={this.state.curPage} totalPages={this.state.totalPages} onPre={this._prePage} onFirst={this._firstPage} onLast={this._lastPage} onNext={this._nextPage}/>
            </div>
        );
    },

    _changeForm : function(event) {
        $("#forms").toggleClass("forms-height");
    },
    select : function (e,index) {
        let selectList = this.state.select;
        selectList[index] = e.target.checked;
        this.setState({
            select : selectList
        });
    },
    selectAll : function (state) {
        let selectList = this.state.select.map(() => {return (state);});
        this.setState({
            select : selectList
        });
    },
    _search : function () {

         let firstName = this.refs.contentInput.state.firstName,
            lastName = this.refs.contentInput.state.lastName,
            country = this.refs.contentInput.state.country.cur,
            timeZone = this.refs.contentInput.state.timeZone.cur,
            telNum = this.refs.contentInput.state.telNum,
            email = this.refs.contentInput.state.email,
            interviewTime = this.refs.interviewTime.state.value.trim(),
            demoTime = this.refs.tryLessonTime.state.value.trim(),
            statu = this.state.reservationStatus.arr[this.refs.reservationStatus.state.index],
            myurl = `${urlApi}page=0&size=${this.state.pageSize}`;

        myurl += (firstName.length >0) ? `&firstName=${firstName}` : '';
        myurl += (lastName.length >0) ? `&lastName=${lastName}` : '';
        myurl += (country != "全部") ? `&nationality=${country}` : '';
        myurl += (timeZone != "全部") ? `&timeZone=${timeZone}` : '';
        myurl += (telNum.length >0) ? `&cellphoneNumber=${telNum}`: '';
        myurl += (email.length >0) ? `&email=${email}`: '';
        myurl += (interviewTime.length >0) ? `&interviewTime=${interviewTime}`: '';
        myurl += (demoTime.length >0) ? `&demoTime=${demoTime}`: '';
        myurl += (statu.length >0) ? `&reservationStatu=${statu}`: '';

        console.log(myurl);
        let testurl = `${urlApi}page=0&size=10`;
        Get({
            url : testurl
        }).then(({code,message,data})=> {
            if (data == null) {
                this.setState({
                    curPage: 1,
                    totalPages: 1,
                    curURL : myurl,
                    list: []
                });
            } else {
                let selectList = new Array(data.content.length);
                for(let i=0; i<selectList.length; i++){
                    selectList[i] = false;
                }
                this.setState({
                    curURL: myurl,
                    curPage: 1,
                    totalPages: data.totalPages,
                    list: data.content,
                    select : selectList
                });
            }
        }).catch((err)=>{
            console.log(err);
        });

    },
    updateTime : function (start,end) {
        let index = this.state.curRow;
        let line = this.state.list[index];
        line.triallectureStartTime = start;
        line.triallectureEndTime = end.substr(-8,8);
        let newList = [].concat(this.state.list.slice(0,index), line, this.state.list.slice(index + 1));
        this.setState({
            list : newList
        });
        console.log(this.state.list);
    },
    _getPage : function (page) {
        let myurl = this.state.curURL.replace(/page=0/,`page=${page-1}`);
        Get({
            url : myurl
        }).then(({code,message,data})=>{
            if(data == null )
                return;
            this.setState({
                curPage : page,
                list : data.content
            });
        }).catch((err)=>{
            console.log(err);
        });
    },
    _prePage : function () {
        if(this.state.curPage == 1)
            return;
        this._getPage(this.state.curPage - 1);
    },
    _firstPage : function () {
        if(this.state.curPage == 1)
            return;
        this._getPage(1);
    },
    _lastPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.totalPages);
    },
    _nextPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.curPage + 1);
    },
    _arangeTryLesson : function(i){
        this.setState({
            curRow : i
        });
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