// 注意：每次调用$.get() 或者 $.post() 或者 $.ajax() 请求的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中 ，可以拿到我们给 Ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    // 发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为有权限的接口，添加 headers 请求头
    // 根据请求的 路径 判断 请求是否需要 权限
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // 在 complete 回调函数中，可以使用 res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token')
            // 强制跳转到登录页
            location.href = './login.html'
        }
    }
})
