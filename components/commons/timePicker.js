
import React from 'react';

var TimePicker = React.createClass({
    getInitialState : function () {
        return {
            start : '',
            end:'',
            value: this.props.value||''
        };
    },
    componentDidMount : function () {
        //初始化表格的日期选择控件
        if(this.props.type == "1"){
            $(this.refs.dateInput).daterangepicker({
                singleDatePicker: true,
                startDate: new Date(),
                timePicker: true,
                timePickerIncrement: 10,
                format: 'YYYY-MM-DD h:mm:ss'
            },(start, end)=>{
                this.setState({ //每次将新的日期赋给状态
                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                    value: start.format("YYYY-MM-DD HH:mm:ss")
                });
                this.props.onChange(start.format("YYYY-MM-DD HH:mm:ss"));
            });
        }else{
            $(this.refs.dateInput).daterangepicker({
                timePicker: true,
                timePickerIncrement: 10,
                format: 'YYYY-MM-DD h:mm:ss'
            },(start, end)=>{
                this.setState({ //每次将新的日期赋给状态
                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                    value: `${start.format("YYYY-MM-DD HH:mm:ss")} - ${end.format("YYYY-MM-DD HH:mm:ss")}`
                });
                this.props.onChange(`${start.format("YYYY-MM-DD HH:mm:ss")} - ${end.format("YYYY-MM-DD HH:mm:ss")}`);
            });
        }

    },
    render : function () {
        let styleObj;
        if(this.props.type == "1"){
            styleObj = {position:'relative', width:'180px'};
        }else{
            styleObj = {position:'relative', width:'320px'};
        }
        return (
            <div className="field" >
                <div style={styleObj}>
                    <input type="text" className="form-control datePicker" value={this.state.value} placeholder={this.props.name}
                           style={{paddingLeft:'30px'}} ref="dateInput" onChange={this._change} />
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                </div>
            </div>
        );
    },
    _change : function (e) {
        this.setState({
            start : '',
            end : '',
            value : e.target.value
        });
    }
});

export default TimePicker;