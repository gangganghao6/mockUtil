# newMock使用文档

## 函数

### createMockServer(port:String,type:String,template:Object)

template命名规则：一般情况下采用 key_type，即 数据的key_数据类型的方式命名，若需要在数组中出现一种格式的类型，（[1,2,3]），则只需要以 type进行命名。

类型大全

```js
{
    '${name}_cnstring:${length:number}':中文字符//接收数字：length
    '${name}_name:':中文姓名//
    '${name}_location:${bool:boolean}':地址（省 市 县）//接收布尔值：bool，是否展示省和市
    '${name}_email':邮箱//
    '${name}_time:${template:string}':时间（默认yyyy-MM-dd HH:mm:ss）,//接收模板：template，修改时间展示格式
    '${name}_id':唯一guid//
    '${name}_image:${object:{size:string,string:string}}':图片（返回图片url）//接收对象，包含大小：size和文字：string
    '${name}_string:${length:number}':英文字符//接收数字：length
    '${name}_number:${length:number}':数字, //接收数字：length
    '${name}_boolean':布尔值, //
    '$!{name}_array_${length}:${object:object}':数组, //接收对象，对象为数组内容
    '$!{name}_object:${object:object}'对象://接收对象
}
```



```
port:"http://localhost:3000/getUserInfo"
```

```
type:"get"/"post"
```

```js
let template = {
  users_array_5: {//创建大小为5的数组
//  string/number:7,方式一：全为字符串或数字
    str_string: 4,
    num_number: 5,//方式二：数组内为对象键值
    name_name: '',
    phone_number: 11,
    sex_boolean: '',
    register_time: 'yyyy-MM-dd HH:mm:ss',
    password_string: 10,
    header_image: {//创建图片
      size: '100x100',//大小
      string: 5//英文字符个数
    },
    email_email: '',
    location_location: true,
    judge_object: {//创建对象 object必须有name_type
      title_cnstring: 10,
      content_array_4: {//嵌套数组
        email: 5//此时数组内为5个邮箱地址
      }
    },
    other_array_5: {//array必须有name_type_length
      array_array_5: {
        string: 5
      },
    }
  }
}
```

