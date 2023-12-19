const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
        {
            name: '你很勇哦',
            artist: 'unkonw',
            // 链接或者music下的音乐文件
            url: '/music/你很勇哦.mp3'
        }
    ]
});