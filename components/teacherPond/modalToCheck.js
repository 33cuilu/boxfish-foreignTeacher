/**
 * Created by tinna on 16/5/31.
 * 捕捞模态框
 */

//引入插件
import React from 'react';

//引入样式

var ModalPoolToCheck = React.createClass({
    render : function(){
        return(
            <div className="modalPoolToCheck">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>该老师将被捕捞回审核页?</p>
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
        this.props.callback(1);
    }
});

export default ModalPoolToCheck;