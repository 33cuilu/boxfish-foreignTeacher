/**
 * Created by cuilu on 16/5/18.
 * 教师管理页详情模态框
 */

//引入插件
import React from 'react'
import store from 'store'
import {Post} from '../../util/ajax.js';

//引入组件
import SelectComponent from './../commons/selectComponent.js';
import BasicInfo from './../commons/basicInfo.js';

//引入样式
import '../../less/modalManagement.less';
import '../../less/modalLecture.less';


var configData = require("../../config/config.json");

var submitUrl = `http://${configData.ip}/web/teacherOralEn/updateTeacher`;

var ModalManagement = React.createClass({
    render : function(){
        let info = this.props.info;
        return(
            <div className="modalManagement">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>报名日期:</label>
                                        <input type="text" className="readOnly"  readOnly={true} value={info.createTime} />
                                    </div>
                                    <div className="field">
                                        <label>审核日期:</label>
                                        <input type="text" className="readOnly" readOnly={true} value={info.auditTime} />
                                    </div>
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <input type="text" className="readOnly" readOnly={true} value={info.interviewTime} />
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <input type="text" className="readOnly" value={info.triallectureStartTime?`${info.triallectureStartTime} - ${info.triallectureEndTime}`:''} />
                                    </div>
                                    <BasicInfo ref="basicInfo" value={info}/>
                                    <div className="field">
                                        <label>性别:</label>
                                        <SelectComponent ref="gender" contentData={configData.gender} value={info.gender} />
                                    </div>
                                    <div className="field">
                                        <label>综合评分:</label>
                                        <input type="text" className="form-control" value={info.markScore}/>
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
        console.log(this.props.info);
        let content = {
            "firstName": this.refs.basicInfo.state.firstName,
            "lastName": this.refs.basicInfo.state.lastName,
            "cellphoneNumber": this.refs.basicInfo.state.cellphoneNumber,
            "email": this.props.info.email,
            "gender": this.refs.gender.state.value - 0,
            "skype": this.refs.basicInfo.state.skype,
            "nationality": this.refs.basicInfo.state.nationality,
            "timezone": this.refs.basicInfo.state.timezone,
            "city": this.refs.basicInfo.state.city,
            "degree": this.refs.basicInfo.state.degree,
            "school": this.refs.basicInfo.state.school,
            "schoolCountry": this.refs.basicInfo.state.schoolCountry,
            "specialty": this.refs.basicInfo.state.specialty,
            "schoolStartYear": this.refs.basicInfo.state.schoolStartYear,
            "schoolEndYear": this.refs.basicInfo.state.schoolEndYear,
            "occupation": this.refs.basicInfo.state.occupation
        };
        let postHead = {
            url : `${submitUrl}?token=${store.get("accessToken")}`,
            data : content
        };
        Post(postHead).then(
            () => {
                //显示更改后的数据
                $(".modalManagement .modal").modal('hide');
                this.props.callback();
            },
            ()=>{
                alert("安排试讲失败,可能因为网络原因,也可能是安排出现冲突!");
            }
        ).catch((err) => {
            console.log(err);
        });
    }
});

export default ModalManagement;