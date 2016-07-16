/**
 * Created by Tinna on 2015/05/08
 * 分页
 * */

//引入插件
import React from 'react'

//引入样式
import '../../less/page.less';

var PageList = React.createClass({
  render : function(){
    return (
          <div className="page center-block group">
              <div className="page-list group">
                  <a className="icon pre-page" onClick={this.props.onPre}>
                      <i className="glyphicon glyphicon-menu-left"></i>
                  </a>
                  <a className="first-page" onClick={this.props.onFirst}>首页</a>
                  <a className="cur-page" >{this.props.curPage}/{this.props.totalPages}</a>
                  <a className="last-page" onClick={this.props.onLast}>尾页</a>
                  <a className="icon next-page" onClick={this.props.onNext}>
                      <i className="glyphicon glyphicon-menu-right"></i>
                  </a>
              </div>
              <div className="page-jump group">
                  <input type="text" ref="target"/>
                  <label onClick={this._jump}>Go</label>
              </div>
          </div>
        );
  },
  _jump : function () {
      let target = this.refs.target.value.trim();
      if(!target){
          alert("请输入目标页码");
          return;
      }
      if(isNaN(target)){
          alert("请输入数字");
          return;
      }
      if(+target<=0 || +target > this.props.totalPages){
          alert("页码不在可显示范围");
          return;
      }
      this.props.onJump(+target);
  }
});

export default PageList;
