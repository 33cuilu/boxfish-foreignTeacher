
import React from 'react';
import moment from 'moment';

var DataPicker = React.createClass({
    getInitialState : function () {
        let today,show;
        if(this.props.show){
            today = moment().format("YYYY-MM-DD HH:mm:ss");
        }else{
            today = this.props.value ||'';
        }
        return {
            start : '',
            end:'',
            value: today,
            show: today.substr(0,10)
        };
    },
    componentWillReceiveProps : function (nextProps) {
        if(nextProps.value && nextProps.value !== this.props.value){
            this.setState({
                value : nextProps.value,
                show : nextProps.value
            });
        }
    },
    componentDidMount : function () {
        //初始化表格的日期选择控件
        if(this.props.type == "1"){
            $(this.refs.dateInput).daterangepicker({ singleDatePicker: true , startDate: new Date()}, (start) => {
                this.setState({
                    value : start.format("YYYY-MM-DD HH:mm:ss"),
                    show : start.format("YYYY-MM-DD")
                });
                if(this.props.onChange){
                    this.props.onChange(start.format("YYYY-MM-DD HH:mm:ss"));
                }
            });
        }else{
            $(this.refs.dateInput).daterangepicker({},(start, end)=>{
                this.setState({ //每次将新的日期赋给状态
                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                    value: `${start.format("YYYY-MM-DD HH:mm:ss")} - ${end.format("YYYY-MM-DD HH:mm:ss")}`,
                    show: `${start.format("YYYY-MM-DD")} - ${end.format("YYYY-MM-DD")}`
                });
                if(this.props.onChange){
                    this.props.onChange(`${start.format("YYYY-MM-DD h:mm:ss")} - ${end.format("YYYY-MM-DD h:mm:ss")}`);
                }
            });
        }
    },
    render : function () {

        return (
            <div className="field" >
                <div style={{position:'relative', width:'220px'}}>
                    <input type="text" className="form-control datePicker" placeholder={this.props.name}
                           style={{paddingLeft:'30px'}} value={this.state.show} ref="dateInput" onChange={this._change}/>
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                </div>
            </div>
        );
    },
    _change : function () { //只能删除报名日期输入框的内容
        this.setState({
            start : '',
            end : '',
            show : '',
            value : ''
        });
    }
});

export default DataPicker;