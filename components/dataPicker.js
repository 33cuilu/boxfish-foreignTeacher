
import React from 'react';

var DataPicker = React.createClass({
    componentDidMount : function () {
        //初始化表格的日期选择控件
        $('.datePicker').daterangepicker();
    },
    render : function () {
        return (
            <div className="field" >
                <div style={{position:'relative', width:'220px'}}>
                    <input type="text" className="form-control datePicker" value=''
                           style={{paddingLeft:'30px'}} ref={this.props.dateName+"Time"}/>
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                </div>
            </div>
        );
    }
});

export default DataPicker;