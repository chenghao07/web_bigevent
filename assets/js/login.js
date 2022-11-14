$(function () {
    // 点击‘注册账号’的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 去登录 的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    // 从 layui 中获取 layer 对象，用于弹出提示内容
    var layer = layui.layer

    // 通过 form.verify() 函数定义自定义校验规则
    form.verify({
        // 自定义一个叫做 pwd 的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到确认密码框中的值
            // 还需要拿到密码框中的值
            // 然后进行一次等于的判断
            // 如果判断失败，则 return 一个提示消息
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2. 发起 Ajax 的 post 请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }

        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');

            // 模拟点击行为，从注册页面切换到登录页面
            $('#link_login').click();
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起 Ajax 请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速请求表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // console.log(res.token);
                // 将登录成功得到的 token 字符串，保存到localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = './index.html'
            }
        })
    })
})