/**
 * Created by cuilu on 16/5/20.
 * form表单重叠部分
 */

//引入插件
import React from 'react';

//引入组件
import SelectComponent from './selectComponent.js';

var configData = require("../../config/config.json");

var OtherSearch = React.createClass({
    getInitialState : function () {
        return {
            location : "-100",
            timezone : -100,
            channel : -100
        }
    },
    render : function(){
        return(
            <div className="contentInput">
                <SelectComponent contentData={configData.location} ref="location" onChange={(value)=>{this._getLocation(value)}}/>
                <SelectComponent contentData={configData.channel} ref="channel" onChange={(value)=>{this._getChannel(value)}}/>
                <SelectComponent contentData={configData.timezone} ref="timezone" onChange={(value)=>{this._getTimezone(value)}}/>
            </div>
        );
    },
    _getLocation : function (value) {
        this.setState({
            location : value
        });
    },
    _getTimezone : function (value) {
        this.setState({
            timezone : +value
        });
    },
    _getChannel : function (value) {
        this.setState({
            channel : +value
        });
    }
});

export default OtherSearch;