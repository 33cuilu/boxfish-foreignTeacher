/**
 * Created by Tinna on 2015/05/08
 * cardCenter组件: 表示页面中除了左侧导航栏和上侧导航栏, 剩下的显示内容部分
 * */
//引入插件
import React from 'react';
import {Post,Get,transformArrayToObj} from '../util/ajax.js';

//引入组件
import PageList from './page.js';
import ChangeTeacher from './changeTeacher.js'

//引入样式
import '../less/cardCenter.less';

var Data = require("../test/cardCenterData.json");
var nullCardInfo = Data[0];

var urlApi =  'http://101.201.239.116:8080/backend/fishcard/list';

var cardCenter = React.createClass({
    getInitialState : function () {
        return {
            curStuId : '',
            curOrderId : '',
            curStartTime : '',
            curEndTime : '',
            curState : '',
            curURL : '',
            pageSize : 10,
            curPage : 1,
            totalPages : 1,
            isLoad : false,
            list : [],
            loadModal : false,
            modal : {}
        };
    },

    componentDidMount : function () {
        //初始化表格排序控件
        $(this.refs.table).tablesort();

        //初始化表格的日期选择控件
        $('#datePicker').daterangepicker();

        //初始化表格的滚动条
        $(this.refs.tableContainer).mCustomScrollbar({
            axis: "x",
            theme: "inset-3",
            scrollInertia : 1,
            mouseWheel : { enable : false }
        });
    },
    componentDidUpdate : function () {
        //初始化表格的滚动条
        $(this.refs.tableContainer).mCustomScrollbar({
            axis: "x",
            theme: "inset-3",
            scrollInertia : 1,
            mouseWheel : { enable : false }
        });
    },

    render : function () {

        let cardInfoList = this.state.list;
        let nullNum = this.state.pageSize - cardInfoList.length;
        for(let i=0; i<nullNum ; i++)
            cardInfoList.push(nullCardInfo);

        cardInfoList = cardInfoList.map( (v,i) =>{
            let time = (v.startTime == "") ? "" : `${v.startTime} ~ ${v.endTime}`;
            let operate = <a data-key={i} className={v.id==""?"invisible":""} style={{cursor : 'pointer'}} onClick={this._modal}>换老师</a>;
            return (
                <tr key={i}>
                    <td>{v.id}</td>
                    <td>{v.studentId}</td>
                    <td>{v.studentName}</td>
                    <td>{v.teacherId}</td>
                    <td>{v.teacherName}</td>
                    <td>{v.courseType}</td>
                    <td>{v.courseName}</td>
                    <td>{v.statusDesc}</td>
                    <td>{time}</td>
                    <td>{v.reason}</td>
                    <td>{v.orderCode}</td>
                    <td>{operate}</td>
                </tr>
            );
        });



        return (
            <div className="cardCenter">
            <ChangeTeacher ref="changeTeacherModal" data={this.state.modal} recommend={this.state.loadModal} setUnload={this.setUnload}/>

        <div className="form row" >
            <div className="field .col-md-2">
            <label>学生账号:</label>
        <input type="text" className="form-control" ref="stuId" placeholder="请填写学生账号" />
        </div>
        <div className="field .col-md-2">
            <label>订单号:</label>
            <input type="text" className="form-control" ref="orderId" placeholder="请填写订单号"/>
        </div>

        <div className="field .col-md-3" >
            <label>上课时间: </label>
            <div className="inline fields" style={{position:'relative', width:'220px'}}>
                <input type="text" className="form-control" id="datePicker" value=''
                       style={{paddingLeft:'30px'}} ref="time"/>
                <i className="glyphicon glyphicon-calendar"
                style={{position:'absolute',left:'10px',top:'8px'}}></i>
            </div>
         </div>

                <div className="field .col-md-1">
                <label>状态</label>
                <select className="form-control" id="select" ref="state">
                <option value="00">全部</option>
                <option value="10">创建</option>
                <option value="20">分配课程</option>
                <option value="21">分配教师</option>
                <option value="30">就绪</option>
                <option value="31">等待学生上课应答</option>
                <option value="32">正在上课</option>
                <option value="40">完成</option>
                <option value="50">异常</option>
                </select>
                </div>
                <div className="field .col-md-1">
                <label>操作</label>
                <button className="btn btn-primary" style={{marginRight:'10px'}} onClick={this._search}>查询</button>
                </div>
                </div>

                <div className="tableContainer" ref="tableContainer">
                <table className="table table-bordered fill" ref="table">
                <thead>
                <tr>
                <th>鱼卡号</th>
                <th>学生账号</th>
                <th>学生姓名</th>
                <th>老师账号</th>
                <th>老师姓名</th>
                <th>课程类型</th>
                <th>课程名</th>
                <th>状态</th>
                <th>上课时间</th>
                <th>未完成原因</th>
                <th>所属订单</th>
                <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {cardInfoList}
            </tbody>
        </table>
        </div>

        <PageList curPage={this.state.curPage} totalPages={this.state.totalPages}
                  onFisrt={this._firstPage} onPre={this._prePage}
                  onNext={this._nextPage} onLast={this._lastPage} />


        </div>
        );
    },

    _modal: function (event) {
        let item = event.target.getAttribute("data-key");
        let cardInfo = this.state.list[item];
        let timestamp = Date.parse(cardInfo.startTime);
        this.setState({
            modal : {
                teachingType : 1,
                teacherId : null,
                date : timestamp,
                slotId : cardInfo.slotId,
                courseType : '听力'   //此处应为 cardInfo.courseType , 但暂时没有值, 用"听力"进行测试
            }
        });
        this.refs.changeTeacherModal.getData();
        $('#modal').modal({
            keyboard : false
        });
    },
    _search: function (event) {
        let stuId = this.refs.stuId.value.trim();
        let orderId = this.refs.orderId.value.trim();
        let time = this.refs.time.value;
        let startTime = time.substr(0,10);
        let endTime = time.substr(13,10);
        let state = this.refs.state.options[this.refs.state.selectedIndex].value;
        let myurl = `${urlApi}?page=0&size=${this.state.pageSize}`;
        if(stuId.length < 1 && orderId.length < 1 && time.trim().length < 1 && state == "00"){
            alert("请填写一个查找条件");
            return;
        }
        myurl += (stuId.length < 1)? "" : `&studentId=${stuId}`;
        myurl += (orderId.length < 1)? "" : `&orderCode=${orderId}`;
        myurl += (time.trim().length < 1)? "" : `&beginDate=${startTime}&endDate=${endTime}`;
        myurl += (state == "00")? "" : `&status=${state}`;

        Get({
            url : myurl
        }).then(({code,message,data})=> {
            if (data == null) {
                this.setState({
                    curPage: 1,
                    totalPages: 1,
                    curURL : myurl,
                    list: []
                });
            } else {
                this.setState({
                    curStuId: stuId,
                    curOrderId: orderId,
                    curStartTime: startTime,
                    curEndTime: endTime,
                    curState: state,
                    curURL: myurl,
                    curPage: 1,
                    totalPages: data.totalPages,
                    list: data.content
                });
            }

        }).catch((err)=>{
            console.log(err);

        });
        event.stopPropagation();
    },
    _getPage: function (page) {
        let myurl = this.state.curURL.replace(/page=0/,`page=${page-1}`);
        console.log(myurl);
        Get({
            url : myurl
        }).then(({code,message,data})=>{
            if(data == null )
                return;
            console.log(data.content);
            this.setState({
                curPage : page,
                list : data.content
            });
        }).catch((err)=>{
            console.log(err);
        });
    },
    _firstPage: function (event) {
        if(this.state.curPage ==1 )
            return;
        this._getPage(1);
        event.stopPropagation();
    },
    _lastPage: function(event){
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.totalPages);
        event.stopPropagation();
    },
    _prePage: function(event){
        if(this.state.curPage == 1)
            return;
        this._getPage(this.state.curPage - 1);
        event.stopPropagation();
    },
    _nextPage: function(event){
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.curPage + 1);
        event.stopPropagation();
    }
});

export default cardCenter;
