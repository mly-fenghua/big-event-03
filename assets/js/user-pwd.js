$(function() {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return "两次密码不能一致!"
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return " 两次密码不一致，请重新输入"
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(this).serialize(),
            url: '/my/updatepwd',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功!')
                $('.layui-form')[0].reset();
            }
        })
    })
})