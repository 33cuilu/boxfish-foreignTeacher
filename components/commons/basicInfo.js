/**
 * Created by cuilu on 16/5/25.
 * 详情模态框body-header部分
 */

//引入插件
import React from 'react';

//引入组件
import SelectComponent from './selectComponent.js';
import DataPicker from './dataPicker.js';

var configData = require("../../test/config.json");

var BasicInfo = React.createClass({
    getInitialState : function () {
        let info = this.props.value || {};
        return {
            firstName : info.firstName,
            LastName : info.lastName,
            tel : info.cellphoneNumber,
            email : info.email,
            degree : info.degree,
            schoolName : info.schoolName,
            schoolingTime : info.schoolingTime,
            schoolCountry : info.schoolCountry,
            specialty : info.specialty,
            occupation : info.occupation,
            skype : info.skype,
            nationality : info.nationality,
            timezone : info.timezone,
            city : info.city
        }
    },
    render : function(){
        let info = this.props.value;
        if (!info)
            info = {};
        return(
            <div className="basicInfo">
                <div className="field">
                    <label>First Name:</label>
                    <input type="text" ref="firstName" className="form-control" value={info.firstName} onChange={this._changeFirstName}/>
                </div>
                <div className="field">
                    <label>手机号:</label>
                    <input type="text" className="form-control" value={info.cellphoneNumber} onChange={this._changeTel}/>
                </div>
                <div className="field">
                    <label>Last Name:</label>
                    <input type="text" className="form-control" value={info.lastName} onChange={(e)=>{this._change(lastName)}}/>
                </div>
                <div className="field">
                    <label>邮箱:</label>
                    <input type="text" className="form-control" value={info.email} onChange={this._changeEmail}/>
                </div>
                <div className="field">
                    <label>学历:</label>
                    <SelectComponent contentData={configData.degree} value={info.degree} onChange={(index)=>{this._changeDegree(index)}}/>
                </div>
                <div className="field">
                    <label>学校名称:</label>
                    <input type="text" className="form-control" value={info.schoolName} onChange={this._changeSchoolName}/>
                </div>
                <div className="field">
                    <label>在校时间:</label>
                    <DataPicker ref="schoolingTime" value={info.schoolingTime} onChange={(value)=>{this._changeSchoolingTime(value)}}/>
                </div>
                <div className="field">
                    <label>学校所在国家:</label>
                    <SelectComponent ref="schoolCountry" contentData={configData.country} value={info.schoolCountry} onChange={(index)=>{this._changeSchoolCountry(index)}}/>
                </div>
                <div className="field">
                    <label>专业:</label>
                    <input type="text" className="form-control" value={info.specialty} onChange={this._changeSpecialty}/>
                </div>
                <div className="field">
                    <label>职业:</label>
                    <input type="text" className="form-control" value={info.occupation} onChange={this._changeOccupation}/>
                </div>
                <div className="field">
                    <label>Skype ID:</label>
                    <input type="text" className="form-control" value={info.skype} onChange={this._changeSkype}/>
                </div>
                <div className="field">
                    <label>国家:</label>
                    <SelectComponent contentData={configData.country} value={info.nationality} onChange={(index)=>{this._changeCountry(index)}}/>
                </div>
                <div className="field">
                    <label>时区:</label>
                    <SelectComponent contentData={configData.timeZone} value={info.timezone} onChange={(index)=>{this._changeTimeZone(index)}}/>
                </div>
                <div className="field">
                    <label>城市:</label>
                    <input type="text" className="form-control" value={info.city} onChange={(e)=>{this._change(city)}}/>
                </div>
            </div>
        );
    },
    _changeFirstName : function () {
        this.setState({
            firstName : this.refs.firstName.value
        });
    },
    _changeTel : function () {
        this.setState({
            tel : this.refs.cellphoneNumber.value
        });
    },
    _changeLastName : function () {
        this.setState({
            lastName : this.refs.lastName.value
        });
    },
    _changeEmail : function () {
        this.setState({
            email : this.refs.email.value
        });
    },
    _changeDegree : function (index) {
        let degree = configData.degree.id[index];
        this.setState({
            degree : degree
        });
    },
    _changeSchoolName : function () {
        this.setState({
            schoolName : this.refs.schoolName.value
        });
    },
    _changeSchoolingTime : function (value) {
        this.setState({
            schoolingTime : value
        });
    },
    _changeSchoolCountry : function (index) {
        let schoolCountry = configData.country.id[index];
        this.setState({
            city : schoolCountry
        });
    },
    _changeSpecialty : function () {
        this.setState({
            specialty : this.refs.specialty.value
        });
    },
    _changeOccupation : function () {
        this.setState({
            occupation : this.refs.occupation.value
        });
    },
    _changeSkype : function () {
        this.setState({
            skype : this.refs.skype.value
        });
    },
    _changeCountry : function (index) {
        let country = configData.country.id[index];
        this.setState({
            nationality : country
        });
    },
    _changeTimeZone : function (index) {
        let timezone = configData.timezone.id[index];
        this.setState({
            timeZone : timezone
        });
    },
    _changeCity : function () {
        this.setState({
            city : this.refs.city.value
        });
    }
});

export default BasicInfo;