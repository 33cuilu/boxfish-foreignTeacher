/**
 * Created by Tinna on 2015/05/08
 * cardCenter组件: 表示页面中除了左侧导航栏和上侧导航栏, 剩下的显示内容部分
 * */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../util/ajax.js';

//引入组件
import PageList from './page.js';

//引入样式
import '../less/changeTeacher.less';

var Data = require("../test/cardCenterData.json");
var nullTeacherInfo = Data[1];
var urlApi =  'http://192.168.77.195:8099/course/schedule/teacher/nomatch';

var ChangeTeacher = React.createClass({
    getInitialState : function (){
        return {
            totalPages : 1,
            curPage : 1,
            teacherInfoList : [],
            pageSize : 5,
            curURL : ''
        };
    },

    getData() {
        //做第一次查询,参数为: teacherID, Date, slotID, courseType, offset(第几页), limit(每页显示数据条数)
        let params = this.props.data;
        let testUrl = 'http://192.168.77.195:8099/course/schedule/teacher/nomatch?teachingType=1&Date=1460390400000&timeSlotId=1&teacherProperty=1&courseType=%E5%90%AC%E5%8A%9B&offset=0&limit=10';
        let myUrl = `${urlApi}?offset=0&limit=${this.state.pageSize}&teachingType=1&Date=${params.date}&timeSlotId=${params.slotId}&teacherId=&courseType=${params.courseType}`;
        Get({
            url : testUrl
        }).then(({code,message,data}) =>{
            console.log(data);
            if (data == null) {
                this.setState({
                    curPage: 1,
                    totalPage: 1,
                    curURL : testUrl,
                    teacherInfoList: []
                });
            } else {
                this.setState({
                    curURL: testUrl,
                    curPage: 1,
                    teacherInfoList: data.content
                });
            }
        }).catch((err) =>{
            console.log(err);
        });
    },

    componentDidUpdate : function () {
        // console.log("update modal");
        // let isLoad = this.props.recommend;
        // if(!isLoad)
        //     return;

    },
    render : function(){
        let teacherInfoList = this.state.teacherInfoList;
        let nullNum = this.state.pageSize - teacherInfoList.length;
        for(let i=0; i<nullNum ; i++)
            teacherInfoList.push(nullTeacherInfo);

        teacherInfoList = teacherInfoList.map((v,i) => {
            let selectable = <input type="radio" name="select-teacher" className={(v.teacherId == "") ? "invisible" : ""} ref={i} />;
            return (
                <tr key={i}>
                    <td>{selectable}</td>
                    <td>{v.teacherId}</td>
                    <td>{v.teachingType}</td>
                    <td>{v.teacherName}</td>
                    <td>{v.property}</td>
                    <td>{v.score}</td>
                </tr>
            );
        });

        return (
            <div className="modal fade changeTeacher" id="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">
                <div className="modal-dialog" aria-hidden="true">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">更换老师</h4>
                        </div>
                        <div className="modal-body">
                            <div className="body-top">
                                <select className="form-control input-left" ref="property">
                                    <option value="1">外部</option>
                                    <option value="2">内部</option>
                                </select>
                                <select className="form-control input-left" ref="type">
                                    <option value="0">未知</option>
                                    <option value="1">中教</option>
                                    <option value="2">外教</option>
                                </select>
                                <input className="form-control input input-left" ref="teaId" placeholder="请输入老师编号" type="text" />
                                <input className="form-control input input-left" ref="teaName" placeholder="请输入老师姓名" type="text" />
                                <button className="btn btn-primary input-left" onClick={this._search}>搜索</button>
                            </div>
                            <div className="tableContainer" ref="tableContainer"
                                 style={{overflow:"auto"}}>
                                <table className="table table-bordered"
                                       ref="table">
                                    <thead>
                                    <tr className="center aligned">
                                        <th></th>
                                        <th>编号</th>
                                        <th>老师</th>
                                        <th>老师类型</th>
                                        <th>属性</th>
                                        <th>老师评分</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teacherInfoList}
                                    </tbody>
                                </table>
                            </div>
                            <PageList className="changeTeacher-page" curPage={this.state.curPage} totalPages={this.state.totalPages}
                                      onFisrt={this._firstPage} onPre={this._prePage}
                                      onNext={this._nextPage} onLast={this._lastPage} />
                        </div>
                        <div className="modal-footer">
                            <div className="btns">
                                <button className="btn btn-primary input-left input-left1" onClick={this._submit}>确定</button>
                                <button className="btn btn-primary input-left" onClick={this._cancel}>取消</button>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this._refreshPage}>刷新</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _search : function () {
        let params = this.props.data;

        let timeSlotId = params.slotId;
        let teacherProperty = this.refs.property.options[this.refs.property.selectedIndex].value;
        let teachingType = this.refs.type.options[this.refs.type.selectedIndex].value;
        let teacherId = this.refs.teaId.value.trim();
        let teacherName = this.refs.teaName.value.trim();

        let myUrl = `${urlApi}?offset=0&limit=${this.state.pageSize}`;

        myUrl += (teacherId.length < 1)? "" : `&teacherId=${teacherId}`;
        myUrl += (teacherName.length < 1)? "" : `&teacherName=${teacherName}`;
        myUrl += `&timeSlotId=${timeSlotId}&teachingType=${teachingType}&teacherProperty=${teacherProperty}`;

        Get({
            url : myUrl
        }).then(({code,message,data})=> {
            if (data == null) {
                this.setState({
                    curPage: 1,
                    totalPage: 1,
                    curURL : myUrl,
                    teacherInfoList: []
                });
            } else {
                this.setState({
                    curURL: myUrl,
                    curPage: 1,
                    totalPage: data.totalPages,
                    teacherInfoList: data.content
                });
            }

        }).catch((err)=>{
            console.log(err);

        });
        event.stopPropagation();
    },

    _submit : function () {
    
    },
    _cancel : function () {
    
    },
    _refreshPage : function () {
        this._getPage(this.state.curPage);
    },

    _getPage : function (page) {
        let myUrl = this.state.curURL.repeat(/offset=0/,`offset=${page}`);

        Get({
            url : myUrl
        }).then(({code,message,data})=>{
            if(data == null )
                return;
            console.log(data.content);
            this.setState({
                curPage : page,
                teacherInfoList : data.content
            });
        }).catch((err)=>{
            console.log(err);
        });
    },
    _firstPage : function (){
        if(this.state.curPage ==1 )
            return;
        this._getPage(1);
    },
    _prePage : function (){
        if(this.state.curPage == 1)
            return;
        this._getPage(this.state.curPage - 1);
    },
    _nextPage : function(){
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.curPage + 1);
    },
    _lastPage : function(){
        if(this.state.curPage == this.state.totalPages)
            return;
        this._getPage(this.state.totalPages);
    }
});

export default ChangeTeacher;
