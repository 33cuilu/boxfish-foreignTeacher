/**
 * Created by cuilu on 16/5/18.
 * 池子页
 */

//引入插件
import React from 'react';
import {Post,Get,getById} from '../../util/ajax.js';

//引入组件
import ModalPond from './modalPond.js';
import ContentInput from './../commons/contentInput.js';
import DataPicker from './../commons/dataPicker.js';
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import PageList from './../commons/page.js';
import ModalToCheck from './modalToCheck.js';
import ModalToInterview from './modalToInterview.js';
import MadalToTryLesson from './modalToTryLesson.js';

//引入样式
import "../../less/teacherPond.less";

var configData = require('../../test/config.json');

var demoCourseUrl = `http://${configData.ip}/web/common/demoCourses/2`;
var searchUrl = `http://${configData.ip}/web/teacherOralEn/teacherStepList?`;
var infoUrl = `http://${configData.ip}/web/teacherOralEn/teacherDetail?`;
var fishUrl = ``;

var TeacherPond = React.createClass({
    /**
     * 设置组件的状态
     * @returns {{pageSize: number, totalPages: number, curPage: number, curURL: string, curRow: number, curInfo: {}, teacherAccounts: {arr: Array, id: Array}, studentAccounts: {arr: Array, id: Array}, timeSlot: {arr: Array, id: Array}, demoCourse: {arr: Array, id: Array, type: Array}, tableStyle: {tableSize: number, hasCheckBox: boolean, hasOperate: boolean}, list: Array, selected: Array}}
     * @private
     */
    getInitialState : function () {
        return {
            pageSize : 10,
            totalPages : 1,
            curPage : 1,
            curURL : '',
            curRow : 0,
            demoCourse : {
                arr: [],  //课程名称
                id: [],  //课程ID
                type: []  //课程类型
            },
            tableStyle: {
                tableSize : 10,
                hasCheckBox : true,
                hasOperate : true
            },
            list: [],
            selected : []
        };
    },

    /**
     * 组件第一次渲染时加载列表
     * @private
     */
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

        //获取demo课列表
        this._getCourse(demoCourseUrl);
    },

    /**
     * 渲染面试页面
     * @returns {XML}
     * @private
     */
    render : function(){
        let tableList = this.state.list.map((v,i) => {
            return {
                "checkbox" : <input type="checkbox" onChange={(e)=>{this.select(e,i)}}/>,
                "createTime" : v.createTime,
                "auditTime" : v.auditTime,
                "interviewTime" : v.interviewTime,
                "triallectureTime" : v.triallectureTime,
                "firstName" : v.firstName,
                "lastName" : v.lastName,
                "country" : v.nationality,
                "timeZone" : v.timezone,
                "telNum" : v.cellphoneNumber,
                "email" : v.email,
                "snack" : getById(configData.snacks, v.snack),
                "interviewScore" : v.interviewScore,
                "triallectureScore" : v.triallectureScore,
                "combinedScore" : v.combinedScore,
                "notPassType" : getById(configData.notPass, v.notPassType),
                "operate" : (
                    <div>
                        <button className="btn btn-primary btn-xs" onClick={(e)=>{this.arrangeish(i)}}>捕捞</button>
                        <button className="btn btn-link btn-xs" onClick={(e)=>{this.arangeMore(i)}}>详情</button>
                    </div>
                )
            };
        });
        return(
            <div className="TeacherLecture">
                <ModalPond info={this.state.curInfo} callback={(e)=>{this._getPage(this.state.curPage)}} course={this.state.demoCourse}/>
                <ModalToCheck callback={this.fish} />
                <ModalToInterview callback={this.fish}/>
                <MadalToTryLesson callback={this.fish}/>
                <div className="forms" id="forms">
                    <div className="input">
                        <div className="form row">
                            <ContentInput ref="contentInput"/>
                            <div className="field more">
                                <span className="glyphicon glyphicon-triangle-bottom" onClick={this._changeForm}></span>
                            </div>
                        </div>
                        <div className="form row">
                            <DataPicker ref="createTime" name="报名日期"/>
                            <DataPicker ref="auditTime" name="审核日期"/>
                            <TimePicker ref="interviewTime" name="面试时间"/>
                            <TimePicker ref="tryLessonTime" name="试讲时间"/>
                            <SelectComponent ref="snack" contentData={configData.snacks} />
                            <SelectComponent ref="notPass" contentData={configData.notPass} />
                        </div>
                    </div>
                    <div className="search">
                        <button className="btn btn-primary" onClick={this._search}>筛选</button>
                    </div>
                </div>
                <div className="tableContainer" ref="tableContainer">
                    <Table contentData={configData.pondTable} list={tableList} tableStyle={this.state.tableStyle}/>
                </div>
                <PageList curPage={this.state.curPage} totalPages={this.state.totalPages} onPre={this._prePage} onFirst={this._firstPage} onLast={this._lastPage} onNext={this._nextPage}/>
            </div>
        );
    },

    /**
     * 获取试讲课程类型列表
     * @param myUrl: 试讲课程类型接口地址
     * @private
     */
    _getCourse : function (myUrl) {
        Get({
            url : myUrl
        }).then(
            ({data}) =>{
                let newCourseArr = [],
                    newCourseId = [],
                    newCourseType = [];
                for(let i=0 ; i<data.length; i++){
                    newCourseArr.push(data[i].name);
                    newCourseId.push(data[i].courseId);
                    newCourseType.push(data[i].courseType);
                }
                this.setState({
                    demoCourse: {
                        arr: newCourseArr,
                        id : newCourseId,
                        type : newCourseType
                    }
                });
            },
            () => {
                alert("未能获取可选试讲课类型,不能安排试讲!");
            }
        ).catch((err) => {
            console.log(err);
        });
    },

    /**
     * 查询表单的展开动画
     * @private
     */
    _changeForm : function (event) {
        $("#forms").toggleClass("forms-extern-more");
    },

    /**
     * 点击"筛选"按钮,触发ajax请求,刷新列表
     * @private
     */
    _search : function () {
        let firstName = this.refs.contentInput.state.firstName,
            lastName = this.refs.contentInput.state.lastName,
            country = this.refs.contentInput.state.country,
            timeZone = this.refs.contentInput.state.timeZone,
            telNum = this.refs.contentInput.state.telNum,
            email = this.refs.contentInput.state.email,
            createTimeStart = this.refs.createTime.state.start,
            createTimeEnd = this.refs.createTime.state.end,
            auditTimeStart = this.refs.auditTime.state.start,
            auditTimeEnd = this.refs.auditTime.state.end,
            interviewTimeStart = this.refs.interviewTime.state.start,
            interviewTimeEnd = this.refs.interviewTime.state.end,
            tryTimeStart = this.refs.tryLessonTime.state.start,
            tryTimeEnd = this.refs.tryLessonTime.state.end,
            snack = configData.snacks.id[this.refs.snack.state.index],
            notPass = configData.notPass.id[this.refs.notPass.state.index],
            myurl = `${searchUrl}page=0&size=${this.state.pageSize}`;

        myurl += (firstName.length >0) ? `&firstName=${firstName}` : '';
        myurl += (lastName.length >0) ? `&lastName=${lastName}` : '';
        myurl += (country != -1) ? `&nationality=${country}` : '';
        myurl += (timeZone != "时区") ? `&timeZone=${timeZone}` : '';
        myurl += (telNum.length >0) ? `&cellphoneNumber=${telNum}`: '';
        myurl += (email.length >0) ? `&email=${email}`: '';
        myurl += (createTimeStart.length >0) ? `&createTimeStart=${createTimeStart}&createTimeEnd=${createTimeEnd}`: '';
        myurl += (auditTimeStart.length >0) ? `&auditTimeStart=${auditTimeStart}&auditTimeEnd=${auditTimeEnd}`: '';
        myurl += (interviewTimeStart.length >0) ? `&interviewTimeStart=${interviewTimeStart}&interviewTimeEnd=${interviewTimeEnd}`: '';
        myurl += (tryTimeStart.length >0) ? `&triallectureStartTimeStart=${tryTimeStart}&triallectureStartTimeEnd=${tryTimeEnd}`: '';
        myurl += (snack != -1) ? `&snack=${snack}`: '';
        myurl += (notPass != -1) ? `&notPassType=${notPass}`: '';

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

    /**
     * 不改变url,获取第page页数据
     * @param page: 表示需要获取的页面,从1开始
     * @private
     */
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

    /**
     * 跳转到上一页
     * @private
     */
    _prePage : function () {
        if(this.state.curPage == 1)
            return;
        this._getPage(this.state.curPage - 1);
    },

    /**
     * 跳转到首页
     * @private
     */
    _firstPage : function () {
        if(this.state.curPage == 1)
            return;
        this._getPage(1);
    },

    /**
     * 跳转到尾页
     * @private
     */
    _lastPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.totalPages);
    },

    /**
     * 跳转到下一页
     * @private
     */
    _nextPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.curPage + 1);
    },

    /**
     * 点击表格中的复选框,触发当前行选中事件
     * @param e: 点击事件
     * @param index: 选中的行在表格中的序号
     * @public (子组件"表格"调用)
     */
    select : function (e,index) {
        let selectList = this.state.select;
        selectList[index] = e.target.checked;
        this.setState({
            selected : selectList
        });
    },

    /**
     * 点击表头中的复选框,触发全选事件
     * @param state: 全选状态. false表示不选中,true表示选中
     * @public (子组件"表格"调用)
     */
    selectAll : function (state) {
        let selectList = this.state.list.map(() => {return (state);});
        this.setState({
            selected : selectList
        });
    },

    /**
     *
     * @param i
     * @public (子组件"表格"调用)
     */
    arrangeFish : function (i) {
        this.setState({
            curRow : i
        });
        switch(this.state.list[i].notPassType){
            case 1:
                $(".modalPoolToCheck .modal").modal();
                break;
            case 2:
                $(".modalPoolToInterview .modal").modal();
                break;
            case 3:
                $(".modalPoolToTryLesson .modal").modal();
                break;
            default:
                break;
        }
    },
    fish : function (stagestep) {
        let email = this.state.lsit[this.state.curRow].email;
        Post({
            url : fishUrl,
            data : {
                email : email,
                stateStep: stagestep
            }
        }).then(
            () => {
                this._getPage(this.state.curPage);
            },
            () => {
                alert("捕捞失败,请重试!");
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }
});

export default TeacherPond;