'use strict';

var gDataVids;
var WIKI_KEY = 'wiki_key';
var gPopKey = [];

function createPopKey() {
    var pop = loadFromStorage(WIKI_KEY);
    if (pop) {
        gPopKey = pop;
    } else {
        gPopKey = ['dog', 'cat', 'baby', 'song'];
    }
    saveToStorage(WIKI_KEY, gPopKey);
    renderPopKey();
}

function addToPopKey(val) {
    if (gPopKey.indexOf(val) === -1) {
        gPopKey.push(val);
        renderPopKey();
        saveToStorage(WIKI_KEY, gPopKey);
    }
    else return;
}

function loadYoutubeResults(value) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyBTXVHh3graHJupAi9hxKUHd8lthqp_vY8&q=${value}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            gDataVids = data.items;
            renderVidList();
            renderSelectedVid();
        })
}

function getWiki(value) {
    fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${value}&limit=5`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            renderWik(data);
        })
}

function changeVid(idx) {
    renderSelectedVid(idx);
}

function clearLocalStorage() {
    swal({
        title: 'A page without history is A sad page!',
        text: 'Once deleted, you will not be able to recover this imaginary file!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    })
        .then(function (willDelete) {
            if (willDelete) {
                swal('Poof! Your history has been deleted!', {
                    icon: 'success',
                });
                clearStorage();
                var strHTML = `NO HISTORY FOR DISPLAY!`;
                document.querySelector('footer').innerHTML = strHTML;
            } else {
                swal('Your history is safe with me!');
            }
        });
}
