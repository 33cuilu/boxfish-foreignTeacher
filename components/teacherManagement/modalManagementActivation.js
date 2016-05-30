/**
 * Created by cuilu on 16/5/26.
 *支付网关页冻结模态框
 */

//引入插件
import React from 'react';

//引入样式

var ModalManagementActivation = React.createClass({
    render : function(){
        return(
            <div className="modalManagementActivation">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>确认激活选中老师的账号?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">确定</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ModalManagementActivation;