/**
 * Created by tinna on 16/5/20.
 */

//引入插件
import React from 'react';

var Table = React.createClass({
    //Table组件不需要有自己的state,只是作为一个显示数据的组件
    render : function(){
        var tableStyle = this.props.tableStyle, //表格显示多少行,是否有复选框,是否有操作
            thList = this.props.contentData.thList, //表格的表头
            tbodyList = this.props.contentData.tbodyList,
            tableData = this.props.list.concat([]);  //表格中应该显示的具体数据对象
        //如果list内容不足tableSize行,则用空行将表格填满
        let nullNum = tableStyle.tableSize - tableData.length;
        for (let i = 0; i < nullNum; i++) {
            tableData.push(this.props.contentData.nullEntry);
        }

        //填写表头
        thList = thList.map((v, i) => {
            return (<th key={i} >{v}</th>);
        });
        if (tableStyle.hasCheckBox) {
            thList = <tr> <th><input type="checkbox" onChange={(e)=>{this._selectAll(e)}}/></th> {thList}  </tr>;
        }else{
            thList = <tr>{thList}</tr>
        }

        //填写表体
        tableData = tableData.map((v,i) => {
            let entry=null;
            entry = tbodyList.map((attr,j) =>{
                let temp = v[attr]?v[attr]:"";
                return (
                    <td key={`td${j}`}>
                        {temp}
                    </td>
                );
            });
            return <tr key={i} >{entry}</tr>;
        });
        return (
            <table className="table table-striped" ref="table">
                <thead>
                    {thList}
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        );
    },
    _selectAll : function(e){
        if(e.target.checked){
            $("tbody :checkbox").prop("checked",true);
        }else{
            $("tbody :checkbox").prop("checked",false);
        }
        console.log(e.target.checked);
        this.props.selectAll(e.target.checked);
    }
});

export default Table;