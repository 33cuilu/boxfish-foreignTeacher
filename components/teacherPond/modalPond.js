/**
 * Created by cuilu on 16/5/18.
 * 池子页详情模态框
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入插件
import SelectComponent from './../commons/selectComponent.js';

//引入样式
import '../../less/modalPond.less';

var config = require("../../test/config.json");

var ModalPond = React.createClass({
    render : function(){
        return(
            <div className="modalPond">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>审核时间:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>First Name:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>手机号:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>Last Name:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>邮箱:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>职业:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>Skype ID:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>时区:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>城市:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>学历:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>学校名称:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>学校所在国家:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>专业:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>在校时间:</label>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>创意和表达:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>适应和引导:</label>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>国家级别:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>零食:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>口语水平:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>教学经验:</label>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="modal-body-footer">
                                    <div className="field">
                                        <label>试讲账号:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>学生账号:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>demo 课:</label>
                                        <p></p>
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="modal-body-remarks">
                                    <label>入池理由:</label>
                                    <textarea rows="4" readOnly="readonly"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ModalPond;