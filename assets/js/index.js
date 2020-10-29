// 入口函数
$(function() {
            // 获取用户信息，头像，用户名
            getUserInfo()

            var layui = layui.layer
            $('#btnLogout').on('click', function() {
                layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
                    //do something
                    // 清除本地
                    localStorage.removeItem('token')
                        // 跳转登录
                    location.href = '/login.html'
                        // 关闭询问框
                    layer.close(index);
                })
            });
            // 封装在入口函数之外
            // 其他页面也要调用
            function getUserInfo() {
                $.ajax({
                    url: '/my/userinfo',
                    // 以 /my 开头的请求路径，需要在请求头中携带 
                    // Authorization 身份认证字段，才能正常访问成功

                    success: function(res) {
                        if (res.status !== 0) {
                            return layui.layer.msg(res.message);
                        }
                        renderAvatar(res.data);
                    }
                })
            }
            // 封装函数头像内容
            function renderAvatar(user) {
                var name = user.nickname || user.username;
                $('.welcome').html("欢迎&nbsp;&nbsp" + name)

                if (user.user_pic !== null) {
                    // 显示图片
                    $('.layui-nav-img').show().attr("src", user.user_pic)
                    $('.text-avatar').hide()
                } else {
                    // 显示字母图片
                    $('.layui-nav-img').hide()
                    var text = name[0].toUpperCase();
                    $('.text-avatar').show().html(text);
                }
            }