/**
 * Created by cuilu on 16/5/26.
 * 审核页通过模态框
 */

//引入插件
import React from 'react';

//引入样式

var ModalInterviewAdopts = React.createClass({
    render : function(){
        return(
            <div className="modalInterviewAdopts">
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>确认选中老师通过面试?</p>
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

export default ModalInterviewAdopts;