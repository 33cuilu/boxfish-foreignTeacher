
/**
 * Created by tinna on 16/5/19.
 */

//引入插件
import React from 'react';

var SelectComponent = React.createClass({
    getInitialState : function () {
        return {
            value : (this.props.value) ? this.props.value : "-100"
        };
    },
    componentWillReceiveProps : function (nextProps) {
        if(nextProps.value && nextProps.value !== this.props.value){
            this.setState({
                value : nextProps.value+""
            });
        } 
    },
    render : function(){
        let arr = this.props.contentData.arr ;
        let id = this.props.contentData.id ;
        arr = arr.map( (v,i) => {
            return (
                <option key={i} value={id[i]+""} >{v}</option>
            );
        });
        let selectClassName = (this.props.size == "small")? "form-control select-sm" : "form-control";
        return(
            <div className="field">
                <select value={this.state.value} className={selectClassName} ref="select" onChange={this._changeSelect}>
                    {arr}
                </select>
            </div>
        );

    },
    _changeSelect : function (e) {
        this.setState({
            value : e.target.value
        });
        if(this.props.onChange){
            this.props.onChange(e.target.value);
        }
    }
});

export default SelectComponent;