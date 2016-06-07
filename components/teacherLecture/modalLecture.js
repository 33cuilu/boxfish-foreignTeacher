/**
 * Created by cuilu on 16/5/18.
 * 试讲页
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import DataPicker from './../commons/dataPicker.js';
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';

//引入样式
import '../../less/modalLecture.less';

var configData = require("../../test/config.json");

var submitUrl = `http://${configData.ip}/web/teacherOralEn/updateTeacher`;

var ModalLecture = React.createClass({
    render : function(){
        let {interviewTime,gender} = this.props.info;
        return(
            <div className="modalLecture">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <DataPicker ref="interviewTime" value={interviewTime}/>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <SelectComponent ref="gender" value={gender} contentData={configData.sex} />
                                    </div>
                                    <BasicInfo value={this.props.info} ref="basicInfo" />
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
            "teacherId": null,
            "email": this.refs.basicInfo.state.email,
            "firstName": this.refs.basicInfo.state.firstName,
            "lastName": this.refs.basicInfo.state.lastName,
            "cellphoneNumber": this.refs.basicInfo.state.tel,
            "degree": this.refs.basicInfo.state.degree,
            "nationality": this.refs.basicInfo.state.nationality,
            "occupation": this.refs.basicInfo.state.occupation,
            "timezone": this.refs.basicInfo.state.timezone,
            "skype": this.refs.basicInfo.state.skype,
            "schoolCountry": this.refs.basicInfo.state.schoolCountry,
            "specialty": this.refs.basicInfo.state.specialty,
            "schoolingTime": this.refs.basicInfo.state.schoolingTime, //缺少schoolName和city
            "job": null,
            "snack": null,
            "spokenLevel": null,
            "triallectureStartTime": null,
            "triallectureEndTime": null,
            "demoCourse": null,
            "initAccount": null,
            "teachingExperience": 0,
            "schoolStartYear": null,
            "schoolEndYear": null,
            "triallectureTeacher": null,
            "triallectureStudent": null
        };
        Post({
            url : submitUrl,
            data : content
        }).then(
            ({data}) => {
                //显示更改后的数据
                this.props.callback(content);
            },
            ()=>{
                alert("安排试讲失败,可能因为网络原因,也可能是安排出现冲突!");
            }
        ).catch((err) => {
            console.log(err);
        });
    }
});

export default ModalLecture;