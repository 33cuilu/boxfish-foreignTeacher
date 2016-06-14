/**
 * Created by tinna on 16/5/31.
 * 捕捞模态框
 */

//引入插件
import React from 'react';

//引入样式

var ModalFish = React.createClass({
    render : function(){
        return(
            <div className="modalFish">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>是否捕捞当前教师?</p>
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

export default ModalFish;