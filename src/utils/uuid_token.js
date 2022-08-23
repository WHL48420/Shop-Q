import { v4 as uuidv4 } from 'uuid';
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
export const getUuid = () => {
    //查询||接收
    let uuid = localStorage.getItem('UUIDTOKEN')
        //如果没有
    if (!uuid) {
        //生成uuid
        uuid = uuidv4()
            //存
        localStorage.setItem('UUIDTOKEN', uuid)
    }
    return uuid
}