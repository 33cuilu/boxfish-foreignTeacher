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

var configData = require("../../test/config.json");

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
                                        <DataPicker ref="createTime" value={info.createTime}/>
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
            "gender": configData.gender.id[this.refs.gender.state.index],
            "skype": this.refs.basicInfo.state.skype,
            "nationality": this.refs.basicInfo.state.nationality,
            "timezone": this.refs.basicInfo.state.timezone,
            "city": this.refs.basicInfo.state.city,
            "degree": this.refs.basicInfo.state.degree,
            "school": this.refs.basicInfo.state.school,
            "schoolCountry": this.refs.basicInfo.state.schoolCountry,
            "specialty": this.refs.basicInfo.state.specialty,
            "schoolTime": this.refs.basicInfo.state.schoolingTime,
            // "schoolStartYear": this.refs.basicInfo.state.schoolingTime.substr(0,4),
            // "schoolEndYear": this.refs.basicInfo.state.schoolingTime.substr(13,4),
            "teachingExperience": configData.experienceDetail.id[this.refs.teachingExperience.state.index],
            "occupation": null,
            "interviewTime": null,
            "job": null,
            "snack": null,
            "spokenLevel": null,
            "triallectureStartTime": null,
            "triallectureEndTime": null,
            "demoCourse": null,
            "initAccount": null,
            "schoolStartYear": null,
            "schoolEndYear": null,
            "triallectureTeacher": null,
            "triallectureStudent": null
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