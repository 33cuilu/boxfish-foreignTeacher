/**
 * Created by cuilu on 16/5/20.
 * form表单重叠部分
 */

//引入插件
import React from 'react';

//引入组件
import SelectComponent from './selectComponent.js';

var config = require("../test/config.json");

var ContentInput = React.createClass({
    getInitialState : function () {
        return {
            firstName : '',
            lastName : '',
            country :{
                cur : "全部",
                arr : ["全部","America","China","UK"], //国家名字
                id : []  //国家ID
            },
            timeZone : {
                cur : "全部",
                arr : ["全部","11","10","9","8","7","6","5","4","3","2","1","0","-11","-10","-9","-8","-7","-6","-5","-4","-3","-2","-1"],
                id : []  //时区ID
            },
            telNum : '',
            email : ''
        }
    },
    render : function(){
        return(
            <div className="contentInput">
                <div className="field">
                    <input type="text" className="form-control" ref="firstName" onChange={this._getFirstName} placeholder="First Name"/>
                </div>
                <div className="field">
                    <input type="text" className="form-control" ref="lastName" onChange={this._getLastName} placeholder="Last Name"/>
                </div>
                <SelectComponent contentData={config.country} ref="country" onChange={(index)=>{this._getCountry(index)}}/>
                <SelectComponent contentData={config.timeZone} ref="timeZone" onChange={(index)=>{this._getTimeZone(index)}}/>
                <div className="field">
                    <input type="text" className="form-control" ref="telNum" onChange={this._getTelNum} placeholder="手机号"/>
                </div>
                <div className="field">
                    <input type="text" className="form-control" ref="email" onChange={this._getEmail} placeholder="邮箱"/>
                </div>
            </div>
        );
    },
    _getFirstName : function () {
        this.setState({
            firstName : this.refs.firstName.value
        });
    },
    _getLastName : function () {
        this.setState({
            lastName : this.refs.lastName.value
        });
    },
    _getCountry : function (index) {
        let newCountry = this.state.country;
        newCountry.cur = newCountry.arr[index];
        this.setState({
            country : newCountry
        });
    },
    _getTimeZone : function (index) {
        let newTime = this.state.timeZone;
        newTime.cur = newTime.arr[index];
        this.setState({
            timeZone : newTime
        });
    },
    _getTelNum : function () {
        this.setState({
            telNum : this.refs.telNum.value
        });
    },
    _getEmail : function () {
        this.setState({
            email : this.refs.email.value
        });
    }
});

export default ContentInput;