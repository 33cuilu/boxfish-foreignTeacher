/**
 * Created by tinna on 16/5/27.
 */

import React from 'react';

var SingleDataPicker = React.createClass({
    getInitialState : function () {
        return {
            start : '',
            end:'',
            value: ''
        };
    },
    componentDidMount : function () {
        //初始化表格的日期选择控件
        $(this.refs.dateInput).daterangepicker({ singleDatePicker: true , startDate: new Date()}, (start,end) => {
            this.setState({
                value : start.format("YYYY-MM-DD HH:mm:ss")
            });
        });
    },
    render : function () {
        return (
            <div className="field" >
                <div style={{position:'relative', width:'220px'}}>
                    <input type="text" className="form-control singleDatePicker" placeholder={this.props.name}
                            value={this.state.value} ref="dateInput" style={{paddingLeft:'30px'}} />
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                </div>
            </div>
        );
    }
});

export default SingleDataPicker;