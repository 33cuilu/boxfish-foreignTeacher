/**
 * Created by cuilu on 16/5/25.
 * 详情模态框body-header部分
 */

//引入插件
import React from 'react';

//引入组件
import SelectComponent from './selectComponent.js';
import DataPicker from './dataPicker.js';

var config = require("../../test/config.json");

var BasicInfo = React.createClass({
    render : function(){
        return(
            <div className="basicInfo">
                <div className="field">
                    <label>First Name:</label>
                    <input type="text" ref="firstName" className="form-control" />
                </div>
                <div className="field">
                    <label>手机号:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>Last Name:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>邮箱:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>学历:</label>
                    <SelectComponent contentData={config.degree} />
                </div>
                <div className="field">
                    <label>学校名称:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>在校时间:</label>
                    <DataPicker ref="schoolingTime"/>
                </div>
                <div className="field">
                    <label>学校所在国家:</label>
                    <SelectComponent ref="schoolCountry" contentData={config.country} />
                </div>
                <div className="field">
                    <label>专业:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>职业:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>Skype ID:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>国家:</label>
                    <SelectComponent contentData={config.country} />
                </div>
                <div className="field">
                    <label>时区:</label>
                    <SelectComponent contentData={config.timeZone} />
                </div>
                <div className="field">
                    <label>城市:</label>
                    <input type="text" className="form-control" />
                </div>
            </div>
        );
    },
    set : function (info) {
        this.refs.firstName.value = info.firstName;
    },
    get : function () {
        return {
            
        }
    }
});

export default BasicInfo;