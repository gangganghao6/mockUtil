// @ts-ignore
import Mock from "mockjs";

const kinds: string[] = [
    "cnstring",
    "name",
    "location",
    "email",
    "time",
    "id",
    "image",
    "string",
    "number",
    "boolean",
    "array",
    "object",
];

const stringTemplate: string = "abcdefghijklmnopqrstuvwxyz0123456789";

interface HanndlersInterface {
    name(): string,

    location(bool: boolean): string,

    email(): string,

    time(temp: string): string,

    id(): string,

    image(obj: {
        size: string,
        string: string
    }): string,

    string(length: number): string,

    number(length: number): string,

    boolean(): string,

    cnstring(length: number): string,

    object(template: object): object | string,

    array(template: object): object | string,
}

const handlers: HanndlersInterface = {
    name: () => "@cname",
    location: (bool = true) => `@county(${bool})`,
    email: () => "@email",
    time: (temp) => `@date('${temp}')`,
    id: () => `@guid`,
    image: (obj) =>
        `@image('${obj.size}','@color',@string('${stringTemplate}',${obj.string}))`,
    string: (length) => `@string('${stringTemplate}',${length})`,
    number: (length) => `@string('0123456789',${length})`,
    boolean: () => `@boolean`,
    cnstring: (length) => `@cword(${length})`,
    object: handleTemplateObject,
    array: handleTemplateObject,
};

function handleTemplateObject(template: any): any {
    const mockTemplate: any = {};
    for (const templateKey in template) {
        let splits: string[] = templateKey.split("_");
        const [name, type = '', length = 0] = splits; //第一个为自定义名称，第二个为数据类型
        const templateObject: any = template[templateKey];
        if (type === 'array') {
            mockTemplate[`${name}|${length}`] = [handlers[type](templateObject)]
        } else if (splits.length === 1) {
            return handlers[name](templateObject)
        } else if (splits.length === 2) {
            mockTemplate[name] = handlers[type](templateObject);
        }
    }
    return mockTemplate;
}

export default function createMockServer(
    path: string = "http://localhost:3000/",
    type: string = "get",
    template: any = {}
): void {
    const result: object = handleTemplateObject(template);
    Mock.mock(path, type, result);
}
