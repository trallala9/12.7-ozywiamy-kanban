var prefix = 'https://cors-anywhere.herokuapp.com/';
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';

function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'Temp';

    this.element = createColumn();

    function createColumn() {
        // TWORZENIE NOWYCH WĘZŁÓW
        var column = $('<div class="column"></div>');
        var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
        var columnCardList = $('<ul class="card-list"></ul>');
        var columnDelete = $('<button class="btn btn-danger btn-delete">x</button>');
        var columnAddCard = $('<button class="btn btn-primary column-add-card">Dodaj kartę</button>');
        var columnEdit = $('<button class="btn btn-success btn-edit">Edit</button>');

        // PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
        columnDelete.click(function () {
            self.deleteColumn();
        });
        columnEdit.click(function () {
            self.editColumn();
        });

        columnAddCard.click(function (event) {
            var cardName = prompt("Enter the name of the card");
            event.preventDefault();
            $.ajax({
                url: prefix + baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function (response) {
                    var card = new Card(response.id, cardName);
                    self.createCard(card);
                }
            });
        });

        // KONSTRUOWANIE ELEMENTU KOLUMNY
        column.append(columnTitle)
            .append(columnEdit)
            .append(columnDelete)
            .append(columnAddCard)
            .append(columnCardList);
        return column;
    }
}
Column.prototype = {
    createCard: function (card) {
        this.element.children('ul').append(card.element);
    },
    deleteColumn: function () {
        var self = this;
        $.ajax({
            url: prefix + baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.element.remove();
            }
        });
    },
    editColumn: function () {
        var self = this;
        var newName = prompt('Enter new name of the column');
        $.ajax({
            url: prefix + baseUrl + '/column/' + self.id,
            method: 'PUT',
            data: {
                name: newName
            },
            success: function (response) {
                self.element.children('h2').text(newName);
            }
        });
    }
};
