/**
 * Created by tinna on 16/5/27.
 */

import React from 'react';

var SingleDataPicker = React.createClass({
    getInitialState : function () {
        return {
            value : '2016-05-26'
        };
    },
    componentDidMount : function () {
        //初始化表格的日期选择控件
        $('.singleDatePicker').daterangepicker({ singleDatePicker: true }, (start,end) => {
            this.setState({
                value : start.format("YYYY-MM-DD")
            });
        });
    },
    render : function () {
        return (
            <div className="field" >
                <div style={{position:'relative', width:'220px'}}>
                    <input type="text" className="form-control singleDatePicker" placeholder={this.props.name}
                            ref="dateInput" style={{paddingLeft:'30px'}} />
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                </div>
            </div>
        );
    }
});

export default SingleDataPicker;