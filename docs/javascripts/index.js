currentUrl = '';

window.onload = function () {
    setInterval(clock, 1000);
    listen();
    currentUrl = window.location.href;
}

function listen() {
    if (window.location.href.includes('resume')) {
        if (document.getElementById('resume-corec-detail')) {
            document.getElementById('resume-corec-img').addEventListener('click', () => {
                if (document.getElementById('resume-corec-detail').style.display === 'block') {
                    document.getElementById('resume-corec-detail').style.display = 'none';
                    document.getElementById('resume-corec-img').style.transform = 'rotate(45deg)';
                    print(0, 'resume-corec-img', 'collapsed');
                } else {
                    document.getElementById('resume-corec-detail').style.display = 'block';
                    document.getElementById('resume-corec-img').style.transform = 'rotate(0deg)';
                    print(0, 'resume-corec-img', 'expanded');
                }
            });
        }
    }
    if (window.location.href.includes('projects')) {
        if (window.screen.availWidth < 768) {
            document.getElementsByClassName('academic-half').style.minWidth = 'none';
        }
        x = document.getElementsByClassName('academic-img');
        for (i = 0; i < x.length; i++) {
            const id = x[i].getAttribute('id');
            const element = document.getElementById(id);
            if (element == null) {
                continue;
            }
            element.addEventListener('mouseover', () => {
                value = element.getAttribute('value');
                element.setAttribute('value', element.getAttribute('src'));
                element.setAttribute('src', value);
                print(0, id, 'mouse over');
            });
            element.addEventListener('mouseout', () => {
                value = element.getAttribute('value');
                element.setAttribute('value', element.getAttribute('src'));
                element.setAttribute('src', value);
                print(0, id, 'mouse out');
            });
        }
    }
}

function clock() {
    var t = time();
    if (currentUrl != window.location.href) {
        print(1, currentUrl, 'URL changed to ' + window.location.href);
        currentUrl = window.location.href;
        listen();
    }
}

function time() {
    return new Date().toLocaleTimeString();
}

function print(type, object, message) {
    switch (type) {
        case 0:
            console.log(time(), '[', object, ']', message);
            break;
        case 1:
            console.error(time(), '{', object, '}', message);
            break;
    }
}