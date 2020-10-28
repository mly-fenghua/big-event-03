$(function() {
    // 点击注册账号，隐藏登录，显示注册
    $('#link-reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击登录，隐藏注册，显示登录
    $('#link-login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //自定义校验规则
    var form = layui.form;
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],

            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return " 两次密码不一致，请重新输入"
                }

            }
        })
        // 监听表单注册事件
    $('#form-reg').on("submit", function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/api/reguser',
                data: {
                    username: $('#form-reg [name=username]').val(),
                    password: $('#form-reg [name=password]').val(),
                },
                success: function(res) {
                    if (res.status !== 0) {
                        // 提交失败
                        return layer.msg(res.message)
                    }
                    // 提交成功
                    layer.msg('注册成功，请登录')
                        // 回退
                    $('#link-login').click()
                        // 清空
                    $('#form-reg')[0].reset()
                }
            })

        })
        // 监听表单登录事件
    $('#form-login').on("submit", function(e) {
        console.log(123);
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // 提交失败
                    return layer.msg(res.message)
                }
                // 提交成功
                layer.msg('登录成功!')
                    // 本地存储token值
                localStorage.setItem('token', res.token)
                    // 跳转页面
                location.href = "/index.html"
                    // 清空
                $('#form-reg')[0].reset()
            }
        })

    })




})