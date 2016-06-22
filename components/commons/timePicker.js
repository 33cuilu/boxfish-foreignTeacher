
import React from 'react';

var TimePicker = React.createClass({
    getInitialState : function () {
        return {
            start : '',
            end:'',
            value: this.props.value||''
        };
    },
    componentWillReceiveProps : function (nextProps) {
        if(nextProps.value && nextProps.value !== this.props.value){
            this.setState({
                value : nextProps.value
            });
        }
    },
    componentDidMount : function () {
        //初始化表格的日期选择控件
        let place = (this.props.place == null)? '.content' : this.props.place;
        if(this.props.type == "1"){
            $(this.refs.dateInput).daterangepicker(
                {
                    parentEl: place,
                    singleDatePicker: true,
                    startDate: new Date(),
                    timePicker: true,
                    timePickerIncrement: 10,
                    format: 'YYYY-MM-DD h:mm:ss'
                },
                (start, end)=>{
                    this.setState({ //每次将新的日期赋给状态
                        start: start.format("YYYY-MM-DD HH:mm:ss"),
                        value: start.format("YYYY-MM-DD HH:mm:ss")
                    });
                    if(this.props.onChange){
                        this.props.onChange(start.format("YYYY-MM-DD HH:mm:ss"));
                    }
                }
            );
        }else{
            $(this.refs.dateInput).daterangepicker(
                {
                    parentEl: place,
                    timePicker: true,
                    timePickerIncrement: 10,
                    format: 'YYYY-MM-DD h:mm:ss'
                },
                (start, end)=>{
                    this.setState({ //每次将新的日期赋给状态
                        start: start.format("YYYY-MM-DD HH:mm:ss"),
                        end: end.format("YYYY-MM-DD HH:mm:ss"),
                        value: `${start.format("YYYY-MM-DD HH:mm:ss")} - ${end.format("YYYY-MM-DD HH:mm:ss")}`
                    });
                    if(this.props.onChange){
                        this.props.onChange(`${start.format("YYYY-MM-DD HH:mm:ss")} - ${end.format("YYYY-MM-DD HH:mm:ss")}`);
                    }
                }
            );
        }

    },
    render : function () {
        let styleObj;
        if(this.props.type == "1"){
            styleObj = {position:'relative', width:'200px'};
        }else{
            styleObj = {position:'relative', width:'330px'};
        }
        let trashClassName = "glyphicon glyphicon-trash";
        trashClassName += (this.props.unclear) ? " invisible": "";
        return (
            <div className="timePicker field" >
                <div style={styleObj}>
                    <input type="text" className="form-control datePicker" value={this.state.value} placeholder={this.props.name}
                           readOnly={true} style={{paddingLeft:'30px'}} ref="dateInput" />
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'9px',cursor: 'hand'}}></i>
                </div>
                <i className={trashClassName} style={{position:'absolute',right:'10px',top:'9px'}} onClick={this._clear}></i>
            </div>
        );
    },
    _clear : function () {
        this.setState({
            start : '',
            end : '',
            value : ''
        });
        if(this.props.onChange){
            this.props.onChange('');
        }
    }
});

export default TimePicker;