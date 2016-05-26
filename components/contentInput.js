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
    render : function(){
        return(
            <div className="contentInput">
                <div className="field">
                    <input type="text" className="form-control" placeholder="First Name"/>
                </div>
                <div className="field">
                    <input type="text" className="form-control" placeholder="Last Name"/>
                </div>
                <SelectComponent contentData={config.country} />
                <SelectComponent contentData={config.timeZone} />
                <div className="field">
                    <input type="text" className="form-control" placeholder="手机号"/>
                </div>
                <div className="field">
                    <input type="text" className="form-control" placeholder="邮箱"/>
                </div>
            </div>
        );
    }
});

export default ContentInput;