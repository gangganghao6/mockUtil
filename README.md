# newMock使用文档

## 函数

### createMockServer(port:String,type:String,template:Object)

template命名规则：一般情况下采用 key_type，即 数据的key_数据类型的方式命名，若需要在数组中出现一种格式的类型，（[1,2,3]），则只需要以 type进行命名。在创建数组时，要接受一个包含length和instance的对象，其中instance为自定义的数据类型，length为数组大小

类型大全

```json
{
    '_cnstring':中文字符//接收数字：length
    '_name':中文姓名//
    '_location':地址（省 市 县）//接收布尔值：bool，是否展示省和市
    '_email':邮箱//
    '_time':时间（默认yyyy-MM-dd HH:mm:ss）,//接收模板：template，修改时间展示格式
    '_id':唯一guid//
    '_image':图片（返回图片url）//接收对象，包含大小：size和文字：string
    '_string':英文字符//接收数字：length
    '_number':数字, //接收数字：length
    '_boolean':布尔值, //
    '_array':数组, //接收对象，包含长度：length和实例模板对象：instance
    '_object'对象://接收对象
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
    arrayName_array: {//创建数组
        length: 5,//数组长度
        instance: {//数组内容
//          string/number:7,方式一：全为字符串或数字
            str_string: 4,
            num_number: 5,//方式二：数组内为对象
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
            judge_object: {//创建对象
                title_cnstring: 10,
                content_array: {//嵌套数组
                    length: 4,
                    instance: {
                        email: 5//此时数组内为5个邮箱地址
                    }
                }
            },
            other_array: {
                length: 5,
                instance: {
                    str_string: 10,//此时数组内为5个包含str属性的对象
                }
            }
        }
    }
}
```
