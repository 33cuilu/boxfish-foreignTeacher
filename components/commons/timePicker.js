
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
            timePickerIncrement: 10,
            format: 'YYYY-MM-DD h:mm:ss'
        },(start, end)=>{
            this.setState({ //每次将新的日期赋给状态
                start: start.format("YYYY-MM-DD h:mm:ss"),
                end: end.format("YYYY-MM-DD h:mm:ss"),
                value: `${start.format("YYYY-MM-DD h:mm:ss")} - ${end.format("YYYY-MM-DD h:mm:ss")}`
            });
        });
    },
    render : function () {
        return (
            <div className="field" >
                <div style={{position:'relative', width:'320px'}}>
                    <input type="text" className="form-control datePicker" placeholder={this.props.name}
                           style={{paddingLeft:'30px'}} ref="dateInput" onChange={this._change}/>
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                </div>
            </div>
        );
    },
    _change : function () {
        this.setState({
            value : this.refs.dateInput.value
        });
    }
});

export default TimePicker;