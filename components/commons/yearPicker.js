
/**
 * Created by tinna on 16/5/19.
 */

//引入插件
import React from 'react';

var range = 30;

var YearPicker = React.createClass({
    getInitialState : function () {
        return {
            start : (this.props.start)?this.props.start : -1,
            end : (this.props.end) ? this.props.end : -1
        };
    },
    componentWillReceiveProps : function (nextProps) {
        if(nextProps.start && nextProps.start !== this.props.start){
            this.setState({
                start : nextProps.start
            });
        }
        if(nextProps.end && nextProps.end !== this.props.end){
            this.setState({
                end : nextProps.end
            });
        }
    },
    render : function(){
        let startYear = (new Date()).getFullYear(),
            endYear = (this.state.start == -1) ? startYear : this.state.start ,
            startYears = [],
            endYears = [];
        for(let i = startYear - range; i <= startYear + range ;i++){
            startYears.push(i);
        }
        if(this.state.start == -1){
            endYears = startYears;
        }else{
            for(let i = endYear ; i<= endYear + range; i++){
                endYears.push(i);
            }
        }
        let option1 = startYears.map((v,i) => {
            return (<option value={v+""} key={i}>{v}</option>);
        });
        let option2 = endYears.map((v,i) => {
            return (<option value={v+""} key={i}>{v}</option>);
        });
        return(
            <div className="yearPicker field">
                <select value={this.state.start+""} className="start form-control" ref="start" onChange={this._changeStart}>
                    <option value="-1">入学年份</option>{option1}
                </select>
                至
                <select value={this.state.end+""} className="end form-control" ref="end" onChange={this._changeEnd}>
                    <option value="-1">毕业年份</option>{option2}
                </select>
            </div>
        );

    },
    _changeStart : function (e) {
        this.setState({
            start : e.target.value - 0,
            end : e.target.value - 0
        });
        this.props.onChange(e.target.value - 0, e.target.value - 0);
    },
    _changeEnd: function (e) {
        this.setState({
            end : e.target.value - 0
        });
        this.props.onChange(this.state.start, e.target.value - 0);
    }
});

export default YearPicker;