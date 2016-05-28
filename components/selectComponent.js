
/**
 * Created by tinna on 16/5/19.
 */

//引入插件
import React from 'react';

var SelectComponent = React.createClass({
    getInitialState : function () {
        return {
            index : 0
        };
    },
    render : function(){
        let arr = this.props.contentData.arr;
        arr = arr.map( (v,i) => {
            return (
                <option value="">{v}</option>
            );
        });
        return(
            <div className="field">
                <select className="form-control" ref="select" onChange={this._changeSelect}>
                    {arr}
                </select>
            </div>
        );

    },
    _changeSelect : function () {
        this.setState({
            index : this.refs.select.selectedIndex
        });
        if(this.props.onChange){
            this.props.onChange(this.refs.select.selectedIndex);
        }

    }
});

export default SelectComponent;