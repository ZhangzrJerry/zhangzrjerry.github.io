currentUrl = '';

window.onload = function () {
    setInterval(clock, 1000);
    listen();
    currentUrl = window.location.href;
}

function listen() {
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
    if (document.getElementsByClassName('academic-img').length > 0) {
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
    // if (document.getElementsByClassName('nt-timeline-dot')) {
    //     x = document.getElementsByClassName('nt-timeline-dot');
    //     for (i = 0; i < x.length; i++) {
    //         const range = [150, 160, 170, 185, 200, 225, 255];
    //         const mod = range.length - 2;
    //         const r = randint(0, mod), g = randint(0, mod), b = randint(0, mod);
    //         console.log('nt-timeline', r, g, b);
    //         const rgb = 'rgb(' + randint(range[r], range[r + 1]) + ',' + randint(range[g], range[g + 1]) + ',' + randint(range[b], range[b + 1]) + ')';
    //         x[i].style.cssText = 'background-color:' + rgb + '!important;';
    //         print(2, 'nt-timeline-dot-' + i, 'color set to ' + rgb);
    //     }
    // }
    if (document.getElementsByClassName('resume-icon')) {
        x = document.getElementsByClassName('resume-icon');
        for (i = 0; i < x.length; i++) {

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

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function print(type, object, message) {
    switch (type) {
        case 0:
            console.log(time(), '[' + object + ']', message);
            break;
        case 1:
            console.log(time(), '{' + object + '}', message);
            break;
        case 2:
            console.log(time(), '(' + object + ')', message);
            break;
    }
}