/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/4/2
 * @description
 *
 */


/**
 * Base function extended jQuery for ajax from
 */
(function($) {
  $.fn.extend({

    /**
     * 封装改写form表单的默认请求，改成ajax请求
     * @param done : 成功的回调函数
     * @param fail : 失败的回调函数
     * @returns {*}
     */
    ajaxForm: function (done, fail) {
      return this.each(function () {
        var form   = $(this),
          action = form.attr('action'),
          method = form.attr('method'),
          data   = {};

        form.find('input').each(function () {
          if ($(this).attr('type') === 'radio' || !$(this).val()){
            return ;
          }
          data[$(this).attr('name')] = $(this).val();
        });

        form.find('input:checked').each(function () {
          data[$(this).attr('name')] = $(this).val();
        });

        $.ajax({
          url: action,
          method: method,
          data: data,
          dataType: 'json'
        })
          .done(done)
          .fail(fail);
      });
    },

    /**
     * 封装改写form表单的默认请求，改成socket请求
     * @param socket
     * @param done
     * @param fail
     * @returns {*}
     */
    socketForm: function (socket, done, fail) {
      return this.each(function () {
        var form   = $(this),
          action = form.attr('action'),
          data   = {};
        form.find('input').each(function () {
          if ($(this).attr('type') === 'radio' || !$(this).val()){
            return ;
          }
          if ($(this).attr('type') === 'checkbox'){
            if (!$(this).is( ":checked" )){
              return
            }
            data[$(this).attr('name')] = $(this).val();
          }
          data[$(this).attr('name')] = $(this).val();
        });
        socket.get(action, data, done, fail);
      });
    }
  });
})(jQuery);
