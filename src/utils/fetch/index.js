import axios from 'axios'

function fetchData(url='',params={},method='get') {
    console.log(url)
    //返回promise对象
    return new Promise((resolve,reject) =>{
        //创建axios实例，把基本的配置放进去
        const instance = axios.create({
            //定义请求文件类型
            headers:{
                'Content-Type': 'application/json',
                'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Host': 'd.api.budejie.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
            },
            method,
            timeout: 30000,
            //定义请求根目录
            baseURL: '',

        });
        //请求成功后执行的函数
        instance(url,params).then(res =>{
            console.log(res);
            resolve(res.data);
            //失败后执行的函数
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });

}

export {fetchData}