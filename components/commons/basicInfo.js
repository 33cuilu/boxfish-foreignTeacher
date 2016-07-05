/**
 * Created by cuilu on 16/5/25.
 * 详情模态框body-header部分
 */

//引入插件
import React from 'react';

//引入组件
import SelectComponent from './selectComponent.js';
import YearPicker from './yearPicker.js';

var configData = require("../../config/config.json");

var BasicInfo = React.createClass({
    getInitialState : function () {
        return {
            firstName : '',
            lastName : '',
            cellphoneNumber : '',
            email : '',
            degree : -100,
            school : '',
            schoolStartYear : 0,
            schoolEndYear : 0,
            schoolCountry : -100,
            specialty : '',
            occupation : '',
            skype : '',
            nationality : -100,
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
            schoolStartYear : info.schoolStartYear,
            schoolEndYear : info.schoolEndYear,
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
                    <input type="text" className="emailInfo form-control" ref="lastName" value={info.lastName||''} onChange={this._changeLastName}/>
                </div>
                <div className="field">
                    <label>邮箱:</label>
                    <input type="text" className="form-control" readOnly={true} value={info.email} />
                </div>
                <div className="field">
                    <label>学历:</label>
                    <SelectComponent contentData={configData.degree} value={info.degree||''} onChange={(value)=>{this._changeDegree(value)}}/>
                </div>
                <div className="field">
                    <label>学校名称:</label>
                    <input type="text" className="form-control" ref="school" value={info.school||''} onChange={this._changeSchoolName}/>
                </div>
                <div className="field">
                    <label>在校时间:</label>
                    <YearPicker ref="schoolingTime" start={info.schoolStartYear||''} end={info.schoolEndYear||''} onChange={this._changeSchoolingTime}/>
                </div>
                <div className="field">
                    <label>学校所在国家:</label>
                    <SelectComponent ref="schoolCountry" contentData={configData.nationality} value={info.schoolCountry||''} onChange={(value)=>{this._changeSchoolCountry(value)}}/>
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
                    <label>微信 or Skype ID:</label>
                    <input type="text" className="form-control" ref="skype" value={info.skype||''} onChange={this._changeSkype}/>
                </div>
                <div className="field">
                    <label>国家:</label>
                    <SelectComponent contentData={configData.nationality} value={info.nationality||''} onChange={(value)=>{this._changeCountry(value)}}/>
                </div>
                <div className="field">
                    <label>时区:</label>
                    <SelectComponent contentData={configData.timezone} value={info.timezone||''} onChange={(value)=>{this._changeTimezone(value)}}/>
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
        let cellphoneNumber = this.refs.cellphoneNumber.value;
        this.setState({
            cellphoneNumber : cellphoneNumber
        });
    },
    _changeLastName : function () {
        this.setState({
            lastName : this.refs.lastName.value
        });
    },
    _changeDegree : function (value) {
        this.setState({
            degree : value - 0  //将字符串转化为整数
        });
    },
    _changeSchoolName : function () {
        this.setState({
            school : this.refs.school.value
        });
    },
    _changeSchoolingTime : function (start,end) {
        this.setState({
            schoolStartYear : start,
            schoolEndYear : end
        });
    },
    _changeSchoolCountry : function (value) {
        this.setState({
            schoolCountry : value
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
    _changeCountry : function (value) {
        this.setState({
            nationality : value
        });
    },
    _changeTimezone : function (value) {
        this.setState({
            timezone : value - 0
        });
    },
    _changeCity : function () {
        this.setState({
            city : this.refs.city.value
        });
    }
});

export default BasicInfo;