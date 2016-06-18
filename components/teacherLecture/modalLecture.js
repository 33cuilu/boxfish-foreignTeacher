/**
 * Created by cuilu on 16/5/18.
 * 试讲页
 */

//引入插件
import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';

//引入组件
import TimePicker from './../commons/timePicker.js';
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';

//引入样式
import '../../less/modalLecture.less';

var configData = require("../../config/config.json");

var submitUrl = `http://${configData.ip}/web/teacherOralEn/updateTeacher`;

var ModalLecture = React.createClass({
    render : function(){
        return(
            <div className="modalLecture">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <input type="text" className="readOnly" readOnly={true} value={this.props.info.interviewTime}/>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <SelectComponent ref="gender" value={this.props.info.gender} contentData={configData.gender} />
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
                "gender": this.refs.gender.state.value - 0,
                "email": this.props.info.email,
                "firstName": this.refs.basicInfo.state.firstName,
                "lastName": this.refs.basicInfo.state.lastName,
                "cellphoneNumber": this.refs.basicInfo.state.cellphoneNumber,
                "degree": this.refs.basicInfo.state.degree,
                "nationality": this.refs.basicInfo.state.nationality,
                "occupation": this.refs.basicInfo.state.occupation,
                "timezone": this.refs.basicInfo.state.timezone,
                "skype": this.refs.basicInfo.state.skype,
                "schoolCountry": this.refs.basicInfo.state.schoolCountry,
                "specialty": this.refs.basicInfo.state.specialty,
                "schoolStartYear": this.refs.basicInfo.state.schoolStartYear,
                "schoolEndYear": this.refs.basicInfo.state.schoolEndYear,
                "city": this.refs.basicInfo.state.city,
                "school": this.refs.basicInfo.state.school
            },
            postHead = {
                url : submitUrl,
                data : content
            };
        console.log(postHead);
        Post(postHead).then(
            ({data}) => {
                //显示更改后的数据
                $(".modalLecture .modal").modal('hide');
                this.props.callback();
            },
            ()=>{
                alert("保存失败,请重试!");
            }
        ).catch((err) => {
            console.log(err);
        });
    }
});

export default ModalLecture;