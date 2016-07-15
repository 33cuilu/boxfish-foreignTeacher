/**
 * Created by tinna on 16/5/19.
 */
import React from 'react';

import TeacherAddress from './teacherAddress.js';
import DataPicker from './dataPicker.js';

var BaseQuery = React.createClass({
    render : function(){
        return(
            <div>
                <div className="field">
                    <input type="text" className="form-control" ref="teacherId" placeholder="教师账号" />
                </div>
                <div className="field">
                    <input type="text" className="form-control" ref="teacherName" placeholder="教师姓名"/>
                </div>
                <div className="field">
                    <input type="text" className="form-control" ref="tel" placeholder="教师电话"/>
                </div>
                <TeacherAddress />
                <DataPicker />
                <div className="field more" onClick={this._showHideQuery}>
                    <span className="glyphicon glyphicon-triangle-bottom"></span>
                </div>
            </div>
        );
    },
    _showHideQuery : function(e){
        let el  = $(".queryOption").toggleClass("showAllQuery");
    }
});

export default BaseQuery;