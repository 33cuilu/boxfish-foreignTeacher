/**
 * Created by tinna on 16/5/26.
 * 面试页和试讲页通过模态框
 */

//引入插件
import React from 'react';

//引入样式

var ModalAdopt = React.createClass({
    render : function(){
        return(
            <div className="modalAdopt">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <input class="form-control" ref="name" type="text" placeholder="请输入面试官姓名" />
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
        this.props.callback(this.refs.name.value.trim());
    }
});

export default ModalAdopt;