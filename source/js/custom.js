/*
 * @Author: wesker
 * @Date: 2022-09-12 16:59:50
 * @FilePath: \hexo-theme-gal\source\js\custom.js
 * Copyright (c) 2022 by wesker hentai121@163.com, All Rights Reserved. 
 */
/*页面载入完成后，创建复制按钮*/
!function (e, t, a) { 
    /* code */
    var initCopyCode = function(){
        var copyHtml = '';
        copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
        copyHtml += 'copy';
        copyHtml += '</button>';
        $(".highlight .code").before(copyHtml);
        new ClipboardJS('.btn-copy', {
            target: function(trigger) {
                return trigger.nextElementSibling;
            }
        });
    }
    initCopyCode();
}(window, document);