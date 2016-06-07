/**
 * Created by cuilu on 16/5/20.
 * form表单重叠部分
 */

//引入插件
import React from 'react';

//引入组件
import SelectComponent from './selectComponent.js';

var configData = require("../../test/config.json");

var ContentInput = React.createClass({
    getInitialState : function () {
        return {
            firstName : '',
            lastName : '',
            country : -1,
            timeZone : -1,
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
                <SelectComponent contentData={configData.country} ref="country" onChange={(value)=>{this._getCountry(value)}}/>
                <SelectComponent contentData={configData.timeZone} ref="timeZone" onChange={(value)=>{this._getTimeZone(value)}}/>
                <div className="field">
                    <input type="text" className="form-control" ref="telNum" onChange={this._getTelNum} style={{width:"150px"}} placeholder="手机号"/>
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
        let newCountry = configData.country.id[index];
        this.setState({
            country : newCountry
        });
    },
    _getTimeZone : function (index) {
        let newTime = configData.timeZone.id[index];
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