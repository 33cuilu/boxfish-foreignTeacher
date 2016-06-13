
/**
 * Created by tinna on 16/5/19.
 */

//引入插件
import React from 'react';

var SelectComponent = React.createClass({
    getInitialState : function () {
        return {
            defaultValue : this.props.value + "",
            index : 0
        };
    },
    componentWillReceiveProps : function (nextProps) {
        if(nextProps.value !== null){
            this.setState({
                defaultValue : nextProps.value+"",
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
                <select value={this.state.defaultValue} className={selectClassName} ref="select" onChange={this._changeSelect}>
                    {arr}
                </select>
            </div>
        );

    },
    _changeSelect : function () {
        this.setState({
            index : this.refs.select.selectedIndex,
            defaultValue : this.props.contentData.id[this.refs.select.selectedIndex]
        });
        if(this.props.onChange){
            this.props.onChange(this.refs.select.selectedIndex);
        }
    }
});

export default SelectComponent;