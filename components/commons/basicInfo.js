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
        return {
            firstName : '',
            lastName : '',
            cellphoneNumber : '',
            email : '',
            degree : -1,
            school : '',
            schoolingTime : '',
            schoolCountry : -1,
            specialty : -1,
            occupation : -1,
            skype : '',
            nationality : -1,
            timezone : -100,
            city : ''
        };
    },
    componentWillReceiveProps : function (nextProps) {
        let info = nextProps.value;
        this.setState({
            firstName: info.firstName,
            lastName: info.lastName,
            cellphoneNumber: info.cellphoneNumber,
            email: info.email,
            degree: info.degree,
            school: info.school,
            schoolingTime: info.schoolingTime,
            schoolCountry: info.schoolCountry,
            specialty: info.specialty,
            occupation: info.occupation,
            skype: info.skype,
            nationality: info.nationality,
            timezone: info.timezone,
            city: info.city
        });

    },
    render : function(){
        let info = this.state;
        if(!info){
            info = {};
        }
        return(
            <div className="basicInfo">
                <div className="field">
                    <label>First Name:</label>
                    <input type="text" className="form-control" ref="firstName" value={info.firstName||''} onChange={this._changeFirstName}/>
                </div>
                <div className="field">
                    <label>手机号:</label>
                    <input type="text" className="form-control" ref="cellphoneNumber" value={info.cellphoneNumber||''} onChange={this._changeTel}/>
                </div>
                <div className="field">
                    <label>Last Name:</label>
                    <input type="text" className="form-control" ref="lastName" value={info.lastName||''} onChange={this._changeLastName}/>
                </div>
                <div className="field">
                    <label>邮箱:</label>
                    <label>{info.email}</label>
                </div>
                <div className="field">
                    <label>学历:</label>
                    <SelectComponent contentData={configData.degree} value={info.degree||''} onChange={(index)=>{this._changeDegree(index)}}/>
                </div>
                <div className="field">
                    <label>学校名称:</label>
                    <input type="text" className="form-control" ref="school" value={info.school||''} onChange={this._changeSchoolName}/>
                </div>
                <div className="field">
                    <label>在校时间:</label>
                    <DataPicker ref="schoolingTime" value={info.schoolingTime||''} onChange={(value)=>{this._changeSchoolingTime(value)}}/>
                </div>
                <div className="field">
                    <label>学校所在国家:</label>
                    <SelectComponent ref="schoolCountry" contentData={configData.nationality} value={info.schoolCountry||''} onChange={(index)=>{this._changeSchoolCountry(index)}}/>
                </div>
                <div className="field">
                    <label>专业:</label>
                    <input type="text" className="form-control" ref="specialty" value={info.specialty||''} onChange={this._changeSpecialty}/>
                </div>
                <div className="field">
                    <label>职业:</label>
                    <input type="text" className="form-control" ref="occupation" value={info.occupation||''} onChange={this._changeOccupation}/>
                </div>
                <div className="field">
                    <label>Skype ID:</label>
                    <input type="text" className="form-control" ref="skype" value={info.skype||''} onChange={this._changeSkype}/>
                </div>
                <div className="field">
                    <label>国家:</label>
                    <SelectComponent contentData={configData.nationality} value={info.nationality||''} onChange={(index)=>{this._changeCountry(index)}}/>
                </div>
                <div className="field">
                    <label>时区:</label>
                    <SelectComponent contentData={configData.timezone} value={info.timezone||''} onChange={(index)=>{this._changeTimezone(index)}}/>
                </div>
                <div className="field">
                    <label>城市:</label>
                    <input type="text" className="form-control" ref="city" value={info.city||''} onChange={this._changeCity}/>
                </div>
            </div>
        );
    },
    _changeFirstName : function () {
        let firstName = this.refs.firstName.value;
        this.setState({
            firstName : firstName
        });
    },
    _changeTel : function () {
        let tel = this.refs.cellphoneNumber.value;
        this.setState({
            tel : tel
        });
    },
    _changeLastName : function () {
        this.setState({
            lastName : this.refs.lastName.value
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
            school : this.refs.school.value
        });
    },
    _changeSchoolingTime : function (value) {
        this.setState({
            schoolingTime : value
        });
    },
    _changeSchoolCountry : function (index) {
        let schoolCountry = configData.nationality.id[index];
        this.setState({
            schoolCountry : schoolCountry
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
        let nationality = configData.nationality.id[index];
        this.setState({
            nationality : nationality
        });
    },
    _changeTimezone : function (index) {
        let timezone = configData.timezone.id[index];
        this.setState({
            timezone : timezone
        });
    },
    _changeCity : function () {
        this.setState({
            city : this.refs.city.value
        });
    }
});

export default BasicInfo;