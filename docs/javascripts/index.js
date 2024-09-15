window.onload = function () {
    setInterval(clock, 1000);
    listen();
    currentUrl = window.location.href;
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
}

function clock() {
    var t = new Date().toLocaleTimeString();
    if (currentUrl != window.location.href) {
        currentUrl = window.location.href;
        console.log(t, 'redirected');
        listen();
    }
}