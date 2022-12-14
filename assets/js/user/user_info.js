$(function () {
    var form = layui.form
    var layer = layui.layer

    //定义表单的验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的长度必须在 1~6 个字符之间！'
            }
        }
    })

    // 获取用户信息
    initUserInfo();

    // 初始化获取用户信息
    function initUserInfo() {
        // 发起 Ajax 请求
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                // 调用 form.val() 快速为表单赋值  form.val('filter', object);
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $("#btnReset").on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 重新获取用户信息
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 Ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
                // 此处 window 代表 iframe 区域，其父页面即为主页面
                // 主页面中有 getUserInfo 方法
            }
        })
    })
})