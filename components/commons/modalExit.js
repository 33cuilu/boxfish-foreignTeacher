/**
 * Created by cuilu on 16/5/25.
 * 入池模态框
 */

//引入插件
import React from 'react';

var ModalExit = React.createClass({
    render : function(){
        return(
            <div className="modalExit">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>确认退出外教管理系统?</p>
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
    _submit : function () {
        this.props.callback();
    }
});

export default ModalExit;