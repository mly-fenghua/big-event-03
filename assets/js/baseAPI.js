//开发环境
var baseUrl = 'http://ajax.frontend.itheima.net'
    // 测试环境
    // var baseUrl = 'http://ajax.frontend.itheima.net'
    // 运行环境
    // var baseUrl = 'http://ajax.frontend.itheima.net'
    // $.ajaxPrefilter()绑定在ajax之前,并在ajax请求之后触发，最后ajax才真正发送。
$.ajaxPrefilter(function(options) {
    options.url = baseUrl + options.url

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
})