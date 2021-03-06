createHTMLTable()


const view = {
    displayMessage: function(message) {
        document.getElementById("messageArea").innerHTML = message;
    },
    displayHit: function(location) {
        document.getElementById(location).setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        document.getElementById(location).setAttribute("class", "miss");
    }
}

const model = {
    boardSize: 7,
    numberOfShips: 3,
    lengthOfAShip: 3,
    shipsSunk: 0,

    ships: [
        { locations: ["06", "16", "26"], hits: ["", "", ""] },
        { locations: ["24", "34", "44"], hits: ["", "", ""] },
        { locations: ["10", "11", "12"], hits: ["", "", ""] },
    ],

    fire: function(guess) {

        for (let i = 0; i < this.numberOfShips; i++) {
            const ship = this.ships[i];
            const index = ship.locations.indexOf(guess);
            if (index >= 0) { //The guess hit a ship
                ship.hits[index] = "hit";

                view.displayHit(guess);
                view.displayMessage("HIT!");

                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }

            view.displayMiss(guess);
            view.displayMessage("You missed!");

            return false;
        }
    },

    isSunk: function(ship) {
        for (let i = 0; i < this.numberOfShips; i++) {
            if (ship.hits[0] !== "hit") {
                return false;
            }
            return true;
        }
    }
};

const controller = {
    guesses: 0,

    processGuess: function() {


    },
}

function parseGuess(guess) {
    if (guess == null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");

    } else {
        const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        const firstChar = guess.charAt(0);
        const row = alphabet.indexOf(firstChar);
        const column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize ||
            column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board.")
        } else {
            return row + column;
        }
        return null;
    }
}