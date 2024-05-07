
var numSelected = null; // Guarda el número que el usuario eligió
var tileSelected = null; //Guarda la celda en donde el ususario desea pner el número
var errors = 0; //Guarda los errores que el usuario a cometido

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() { //Abre la ventana
    setGame();
}

function setGame() {
    // Digitos 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Tablero 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);                  1
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){  //Se activa al escoger un número, guarda el seleccionado y elimina el anterior seleccionado
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {  //Coloca el número seleccionado si esta vació el espacio y coincide, si no este aumenta un error al contador y verifica si se alcanza el límite de errores
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

// Función para obtener el estado actual del tablero
function getCurrentBoardState() {
    let currentBoardState = [];
    let tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        let value = tile.innerText.trim() || "-";
        currentBoardState.push(value);
    });
    return currentBoardState;
}

// Función para comparar dos tableros (El del usuario y el de la solución)
function compareBoards(board1, board2) {
    for (let i = 0; i < board1.length; i++) {
        if (board1[i] !== board2[i]) {
            return false;
        }
    }
    return true;
}

function restartGame() {   //Funcion para reiniciar el juego
    // Reiniciar errores
    numSelected = null;
    errors = 0;
    document.getElementById("errors").innerText = errors;

    // Eliminar solo los números ingresados por el usuario
    let tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        if (!tile.classList.contains("tile-start")) {
            tile.innerText = "";
        }
    });
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            checkWin();
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            if (errors >= 10) {
                alert("Has excedido el límite de errores. ¡El juego se reiniciará!");
                restartGame(); // Reiniciar el juego automáticamente
            } else {
                checkLoss(); // Verificar si el juego ha sido perdido después de cometer un error
            }
        }
    }
}

function comprobar() { //Función para comprobar si el tablero es correcto o incorrecto al compararlos
    let currentBoard = getCurrentBoardState();
    if (compareBoards(currentBoard, solution)) {
        alert("El tablero es correcto  ¡FELICIDADES! ");
    } else {
        alert("El tablero es incorrecto");
    }
}