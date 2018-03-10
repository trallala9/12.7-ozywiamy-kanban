var prefix = 'https://cors-anywhere.herokuapp.com/';
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';

var board = {
    name: 'Tablica Kanban',
    createColumn: function (column) {
        this.element.append(column.element);
        initSortable();
    },
    element: $('#board .column-container')
};

$('.create-column').click(function () {
    var columnName = prompt('Enter a column name');
    $.ajax({
        url: prefix + baseUrl + '/column',
        method: 'POST',
        data: {
            name: columnName
        },
        success: function (response) {
            var column = new Column(response.id, columnName);
            board.createColumn(column);
        }
    });
});

function initSortable() {
    $('.card-list').sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder'
        /*
        activate: function(event, ui) {
            console.log(event);
            console.log(ui);
        }
        */
    }).disableSelection();
}
