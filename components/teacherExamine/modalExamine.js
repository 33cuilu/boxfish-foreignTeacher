/**
 * Created by cuilu on 16/5/18.
 * 审核页详情模态框
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';

//引入样式
import '../../less/modalExamine.less';

var configData = require("../../config/config.json");
var submitUrl = `http://${configData.ip}/web/teacherOralEn/updateTeacher`;

var ModalExamine = React.createClass({

    render : function(){
        let info = this.props.info || {};
        return(
            <div className="modalExamine">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>报名日期:</label>
                                        <DataPicker type="1" ref="createTime" value={info.createTime} sho/>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <SelectComponent ref="gender" value={info.gender} contentData={configData.gender} />
                                    </div>
                                    <BasicInfo value={info} ref="basicInfo"/>
                                    <div className="field">
                                        <label>教学经验:</label>
                                        <SelectComponent ref="teachingExperience" value={info.teachingExperience} contentData={configData.experienceDetail} />
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
            "createTime": this.refs.createTime.state.value,
            "firstName": this.refs.basicInfo.state.firstName,
            "lastName": this.refs.basicInfo.state.lastName,
            "cellphoneNumber": this.refs.basicInfo.state.cellphoneNumber,
            "email": this.props.info.email,
            "gender": +this.refs.gender.state.value,
            "skype": this.refs.basicInfo.state.skype,
            "nationality": this.refs.basicInfo.state.nationality,
            "timezone": this.refs.basicInfo.state.timezone,
            "city": this.refs.basicInfo.state.city,
            "degree": this.refs.basicInfo.state.degree,
            "school": this.refs.basicInfo.state.school,
            "schoolCountry": this.refs.basicInfo.state.schoolCountry,
            "specialty": this.refs.basicInfo.state.specialty,
            "occupation": this.refs.basicInfo.state.occupation,
            "schoolStartYear": this.refs.basicInfo.state.schoolStartYear,
            "schoolEndYear": this.refs.basicInfo.state.schoolEndYear,
            "teachingExperience": (this.refs.teachingExperience.state.value != -100)? +this.refs.teachingExperience.state.value : null
        };
        console.log(content);

        Post({
            url : submitUrl,
            data : content
        }).then(
            ({data}) => {
                //显示更改后的数据
                $(".modalExamine .modal").modal('hide');
                this.props.callback();
            },
            ()=>{
                alert("保存失败,可能因为网络原因,也可能是安排出现冲突!");
            }
        ).catch((err) => {
            console.log(err);
        });
    }
});

export default ModalExamine;