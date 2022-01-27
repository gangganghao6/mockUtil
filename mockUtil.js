import Mock from "mockjs";

let kinds = ['cnstring', 'name', 'location', 'email', 'time',
    'id', 'image', 'string', 'number', 'boolean', 'array', 'object']

let stringTemplate = "abcdefghijklmnopqrstuvwxyz0123456789";

let handlers = {
    name: () => '@cname',
    location: (bool = true) => `@county(${bool})`,
    email: () => '@email',
    time: (temp) => `@date('${temp}')`,
    id: () => `@guid`,
    image: (obj) => `@image('${obj.size}','@color',@string('${stringTemplate}',${obj.string}))`,
    string: (length) => `@string('${stringTemplate}',${length})`,
    number: (length) => `@string('0123456789',${length})`,
    boolean: () => `@boolean`,
    cnstring: (length) => `@cword(${length})`,
    object: handleTemplateObject,
    array: handleTemplateArray
}

function handleTemplateObject(template) {
    let mockTemplate = {}
    for (let key in template) {
        let x = key.split('_');//第一个为自定义名称，第二个为数据类型
        if (x[1] === 'array') {//特例，处理数组的个数，以此作为key list|45
            let result = handlers[x[1]](template[key], x[0])
            mockTemplate[result.key] = [result.result]
        } else {
            mockTemplate[x[0]] = handlers[x[1]](template[key], x[0])//
        }
    }
    return mockTemplate;
}

function handleTemplateArray(template, name) {
    let {length, instance} = template;
    let keys = Object.keys(instance);
    let result;
    if (keys.length === 1) {
        result = handlers[keys[0]](instance[keys[0]])
        console.log(result)
    } else {
        result = handleTemplateObject(instance)
    }
    return {
        key: `${name}|${length}`,
        result
    };
}

export default function createMockServer(path = 'http://localhost:3000/', type = 'get', template = {}) {
    let result = handleTemplateObject(template)
    Mock.mock(path, type, result)
}

