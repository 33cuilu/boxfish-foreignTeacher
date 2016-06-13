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
            nationality : "-1",
            timezone : "时区",
            cellphoneNumber : '',
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
                <SelectComponent contentData={configData.nationality} ref="nationality" onChange={(value)=>{this._getNationality(value)}}/>
                <SelectComponent contentData={configData.timezone} ref="timezone" onChange={(value)=>{this._getTimezone(value)}}/>
                <div className="field">
                    <input type="text" className="form-control" ref="cellphoneNumber" onChange={this._getCellphoneNumber} style={{width:"150px"}} placeholder="手机号"/>
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
    _getNationality : function (index) {
        let newNationality = configData.nationality.id[index];
        this.setState({
            nationality : newNationality
        });
    },
    _getTimezone : function (index) {
        let newTime = configData.timezone.id[index];
        this.setState({
            timezone : newTime
        });
    },
    _getCellphoneNumber : function () {
        this.setState({
            cellphoneNumber : this.refs.cellphoneNumber.value
        });
    },
    _getEmail : function () {
        this.setState({
            email : this.refs.email.value
        });
    }
});

export default ContentInput;