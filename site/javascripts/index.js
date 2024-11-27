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
    if (document.getElementsByClassName('nt-timeline-dot')) {
        x = document.getElementsByClassName('nt-timeline-dot');
        rgb = randomColors(x.length);
        for (i = 0; i < x.length; i++) {
            if (predefined['timelinecolor'].length > i) {
                x[i].style.cssText = 'background-color:' + predefined['timelinecolor'][i] + '!important;border:1px solid grey;box-shadow: 3px 3px 20px -10px black;';
            }
            else {
                x[i].style.cssText = 'background-color:' + rgb[i] + '!important;';
            }
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

function randomColors(num) {
    let hsl = [];
    let rgb = [];
    for (let i = 0; i < num; i++) {
        h = Math.random();
        s = Math.random();
        l = Math.random();
        if (i > 0 && Math.abs(h - hsl[i - 1][0]) < 0.2) {
            i--;
            continue;
        }
        hsl.push([h, s, l]);
        var hsl2rgb = function (p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        r = hsl2rgb(p, q, h + 1 / 3);
        g = hsl2rgb(p, q, h);
        b = hsl2rgb(p, q, h - 1 / 3);
        rgb.push('rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')');
    }
    return rgb;
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

const predefined = {
    "timelinecolor": [
        "#e8deed",
        "#fff6CF",
        "#E0EAFB",
        "#EDDDF4",
        "#EAEAEA",
        "#E0F6FF",
        "#b78026",
        "#e6e4e2",
        "#E7F7E5"
    ]
}