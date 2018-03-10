var prefix = 'https://cors-anywhere.herokuapp.com/';
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';

// KLASA KANBAN CARD
function Card(id, name, bootcamp_kanban_column_id) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.bootcamp_kanban_column_id = bootcamp_kanban_column_id;
    this.element = createCard();

    function createCard() {
        var card = $('<li class="card"></li>');
        var cardDeleteBtn = $('<button class="btn btn-danger btn-delete-card">x</button>');
        var cardDescription = $('<p class="card-description"></p>');
        var cardEdit = $('<button class="btn btn-success btn-edit">Edit</button>');

        cardDeleteBtn.click(function () {
            self.removeCard();
        });
        cardEdit.click(function () {
            self.editCard();
        });

        card.append(cardEdit);
        card.append(cardDeleteBtn);
        cardDescription.text(self.name);
        card.append(cardDescription);
        return card;
    }
}
Card.prototype = {
    removeCard: function () {
        var self = this;
        $.ajax({
            url: prefix + baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function () {
                self.element.remove();
            }
        });
    },
    editCard: function () {
        var self = this;
        var newName = prompt("Enter new name of the card");
        $.ajax({
            url: prefix + baseUrl + '/card/' + self.id,
            method: 'PUT',
            data: {
                name: newName,
                bootcamp_kanban_column_id: self.bootcamp_kanban_column_id
            },
            success: function (response) {
                self.element.children('p').text(newName);
            }
        });
    }
};
