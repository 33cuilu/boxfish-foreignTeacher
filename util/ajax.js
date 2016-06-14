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
    for(let i = 0; i< arr.length; i++){
        if(id[i] == index){
            return arr[i];
        }
    }
    return '';
}


