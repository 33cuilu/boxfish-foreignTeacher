
import React from 'react';

var TimePicker = React.createClass({
    getInitialState : function () {
        return {
            start : '',
            end:'',
            value: ''
        };
    },
    componentDidMount : function () {
        //初始化表格的日期选择控件
        $(this.refs.dateInput).daterangepicker({
            timePicker: true,
            timePickerIncrement: 1,
            format: 'YYYY-MM-DD h:mm'
        },(start, end)=>{
            this.setState({ //每次将新的日期赋给状态
                start: start.format("YYYY-MM-DD h:mm"),
                end: end.format("YYYY-MM-DD h:mm"),
                value: `${start.format("YYYY-MM-DD h:mm")} - ${end.format("YYYY-MM-DD h:mm")}`
            });
        });
    },
    render : function () {
        return (
            <div className="field" >
                <div style={{position:'relative', width:'220px'}}>
                    <input type="text" className="form-control datePicker" data-date-format="yyyy-mm-dd"
                           style={{paddingLeft:'30px'}} ref="dateInput"/>
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                </div>
            </div>
        );
    }
});

export default TimePicker;