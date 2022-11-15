$(function () {
    // 调用 getUserInfo 获取用户的基本信息
    getUserInfo()
    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页
            location.href = './login.html'
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    // 发起 Ajax 请求
    // 以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        // 在 baseAPI 中统一为有权限的接口，添加 headers 请求头，此处请求头就可省略不写
        // header: 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },

        success: function (res) {
            // 如果获取失败
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 如果获取成功
            // 调用函数 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },

        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
        //     // 在 complete 回调函数中，可以使用 res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页
        //         location.href = './login.html'
        //     }
        // }
    })
}

// 定义函数 renderAvatar 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称 nickname 的优先级大于 username
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name)

    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()//将用户名第一个字符选出来，并转换成大写
        $('.text-avatar').html(first).show()
    }

}