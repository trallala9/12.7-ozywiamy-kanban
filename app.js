var prefix = 'https://cors-anywhere.herokuapp.com/';
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '2685',
    'X-Auth-Token': 'c54318ff1fc69acba0dbd6506a0f49c1'
};

$.ajaxSetup({
    headers: myHeaders
});

$.ajax({
    url: prefix + baseUrl + '/board',
    method: 'GET',
    success: function (response) {
        setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function (card) {
        var newCard = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(newCard);
    });
}

function createCard(card) {
    this.element.children('ul').append(card.element);
}
