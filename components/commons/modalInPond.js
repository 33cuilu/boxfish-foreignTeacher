/**
 * Created by cuilu on 16/5/25.
 * 入池模态框
 */

//引入插件
import React from 'react';

//引入样式
import "../../less/modalInPond.less";

var ModalInPond = React.createClass({
    render : function(){
        return(
            <div className="modalInPond">
                <div className="modal fade" ref="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <textarea placeholder="填写入池理由" ref="reason" rows="3"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this._submit}>确定</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _submit : function (){
        if(!this.refs.reason.value||this.refs.reason.value.trim()==""){
            alert("请填写入池理由!");
            return;
        }
        this.props.callback(1,this.refs.reason.value);
    }
});

export default ModalInPond;