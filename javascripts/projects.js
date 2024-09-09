window.onload = function () {
    setInterval(clock, 1000);
    init();
}

function init() {
    if (window.location.href.includes('projects')) {
        fetch("/deploy/projects.json").then(response => response.json()).then(res => {
            data = res;
        });
    }
    viewmoreidx = -1;
    render();
}

function listen() {
    document.getElementById('viewmore').addEventListener('scroll', () => {
        document.getElementById('viewmore-exit').style.top = (document.getElementById('viewmore').scrollTop) + 'px';
    });
    window.addEventListener('resize', () => {
        render();
    });
    document.onkeydown = function (e) {
        if (e.key == 'Escape' && viewmoreidx > -1) {
            viewless();
        }
        if (e.key == 'ArrowRight' && viewmoreidx > -1) {
            viewmoreidx++;
            if (viewmoreidx == data.length) viewmoreidx = 0;
            viewmore(viewmoreidx);
        }
        if (e.key == 'ArrowLeft' && viewmoreidx > -1) {
            viewmoreidx--;
            if (viewmoreidx == -1) viewmoreidx = data.length - 1;
            viewmore(viewmoreidx);
        }
        if (e.key == 'ArrowUp' && viewmoreidx > -1) {
            document.getElementById('viewmore').scrollBy(0, -50);
        }
        if (e.key == 'ArrowDown' && viewmoreidx > -1) {
            document.getElementById('viewmore').scrollBy(0, 50);
        }
    }
}

function clock() {
    var t = new Date().toLocaleTimeString();
    // check if the grid is empty
    if (window.location.href.includes('projects')) {
        if (document.getElementById('overview-grid').innerHTML.length < 3) {
            console.log(t, "rerendered");
            init();
        }
        listen();
    }
}

function render() {
    // fullfill the grid with cards
    let element = document.getElementById('overview-grid');
    if (!element) return;
    element.innerHTML = '';
    try {
        console.log(data);
    } catch (e) {
        return;
    }
    // decide how many pools by the width of the window
    let pools = Math.max((element.scrollWidth - 150) / 200, 1);
    for (let i = 0; i < pools; i++) {
        element.innerHTML += `<div class="pool" id="pool-${i}"></div>`;
    }
    while (!document.getElementById('pool-0')) { }
    for (let i = 0; i < data.length; i++) {
        let minHeight = document.getElementById("pool-0").offsetHeight;
        console.log(minHeight);
        let pickPool = 0;
        for (let j = 1; j < pools; j++) {
            if (document.getElementById("pool-" + j).offsetHeight < minHeight) {
                minHeight = document.getElementById("pool-" + j).offsetHeight;
                pickPool = j;
            }
            console.log(document.getElementById("pool-" + j).offsetHeight);
        }
        console.log(document.getElementById("pool-" + pickPool).offsetHeight);
        document.getElementById("pool-" + pickPool).innerHTML += `
            <div class="card">
                <div class="card-image">
                    <img src=${data[i].image} class="card-image">
                </div>
                <div class="category">
                ${data[i].brief}
                </div>
                <div class="heading">
                    ${data[i].heading}
                    <div class="sign">
                        <div class="author">
                            ${data[i].prefix}
                            <span class="name">
                                ${data[i].author}
                            </span>
                        </div>
                        <div class="date">
                            ${data[i].date}
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="description">
                        ${data[i].introduction[0]}
                    </div>
                    <button onClick="viewmore(${i})" class="view">
                        [ view more ]
                    </button>                 
                </div>
            </div>
        `;
    }
}

function viewmore(idx) {
    if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/Mobi/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        window.alert("for a better experience, please visit this page on a desktop browser or switch to desktop mode");
    }
    viewmoreidx = idx;
    document.getElementById('viewmore').innerHTML = `
        <img src=${data[idx].image} class="viewmore-cover">
        <button id="viewmore-exit" class="Btn" onClick="viewless()">
            <div class="exit"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div class="text">EXIT</div>
        </button>
        <p class="viewmore-heading">
            ${data[idx].heading}
        </p>
        <div class="viewmore-content" id="viewmore-content">
        </div>
    `;
    for (let i = 0; i < data[idx].introduction.length; i++) {
        document.getElementById('viewmore-content').innerHTML += `${data[idx].introduction[i]}`;
    }
    document.getElementById('viewmore').style.display = 'grid';
    document.getElementById('viewmore-exit').style.marginLeft = (document.getElementById('viewmore').offsetWidth - 55) + 'px';
    document.getElementById('bodyover-container').style.display = 'block';
}

function viewless() {
    viewmoreidx = -1;
    document.getElementById('viewmore').innerHTML = '';
    document.getElementById('viewmore').style.display = 'none';
    document.getElementById('bodyover-container').style.display = 'none';
}

window.onresize = function () {
    if (viewmoreidx > -1) {
        document.getElementById('viewmore-exit').style.marginLeft = (document.getElementById('viewmore').offsetWidth - 55) + 'px';
    }
}