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
        copyHtml += '<button class="btn-copy" data-clipboard-snippet="" title="复制代码">';
        copyHtml += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><rect x="3" y="3" width="10" height="10" rx="2" fill="#fff" stroke="#888" stroke-width="1.2"/><rect x="6" y="1" width="7" height="7" rx="1.5" fill="#eee" stroke="#bbb" stroke-width="1"/></svg>';
        copyHtml += '<span class="copy-text">复制</span>';
        copyHtml += '</button>';
        $(".highlight .code").before(copyHtml);
        var clipboard = new ClipboardJS('.btn-copy', {
            target: function(trigger) {
                return trigger.nextElementSibling;
            }
        });
        clipboard.on('success', function(e) {
            e.clearSelection();
            var btn = $(e.trigger);
            var textSpan = btn.find('.copy-text');
            var oldText = textSpan.text();
            textSpan.text('已复制');
            btn.addClass('copied');
            setTimeout(function(){
                textSpan.text(oldText);
                btn.removeClass('copied');
            }, 1200);
        });
    }
    initCopyCode();
}(window, document);