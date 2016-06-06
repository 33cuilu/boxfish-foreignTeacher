/**
 * Created by cuilu on 16/5/25.
 * 详情模态框body-body重叠部分
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import SelectComponent from './selectComponent.js';

var config = require("../../test/config.json");

var AbilityInfo = React.createClass({
    render : function(){
        return(
            <div className="abilityInfo">
                <div className="field">
                    <label>国家级别:</label>
                    <SelectComponent contentData={config.country} /> <span>100</span>
                </div>
                <div className="field">
                    <label>零食:</label>
                    <SelectComponent contentData={config.snacks} /> <span>100</span>
                </div>
                <div className="field">
                    <label>口语水平:</label>
                    <SelectComponent contentData={config.spokenLevel} /> <span>100</span>
                </div>
                <div className="field">
                    <label>教学经验:</label>
                    <SelectComponent ref="teachingExperience" contentData={config.experienceDetail}/> <span>100</span>
                </div>
            </div>
        );
    }
});

export default AbilityInfo;