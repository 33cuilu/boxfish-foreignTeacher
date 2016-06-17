/**
 * Created by Utopia on 2016/3/9.
 */

export function Post({url,headers,data}) {
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url:url,
            headers:headers,
            data:JSON.stringify(data),
            success:resolve,
            error:reject
        });
    });
}

export function Get({url,headers,data}) {
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"GET",
            dataType:"json",
            url:url,
            headers:headers,
            data:data,
            success:resolve,
            error:reject
        });
    });
}

export function transformArrayToObj(arr) {
    if(Object.prototype.toString.call(arr) != "[object Array]") {
        return arr;
    }
    var obj = {};
    arr.forEach(function (v, i) {
        obj[v.name] = v.value;
    });
    return obj;
}

export function getById(obj,index) {
    if(typeof index != "number" && typeof index != "string"){
        return '';
    }
    let arr = obj.arr,
        id = obj.id;
    for(let i = 1; i< arr.length; i++){ //忽略第一个,因为第一个是-100
        if(id[i] == index){
            return arr[i];
        }
    }
    return '';
}

export function getScoreById(obj,index) {
    if(typeof index != "number"){
        return '';
    }
    let id = obj.id,
        score = obj.score;
    for(let i=0; i<score.length; i++){
        if(id[i] == index){
            return score[i];
        }
    }
    return '';
}

export function getCourseTypeById(obj,index){
    if(!index){
        console.log("无法查询到demo课的类型,因为id是空");
        return '';
    }
    let id = obj.id,
        type = obj.type;
    for(let i=0; i<type.length; i++){
        if(id[i] == index){
            return type[i];
        }
    }
    return '';
}


