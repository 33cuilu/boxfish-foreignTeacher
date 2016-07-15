/**
 * Created by cuilu on 16/5/20.
 * form表单重叠部分
 */

//引入插件
import React from 'react';

//引入组件
import SelectComponent from './selectComponent.js';

var configData = require("../../config/config.json");

var ContentInput = React.createClass({
    getInitialState : function () {
        return {
            firstName : '',
            lastName : '',
            cellphoneNumber : '',
            email : '',
            nickName : '',
            nationality : "-100"
        }
    },
    render : function(){
        let inputDOM=<div className="field">
                        <input type="text" className="form-control" ref="email" onChange={this._getEmail} placeholder="Email"/>
                    </div>;
        if(this.props.type){
            inputDOM = <div className="field">
                        <input type="text" className="form-control" ref="nickName" onChange={this._getNickName} placeholder="账号"/>
                    </div>;
        }
        return(
            <div className="form row">
                <div className="field">
                    <input type="text" className="form-control" ref="firstName" onChange={this._getFirstName} placeholder="First Name"/>
                </div>
                <div className="field">
                    <input type="text" className="form-control" ref="lastName" onChange={this._getLastName} placeholder="Last Name"/>
                </div>
                <div className="field">
                    <input type="text" className="form-control" ref="cellphoneNumber" onChange={this._getCellphoneNumber} style={{width:"150px"}} placeholder="手机号"/>
                </div>
                {inputDOM}
                <SelectComponent contentData={configData.nationality} ref="nationality" onChange={(value)=>{this._getNationality(value)}}/>
                <div className="field more">
                    <span className="glyphicon glyphicon-triangle-bottom" onClick={this._changeForm}></span>
                </div>
            </div>
            
        );
    },
    _getFirstName : function () {
        this.setState({
            firstName : this.refs.firstName.value.trim()
        });
    },
    _getLastName : function () {
        this.setState({
            lastName : this.refs.lastName.value.trim()
        });
    },
    _getCellphoneNumber : function () {
        this.setState({
            cellphoneNumber : this.refs.cellphoneNumber.value.trim()
        });
    },
    _getEmail : function () {
        this.setState({
            email : this.refs.email.value.trim()
        });
    },
    _getNickName : function () {
        this.setState({
            nickName : this.refs.nickName.value.trim()
        });
    },
    _getNationality : function (value) {
        this.setState({
            nationality : value
        });
    },
    /**
     * 查询表单的展开动画
     * @private
     */
    _changeForm : function(event) {
        $("#forms").toggleClass("forms-height");
    }
});

export default ContentInput;