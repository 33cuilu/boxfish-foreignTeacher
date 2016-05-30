/**
 * Created by cuilu on 16/5/18.
 * 教师管理页详情模态框
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import ModalComponent from './../commons/modalComponent.js';
import ModalContentComponent from './../commons/modalContentComponent';
import ModalInfoComponent from './../commons/modalInfoComponent.js';

//引入样式
import '../../less/modalLecture.less';

var config = require("../../test/config.json");

var ModalManagement = React.createClass({
    render : function(){
        return(
            <div className="modalManagement">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>注册日期:</label>
                                        <DataPicker />
                                    </div>
                                    <div className="field">
                                        <label>审核时间:</label>
                                        <DataPicker />
                                    </div>
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <DataPicker />
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <DataPicker />
                                    </div>
                                    <ModalComponent />
                                    <div className="field">
                                        <label>职业:</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="field">
                                        <label>综合评分:</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <ModalContentComponent />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-primary">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

export default ModalManagement;