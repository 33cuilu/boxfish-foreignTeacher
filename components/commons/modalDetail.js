/**
 * Created by tinna on 16/7/15.
 * 详情模态框
 */

//引入插件
import React from 'react';

//引入组件
import SelectComponent from './selectComponent.js';

//引入样式
import '../../less/modal.less';

var configData = require("../../config/config.json");

var ModalDetail = React.createClass({
    getInitialState : function () {
        return {
            firstName : '',
            lastName : '',
            occupation : '',
            location : "-100",
            timezone : -100,
            interviewChannel : -100,
            interviewAccount : '',
            nationality : "-100",
            gender : -100,
            notes : []
        };
    },
    componentWillReceiveProps : function (nextProps) {
        let info = nextProps.info;
        this.setState({
            firstName: info.firstName,
            lastName: info.lastName,
            occupation: info.occupation,
            location: info.location,
            timezone: info.timezone,
            interviewChannel : info.interviewChannel,
            interviewAccount : info.interviewAccount,
            nationality: info.nationality,
            gender: info.gender,
            notes: info.notes
        });
    },
    render : function(){
        let info = this.state,
            show = this.props.info,
            notelist = (this.state.notes)?this.state.notes : [];
        notelist = notelist.map((v,i)=>{
            return (
                <p className="note-item" key={i}>
                    <div>{v.content}</div>
                    <label>{v.date}</label>
                </p>
            );
        });
        return(
            <div className="modalDetail">
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body-header">
                                    <div className="field">
                                        <label>报名日期:</label>
                                        <input type="text" className="readOnly"  readOnly={true} value={show.createTime||''} />
                                    </div>
                                    <div className="field">
                                        <label>审核日期:</label>
                                        <input type="text" className="readOnly" readOnly={true} value={show.auditTime||''} />
                                    </div>
                                    <div className="field">
                                        <label>面试时间:</label>
                                        <input type="text" className="readOnly" readOnly={true} value={show.interviewTime||''} />
                                    </div>
                                    <div className="field">
                                        <label>试讲时间:</label>
                                        <input type="text" className="readOnly" readOnly={true}
                                               value={show.triallectureStartTime?`${show.triallectureStartTime} - ${show.triallectureEndTime}`:''} />
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>First Name:</label>
                                        <input type="text" className="form-control" ref="firstName" value={info.firstName||''}/>
                                    </div>
                                    <div className="field">
                                        <label>Last Name:</label>
                                        <input type="text" className="emailInfo form-control" ref="lastName" value={info.lastName||''}/>
                                    </div>
                                    <div className="field">
                                        <label>职业:</label>
                                        <input type="text" className="form-control" ref="occupation" value={info.occupation||''}/>
                                    </div>
                                    <div className="field">
                                        <label>手机号:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.cellphoneNumber||''}/>
                                    </div>
                                    <div className="field">
                                        <label>常驻地:</label>
                                        <SelectComponent contentData={configData.location} value={info.location||''} />
                                    </div>
                                    <div className="field">
                                        <label>时区:</label>
                                        <SelectComponent contentData={configData.timezone} value={info.timezone||''}/>
                                    </div>

                                    <div className="field">
                                        <label>账号:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.nickName||''}/>
                                    </div>
                                    <div className="field">
                                        <label>邮箱:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.email} />
                                    </div>
                                    <div className="field">
                                        <label>面试渠道:</label>
                                        <SelectComponent contentData={configData.interviewChannel} value={info.interviewChannel}/>
                                    </div>
                                    <div className="field">
                                        <label>面试账号:</label>
                                        <input type="text" className="form-control" ref="interviewAccount" value={info.interviewAccount||''}/>
                                    </div>
                                    <div className="field">
                                        <label>国家:</label>
                                        <SelectComponent contentData={configData.nationality} value={info.nationality}/>
                                    </div>
                                    <div className="field">
                                        <label>性别:</label>
                                        <SelectComponent ref="gender" value={info.gender} contentData={configData.gender} />
                                    </div>
                                </div>
                                <div className="modal-body-body">
                                    <div className="field">
                                        <label>试讲账号:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.triallectureTeacher||''}/>
                                    </div>
                                    <div className="field">
                                        <label>学生账号:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.triallectureStudent||''} />
                                    </div>
                                    <div className="field">
                                        <label>面试考官:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.interviewer||''}/>
                                    </div>
                                    <div className="field">
                                        <label>试讲考官:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.triallectureInterviewer||''} />
                                    </div>
                                    <div className="field">
                                        <label>demo课:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.demoCourse||''}/>
                                    </div>
                                    <div className="field">
                                        <label>总分:</label>
                                        <input type="text" className="form-control" readOnly={true} value={show.markScore||''} />
                                    </div>
                                </div>
                                <div className="modal-body-footer">
                                    <label>备注:</label>
                                    <div className="notelist">
                                        {notelist}
                                    </div>
                                    <i className="glyphicon glyphicon-plus" onClick={this._addNote}></i>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-primary" onClick={this._submit}>保存</button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _addNote : function () {

    },
    _submit : function () {
        let content = {
                "email": this.props.info.email,
                "firstName": this.refs.firstName,
                "lastName": this.refs.lastName,
                "occupation": this.refs.occupation,
                "location": this.refs.location.state.value,
                "timezone": +this.refs.timezone.state.value,
                "interviewChannel": +this.refs.interviewChannel.state.value,
                "interviewAccount": this.refs.interviewAccount.value,
                "nationality": this.refs.nationality.state.value,
                "gender": +this.refs.gender.state.value
            },
            postHead = {
                url : `${submitUrl}?token=${store.get("accessToken")}`,
                data : content
            };

        Post(postHead).then(
            () => {
                //显示更改后的数据
                $(".modalDetail .modal").modal('hide');
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

export default ModalDetail;