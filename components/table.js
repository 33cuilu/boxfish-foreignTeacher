/**
 * Created by tinna on 16/5/20.
 */

//引入插件
import React from 'react';

var Table = React.createClass({
    getInitialState : function () {
        return {
            thList : this.props.contentData.thList,
            tbodyList : this.props.contentData.tbodyList,
            displayAttr:this.props.contentData.displayAttr,
            hasTryTime : false
        };
    },
    componentWillMount : function(){
      if($.inArray("试讲时间",this.state.thList)){
          this.setState({hasTryTime:true});
      }
    },
    render : function(){
        let thList = this.state.thList.map((v,i) => {
            if(i == 0){
                return ( <th><input type="checkbox" /></th> );
            }
            return ( <th>{v}</th> );
        });
        let displayAttr = this.state.displayAttr;

        if(displayAttr){

        }
        let len = displayAttr? displayAttr.length:0;
        let tbodyList = this.state.tbodyList.map((v,i) => {
            let displayAttrs =  displayAttr.map( (val,index) =>{
                if(this.state.hasTryTime&&index==(len-1)&&v[val]==""){
                    return(
                        <td><input type="button" className="btn btn-default btn-xs" value="安排试讲" onClick={this.props.callBackFunc}/></td>
                    );
                }
                return(
                    <td>{v[val]}</td>
                );

            });
            return (
                <tr>
                    <td><input type="checkbox" /></td>
                    {displayAttrs}
                    <td className="table-operation">
                        <input className="btn btn-default btn-xs" type="button" value="通过" onClick={this.props.callBackAdopt} />
                        <input className="btn btn-default btn-xs" type="button" value="入池" onClick={this.props.callBackInPond} />
                        <a onClick={this.props.callBackMore}>详情</a>
                    </td>
                </tr>
            );
        });
        return (
            <table className="table table-striped" ref="table">
                <thead>
                <tr>
                    {thList}
                </tr>
                </thead>
                <tbody>
                    {tbodyList}
                </tbody>
            </table>
        );
    }
});

export default Table;