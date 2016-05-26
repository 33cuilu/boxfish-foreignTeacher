
/**
 * Created by tinna on 16/5/19.
 */

//引入插件
import React from 'react';

var SelectComponent = React.createClass({
    render : function(){
        /*let name = this.props.contentData.name;*/
        let arr = this.props.contentData.arr;
        let otherName = this.props.contentData.otherName;
        arr = arr.map( (v,i) => {
            return (
                <option value="">{v}</option>
            );
        });
        return(
            <div className="field">
                <select className="form-control" ref={otherName}>
                    {arr}
                </select>
            </div>
        );

    }
});

export default SelectComponent;