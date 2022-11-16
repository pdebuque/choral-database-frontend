$(onReady);

function onReady() {
    setupClicks();
    $('#main-search').on('keydown', (e) => {
        // console.log('key down: ', e.keyCode);
        if (e.key === 'Enter') {
            searchDatabase()
        }
    })
}

function setupClicks() {

}

function searchDatabase() {
    const searchTerm = $('#main-search').val();
    console.log('search created with search term ', searchTerm);

    // send through a module. this returns an object of parameters
    const parsedSearch = parseSearch(searchTerm);
    console.log('parsed search: ', parsedSearch);

    $.ajax({
        type: 'GET',
        url: `/search`,
        data: parsedSearch
    }).then((response) => {
        renderDisplay(response);
    }).catch((err) => {
        console.log('could not get results', err)
    })
}

// function searchByComposer() {
//     // ajax get to server

//     const searchTerm = $('#main-search').val();

//     $.ajax({
//         type: 'GET',
//         url: `/search/composer/${searchTerm}`
//     }).then((result) => {
//         console.log('got results');
//         renderDisplay(result);
//     }).catch((err) => {
//         console.log('could not get results', err)
//     })
// }

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