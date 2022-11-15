$(onReady);

function onReady() {
    setupClicks();
    $('#main-search').on('keydown', (e) => {
        console.log('key down: ', e.keyCode);
        if (e.keyCode === 13) {
            searchByComposer()
        }
    })
}

function setupClicks() {

}


function searchByComposer() {
    // ajax get to server

    const searchTerm = $('#main-search').val();

    $.ajax({
        type: 'GET',
        url: `/search/composer/${searchTerm}`
    }).then((result) => {
        console.log('got results');
        renderDisplay(result);
    }).catch((err) => {
        console.log('could not get results', err)
    })
}

// ---------------- render ---------------

function renderDisplay(arr) {
    console.log('in renderDisplay()');
    $('#search-display').empty();
    for (let result of arr) {
        $('#search-display').append(`
            <div class="search-result">
                ${result.title}
            </div>
    `)
    }
}