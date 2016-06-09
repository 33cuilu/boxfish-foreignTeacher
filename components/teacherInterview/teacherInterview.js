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
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import ModalInterviewAdopt from './modalInterviewAdopt.js';
import ModalInPond from './../commons/modalInPond.js';
import ModalInPonds from './../commons/modalInPonds.js';

//引入样式
import "../../less/teacherInterview.less";

var configData = require('../../test/config.json');
var config = require('../../test/config.json');

var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList?`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail?`;
var inPondsUrl = `http://${configData.ip}/web/teacherOralEn/putPond`;
var passUrl = `http://${configData.ip}/web/teacherOralEn/updateStatePass`;
var genderUrl = `http://${configData.ip}/web/teacherOralEn/updateGener`;
var interviewTimeUrl = '';
var updateNationalLevelUrl = '';
var updateSnackUrl = '';
var updateSpokenLevelUrl = '';

var TeacherInterview = React.createClass({
    getInitialState : function () {
        return {
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            curURL : '',
            curRow : 0,
            curInfo : {},
            tableStyle : {
                tableSize : 10,
                hasCheckBox : true,
                hasOperate : true
            },
            list : [],
            selected : [],
            nationalLevel : -1,
            snack : -1,
            spokenLevel : -1
        };
    },
    componentDidMount : function () {
        //获取空列表
        let myurl = `${searchUrl}page=0&size=10`;
        Get({
            url : myurl
        }).then(
            ({data})=> {
                if (data == null) {
                    this.setState({
                        curURL : myurl
                    });
                } else {
                    let selectList = new Array(data.content.length);
                    for(let i=0; i<selectList.length; i++){
                        selectList[i] = false;
                    }
                    this.setState({
                        curURL: myurl,
                        totalPages: data.totalPages,
                        list: data.content,
                        select : selectList
                    });
                }
            },
            ()=> {
                alert("查询失败!");
                this.setState({
                    curURL : myurl
                });
            }
        ).catch((err)=>{
            console.log(err);
        });
    },
    render : function(){
        let tableList = this.state.list.map((v,i) => {
            return {
                "checkbox" : <input type="checkbox" />,
                "auditTime" : v.auditTime,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "country" : v.nationality,
                "timeZone" : v.timezone,
                "telNum" : v.cellphoneNumber,
                "email" : v.email,
                "nationalityLevel" : v.nationalityLevel,
                "gender" : <SelectComponent contentData={config.sex} value={v.gender} onChange={(index)=>{this._updateGender(i,index)}}/>,
                "snack" : v.snack,
                "spokenLevel" : v.spokenLevel,
                "teachingExperience" : v.teachingExperience,
                "interviewTime" : <DataPicker onChange={(date)=>{this._updateInterviewTime(i,date)}}/>,
                "operate" : (
                    <div>
                        <button className="btn btn-default btn-xs" onClick={(e)=>{this._arangeAdopt(i)}}>通过</button>
                        <button className="btn btn-default btn-xs" onClick={(e)=>{this._arangeInPond(i)}}>入池</button>
                        <a onClick={(e)=>{this._arangeMore(i)}}>详情</a>
                    </div>
                )
            };
        });
        return(
            <div className="TeacherInterview">
                <ModalInterview info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}}/>
                <ModalInterviewAdopt callback={this.adopt}/>
                <ModalInPond callback={this.inPonds}/>
                <ModalInPonds callback={this.inPonds}/>
                <div className="forms" id="forms">
                    <div className="input">
                        <div className="form row">
                            <ContentInput ref="contentInput"/>
                            <div className="field more">
                                <span className="glyphicon glyphicon-triangle-bottom" onClick={this._changeForm}></span>
                            </div>
                        </div>
                        <div className="form row">
                            <SelectComponent ref="gender" contentData={config.sex} />
                            <SelectComponent ref="spokenLevel" contentData={config.spokenLevel} />
                            <SelectComponent ref="snack" contentData={config.snacks} />
                            <SelectComponent ref="nationalLevel" contentData={config.nationalLevel} />
                            <DataPicker ref="checkDate" name="审核日期"/>
                            <TimePicker ref="interviewTime" name="面试时间"/>
                            <SelectComponent ref="experience" contentData={config.experience} />
                            <SelectComponent ref="reservationInterview" contentData={config.reservationInterview} />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary" onClick={this._search}>筛选</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table ref="table" contentData={configData.interviewTable} list={tableList} tableStyle={this.state.tableStyle} selectAll={this.selectAll}/>
                </div>
                <div className="main-btn">
                    <div className="btn-right">
                        <button className="btn btn-default btn-sm" onClick={this._arangeInPonds}>批量入池</button>
                        <div className="btn-right-select">
                            <label>国家级别</label>
                            <SelectComponent size="small" contentData={config.nationalLevel} onChange={(index)=>{this.setState({nationalLevel : index})}}/>
                            <button className="btn btn-default btn-sm" onClick={(e)=>{this._edit("nationalLevel")}}>确定</button>
                        </div>
                        <div className="btn-right-select">
                            <label>零食</label>
                            <SelectComponent size="small" contentData={config.snacks} onChange={(index)=>{this.setState({snack : index})}}/>
                            <button className="btn btn-default btn-sm" onClick={(e)=>{this._edit("snack")}}>确定</button>
                        </div>
                        <div className="btn-right-select">
                            <label>口语水平</label>
                            <SelectComponent size="small" contentData={config.spokenLevel} onChange={(index)=>{this.setState({spokenLevel : index})}}/>
                            <button className="btn btn-default btn-sm" onClick={(e)=>{this._edit("spokenLevel")}}>确定</button>
                        </div>
                    </div>
                </div>
                <PageList curPage={this.state.curPage} totalPages={this.state.totalPages} onPre={this._prePage} onFirst={this._firstPage} onLast={this._lastPage} onNext={this._nextPage}/>
            </div>
        );
    },
    _changeForm : function(event) {
        $("#forms").toggleClass("forms-extern-more");
    },
    _search : function () {
        let firstName = this.refs.contentInput.state.firstName,
            lastName = this.refs.contentInput.state.lastName,
            country = this.refs.contentInput.state.country,
            timezone = this.refs.contentInput.state.timeZone,
            telNum = this.refs.contentInput.state.telNum,
            email = this.refs.contentInput.state.email,
            gender = configData.sex.id[this.refs.gender.state.index],
            spokenLevel = configData.spokenLevel.id[this.refs.spokenLevel.state.index],
            snack = configData.snacks.id[this.refs.snack.state.index],
            nationalLevel = configData.nationalLevel.id[this.refs.nationalLevel.state.index],
            auditTimeStart = this.refs.checkDate.state.start,
            auditTimeEnd = this.refs.checkDate.state.end,
            interviewTimeStart = this.refs.interviewTime.state.start,
            interviewTimeEnd = this.refs.interviewTime.state.end,
            isHasInterviewTime = config.reservationInterview.id[this.refs.reservationInterview.state.index],
            teachingExperience = config.experience.id[this.refs.experience.state.index],
            myurl = `${searchUrl}page=0&size=${this.state.pageSize}`;

        myurl += (firstName.length >0) ? `&firstName=${firstName}` : '';
        myurl += (lastName.length >0) ? `&lastName=${lastName}` : '';
        myurl += (country != "-1") ? `&nationality=${country}` : '';
        myurl += (timezone != "时区") ? `&timezone=${timezone}` : '';
        myurl += (telNum.length >0) ? `&cellphoneNumber=${telNum}`: '';
        myurl += (email.length >0) ? `&email=${email}`: '';
        myurl += (gender != -1)? `&gender=${gender}`:'';
        myurl += (spokenLevel != -1)? `&spokenLevel=${spokenLevel}`:'';
        myurl += (snack != -1)? `&snack=${snack}`:'';
        myurl += (nationalLevel != -1)? `&nationalLevel=${nationalLevel}`:'';
        myurl += (auditTimeStart.length >0)? `&auditTimeStart=${auditTimeStart}&auditTimeEnd=${auditTimeEnd}`:'';
        myurl += (interviewTimeStart.length >0) ? `&interviewTimeStart=${interviewTimeStart}&interviewTimeEnd=${interviewTimeEnd}`: '';
        myurl += (isHasInterviewTime != -1)? `&isHasInterviewTime=${isHasInterviewTime}`: '';
        myurl += (teachingExperience != -1)? `&teachingExperience=${teachingExperience}`:'';

        console.log(myurl);
        Get({
            url : myurl
        }).then(
            ({data})=> {
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
                console.log(data);
            },
            ()=> {
                alert("查询失败!");
                this.setState({
                    curPage: 1,
                    totalPages: 1,
                    curURL : myurl,
                    list: []
                });
            }
        ).catch((err)=>{
            console.log(err);
        });

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
    _updateGender : function (i,index) {
        let email = this.state.list[i].email;
        let gender = configData.sex.id[index];
        Post({
            url : genderUrl,
            data : {
                "email": email,
                "gener": gender
            }
        }).then(
            () =>{
                let line = this.state.list[i];
                line.gender = gender;
                let newList = [].concat(this.state.list.slice(0,i), line, this.state.list.slice(i + 1));
                this.setState({
                    list : newList
                });
            },
            () =>{
                console.log("更改性别失败!");
            }
        ).catch(
            (err) =>{console.log(err);}
        );
    },
    _updateInterviewTime : function (i,date) {
        let email = this.state.list[i].email;
        Post({
            url : interviewTimeUrl,
            data : {
                "email": email,
                "interviewTime": date
            }
        }).then(
            () =>{
                let line = this.state.list[i];
                line.interviewTime = date;
                let newList = [].concat(this.state.list.slice(0,i), line, this.state.list.slice(i + 1));
                this.setState({
                    list : newList
                });
            },
            () =>{
                console.log("安排面试时间失败!");
            }
        ).catch(
            (err) =>{console.log(err);}
        );
    },
    _arangeAdopt : function(i){
        this.setState({
            curRow: i
        });
        $(".modalInterviewAdopt .modal").modal();
    },
    adopt : function () {
        let emails = [].concat(this.state.list[this.state.curRow].email);
        Post({
            url : passUrl,
            data : {
                "emails": emails,
                "stateStep":2
            }
        }).then(
            () => {
                $(".modalInterviewAdopt .modal").modal('hide');
                this._getPage(this.state.curPage);
            },
            () => {
                /*此处需要判断返回信息,决定提示信息*/
                alert("该教师得分不合格,不能通过!");
                alert("该教师性别为空,不能通过!");
            }).catch();
    },
    _arangeInPond : function(i){
        this.setState({
            curRow: i
        });
        $(".modalInPond .modal").modal();
    },
    _arangeInPonds : function(){
        $(".modalInPonds .modal").modal();
    },
    inPonds : function (num,reason) {
        let line = this.state.list[this.state.curRow];
        let emails = [];
        if(num == 1){
            emails.push(line.email);
        }else{
            for(let i=0; i<this.state.list.length; i++){
                if(this.state.selected[i] == true){
                    emails.push(this.state.list[i].email);
                }
            }
        }
        if(emails.length <=0){
            alert("请选中入池的教师!");
            return;
        }
        Post({
            url : inPondsUrl,
            data : {
                "emails": emails,
                "noPassReason": reason
            }
        }).then(
            ({code,data}) => {
                $(".modalInPond .modal").modal('hide');
                $(".modalInPonds .modal").modal('hide');
                this._getPage(this.state.curPage);
            },
            () => {
                alert("入池失败,请重试!");
            }).catch();
    },
    _arangeMore : function (i) {
        this.setState({
            curRow: i
        });
        let curEmail = this.state.list[i].email;
        Get({
            url : `${infoUrl}email=${curEmail}`
        }).then(
            ({data})=>{
                if(data){
                    this.setState({
                        curInfo : data
                    });
                    $(".modalInterview .modal").modal();
                }else{
                    alert("该用户的信息为空!");
                }
            },
            ()=>{
                alert("获取该用户的信息失败!")
            }
        ).catch((err)=>{
            console.log(err);
        });
    },
    _edit : function (attr) {
        let emails = [],
            myurl = '',
            data = '';
        for(let i=0; i<this.state.list.length; i++){
            if(this.state.selected[i] == true){
                emails.push(this.state.list[i].email);
            }
        }
        if(emails.length <=0){
            alert("请选中至少一个教师!");
            return;
        }
        switch (attr){
            case "nationalLevel" :
                myurl = updateNationalLevelUrl; data = this.state.nationalityLevel; break;
            case "snack" :
                myurl = updateSnackUrl; data = this.state.snack; break;
            default:
                myurl = updateSpokenLevelUrl; data = this.state.spokenLevel; break;
        }
        Post({
            url : myurl,
            data : {
                "emails": emails,
                "nationalLevel": data
            }
        }).then(
            () => {
                this._getPage(this.state.curPage);
            },
            () => {
                alert("修改失败,请重试!");
            }).catch();
    }
});

export default TeacherInterview;