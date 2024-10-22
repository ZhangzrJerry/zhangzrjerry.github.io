window.onload = function () {
    setInterval(clock, 1000);
    listen();
    currentUrl = window.location.href;
    // if (window.screen.availWidth < 768) {
    //     window.alert('For a better experience, please visit the website from desktop or switch to `view desktop site`.\n\n为了更好的浏览体验，请使用电脑访问，或者切换到`桌面版网页`。');
    // }
}

function listen() {
    if (window.location.href.includes('resume')) {
        document.getElementById('resume-corec-img').addEventListener('click', () => {
            if (document.getElementById('resume-corec-detail').style.display === 'block') {
                document.getElementById('resume-corec-detail').style.display = 'none';
                document.getElementById('resume-corec-img').style.transform = 'rotate(45deg)';
            } else {
                document.getElementById('resume-corec-detail').style.display = 'block';
                document.getElementById('resume-corec-img').style.transform = 'rotate(0deg)';
            }
        });
    }
    if (window.location.href.includes('projects')) {
        if (window.screen.availWidth < 768) {
            document.getElementsByClassName('academic-half').style.minWidth = 'none';
        }
    }
}

function clock() {
    var t = new Date().toLocaleTimeString();
    if (currentUrl != window.location.href) {
        currentUrl = window.location.href;
        console.log(t, 'redirected');
        listen();
    }
}