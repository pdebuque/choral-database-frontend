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
    $('#all-content').removeClass('search-blank');
    $('#all-content').addClass('search-active');

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
            <div class="card piece-card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${result.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${result.composer}</h6>
                        <p class="card-text">composed: ${result.date}. length: ${secondsToMinutes(result.duration)}</p>
                        <a href="${result.link_to_piece}" class="card-link">Link to piece</a>
                        <a href="${result.url}" class="card-link">Link to composer</a>
                    </div>
            </div>
        `)
    }
}