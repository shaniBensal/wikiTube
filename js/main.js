'use strict';

function init() {
    createPopKey();
    getInput();
}

function getInput(searchPop) {
    var input = document.querySelector('input');
    var inputVal = input.value;
    if (!inputVal && !searchPop) inputVal = 'dog';
    else if (searchPop) inputVal = searchPop;
    loadYoutubeResults(inputVal);
    getWiki(inputVal);
    addToPopKey(inputVal);
}

function renderVidList() {
    var strHtmlsSmallVid = gDataVids.map(function (vid, idx) {
        return `
        <li class="list-item flex " onclick="changeVid(${idx})">
        <img src="${vid.snippet.thumbnails.default.url}" alt="">
         ${vid.snippet.title}
        </li>`;
    })
    document.querySelector('.vid-list').innerHTML = strHtmlsSmallVid.join('');
}

function renderSelectedVid(idx) {
    var index;
    if (!idx) index = 0;
    else index = idx;
    var strHtmlBigVid =
        `<iframe class="iframe-vid" width="500" height="390" src="https://www.youtube.com/embed/${gDataVids[index].id.videoId}">
    </iframe>`
    document.querySelector('.video-youtube').innerHTML = strHtmlBigVid;
}

function renderWik(data) {
    var strHtmlsWiki = '';
    for (var i = 0; i < data[1].length; i++) {
        strHtmlsWiki += `<h2> ${data[1][i]} </h2>
        <p>${data[2][i]}</p>`;
    }
    document.querySelector('.wiki-info').innerHTML = strHtmlsWiki;
}

function renderPopKey() {
    var strHTML = '';
    gPopKey.forEach(function (val) {
        strHTML += `
        <li class="pop-key align-center" onclick="getInput('${val}')">
        ${val}
    </li>
    `
    });
    document.querySelector('.popular-key-words').innerHTML = strHTML;
}