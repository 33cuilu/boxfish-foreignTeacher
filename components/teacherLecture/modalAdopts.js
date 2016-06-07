/**
 * Created by cuilu on 16/5/25.
 * 批量通过模态框
 */

//引入插件
import React from 'react';

//引入样式

var ModalAdopts = React.createClass({
    render : function(){
        return(
            <div className="modalAdopts">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>确认选中老师通过试讲?</p>
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
        this.props.callback(2);
    }
});

export default ModalAdopts;