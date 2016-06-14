/**
 * Created by cuilu on 16/5/18.
 * 面试页详情模态框
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';

//引入样式
import '../../less/modalInterview.less';

var configData = require("../../config/config.json");
var submitUrl = `http://${configData.ip}/web/teacherOralEn/updateTeacher`;

var ModalInterview = React.createClass({
    render : function(){
        return(
            <div className="modalInterview">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>审核日期:</label>
                                        <DataPicker type="1" ref="auditTime" value={this.props.info.auditTime}/>
                                    </div>
                                    <BasicInfo value={this.props.info} ref="basicInfo"/>
                                    <div className="field">
                                        <label>教学经验:</label>
                                        <SelectComponent ref="teachingExperience" value={this.props.info.teachingExperience} contentData={configData.experienceDetail} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-primary" onClick={this._submit}>保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    },
    _submit : function () {
        let content = {
                "auditTime": this.refs.auditTime.state.value,
                "occupation": this.refs.basicInfo.state.occupation,
                "firstName": this.refs.basicInfo.state.firstName,
                "lastName": this.refs.basicInfo.state.lastName,
                "cellphoneNumber": this.refs.basicInfo.state.cellphoneNumber,
                "email": this.props.info.email,
                "nationality": this.refs.basicInfo.state.nationality,
                "timezone": this.refs.basicInfo.state.timezone,
                "city": this.refs.basicInfo.state.city,
                "degree": this.refs.basicInfo.state.degree,
                "school": this.refs.basicInfo.state.school,
                "schoolCountry": this.refs.basicInfo.state.schoolCountry,
                "specialty": this.refs.basicInfo.state.specialty,
                "schoolStartYear": this.refs.basicInfo.state.schoolStartYear,
                "schoolEndYear": this.refs.basicInfo.state.schoolEndYear,
                "skype": this.refs.basicInfo.state.skype,
                "teachingExperience": (this.refs.teachingExperience.state.value != -100)? +this.refs.teachingExperience.state.value : null
            },
            postHead = {
                url : submitUrl,
                data : content
            };
        console.log(content);
        Post(postHead).then(
            () => {
                //显示更改后的数据
                $(".modalInterview .modal").modal('hide');
                this.props.callback();
            },
            ()=>{
                alert("获取详情失败,请重试!");
            }
        ).catch((err) => {
            console.log(err);
        });
    }
});

export default ModalInterview;