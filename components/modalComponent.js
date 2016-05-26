/**
 * Created by cuilu on 16/5/25.
 * 详情模态框body-header部分
 */

//引入插件
import React from 'react';

//引入组件
import DataPicker from './dataPicker.js';
import SelectComponent from './selectComponent.js';

var config = require("../test/config.json");

var ModalComponent = React.createClass({
    render : function(){
        return(
            <div className="modalComponent">
                <div className="field">
                    <label>First Name:</label>
                    <input type="text" className="form-control" />
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
                    <label>性别:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>Skype ID:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>时区:</label>
                    <SelectComponent contentData={config.timeZone} />
                </div>
                <div className="field">
                    <label>城市:</label>
                    <SelectComponent contentData={config.city} />
                </div>
                <div className="field">
                    <label>学历:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>学校名称:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>学校所在国家:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>专业:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="field">
                    <label>在校时间:</label>
                    <DataPicker />
                </div>
                <div className="field">
                    <label>教学经验:</label>
                    <SelectComponent contentData={config.experience} />
                </div>
            </div>
        );
    }
});

export default ModalComponent;