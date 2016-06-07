/**
 * Created by cuilu on 16/5/25.
 * 批量入池模态框
 */

//引入插件
import React from 'react';

//引入样式
import "../../less/modalInPonds.less";

var ModalInPonds = React.createClass({
    render : function(){
        return(
            <div className="modalInPonds">
                <div className="modal fade">
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
        this.props.callback(2,this.refs.reason.value);
    }
});

export default ModalInPonds;