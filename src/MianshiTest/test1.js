
const data = [
    {id: '01', name:'zhangdada', pid:'00', job:'Project Manager'},
    {id: '02', name:'xiaoliang', pid:'01', job:'Product leader'},
    {id: '03', name:'xiaomei', pid:'01', job:'UI leader'},
    {id: '04', name:'laoma', pid:'01', job:'Jishu leader'},
    {id: '05', name:'laowang', pid:'01', job:'Test leader'},
    {id: '06', name:'laoli', pid:'01', job:'Yunwei leader'},
    {id: '07', name:'xiaoli', pid:'02', job:'chanping jingli'},
    {id: '08', name:'daguang', pid:'02', job:'chanping jingli'},
    {id: '09', name:'xiaogao', pid:'03', job:'UI designer'}
];

function arrToTree(data) {
    let tree = [];
    if(!Array.isArray(data)){
        return tree;
    };

    for(let item of data) {
        if(item.pid == "00") {
            tree.push(newObject(item));
        } else {
            let p = geteParent(tree, item.pid);
            if(p) {
                p.children.push(newObject(item));
            }
        }
    }
    return tree;
}

function newObject(item) {
    return {
        id:item.id,
        label:item.name,
        job:item.job,
        children:[],
    }
}

function geteParent(arr, sonpid) {
    for(let item of arr) {
        if(item.id === sonpid) {
            return item;
        } else if(item.children.length > 0) {
            const temp = geteParent(item.children, sonpid);
            if(temp) {
                return temp;
            } else {
                continue;
            }
        }
    }
    return null;
}

console.log(JSON.stringify(arrToTree(data), null ,2));
