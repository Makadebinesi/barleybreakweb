'use strict';

const spaceValue = '';

const winResultArea = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, spaceValue],
];

var testWinArea = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, spaceValue, 14, 15],
];

var area = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, spaceValue],
];

(function () {
    onclickInit();
    refresh();
}());

function refresh() {
    fillRandomArea(); //winTestFillArea - для тестирования логики завершения
    initGameBoard();
    document.querySelector('.win-label').hidden = true;
}

function onclickInit() {
    let tds = document.getElementsByTagName('td');
    for (const td of tds) {
        td.addEventListener('click', (event) => {
            let cellId = event.currentTarget.id;
            let content = getContentBlock(cellId);
            changeCell(cellId, content.innerText);
        });
    }
}

function fillRandomArea() {
    let yRand, xRand, tempValue;
    for (let y = 3; y >= 0; y--) {
        for (let x = 3; x >= 0; x--) {
            yRand = Math.floor(Math.random() * (y + 1));
            xRand = Math.floor(Math.random() * (x + 1));
            tempValue = area[y][x];
            area[y][x] = area[yRand][xRand];
            area[yRand][xRand] = tempValue;
        }
    }
}

function winTestFillArea() {
    area = testWinArea;
}

function initGameBoard() {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            let content = getContentBlock(`pos-${x}-${y}`);
            content.innerText = area[y][x];
        }
    }
}


function changeCell(cellId, cellValue) {
    let coordinateArr = cellId.split('-');
    var x = +coordinateArr[1];
    var y = +coordinateArr[2];

    try {
        if (area[y - 1][x] == spaceValue) {
            area[y][x] = spaceValue;
            area[y - 1][x] = cellValue;
            moveCells(`pos-${x}-${y}`, `pos-${x}-${y - 1}`, AnimDirection.Up);
        }
    }
    catch { };

    try {
        if (area[y + 1][x] == spaceValue) {
            area[y][x] = spaceValue;
            area[y + 1][x] = cellValue;
            moveCells(`pos-${x}-${y}`, `pos-${x}-${y + 1}`, AnimDirection.Down);
        }
    }
    catch { };

    try {
        if (area[y][x - 1] == spaceValue) {
            area[y][x] = spaceValue;
            area[y][x - 1] = cellValue;
            moveCells(`pos-${x}-${y}`, `pos-${x - 1}-${y}`, AnimDirection.Left);
        }
    }
    catch { };

    try {
        if (area[y][x + 1] == spaceValue) {
            area[y][x] = spaceValue;
            area[y][x + 1] = cellValue;
            moveCells(`pos-${x}-${y}`, `pos-${x + 1}-${y}`, AnimDirection.Right);
        }
    }
    catch { };

    let winLabel = document.querySelector('.win-label');
    if (checkWin()) {
        winLabel.hidden = false;
    } else {
        winLabel.hidden = true;
    }
}

function moveCells(cellIdOne, cellIdTwo, cellOneAnimDirection) {
    let cell1 = document.getElementById(cellIdOne);
    let cell2 = document.getElementById(cellIdTwo);
    let cont1 = document.querySelector(`#${cellIdOne} .cell-content`);
    let cont2 = document.querySelector(`#${cellIdTwo} .cell-content`);

    let translateCont1;
    let translateCont2;
    switch (cellOneAnimDirection) {
        case AnimDirection.Up:
            translateCont1 = 'translateY(-54px)'
            translateCont2 = 'translateY(54px)'
            break;
        case AnimDirection.Down:
            translateCont1 = 'translateY(54px)'
            translateCont2 = 'translateY(-54px)'
            break;
        case AnimDirection.Right:
            translateCont1 = 'translateX(54px)'
            translateCont2 = 'translateX(-54px)'
            break;
        case AnimDirection.Left:
            translateCont1 = 'translateX(-54px)'
            translateCont2 = 'translateX(54px)'
            break;
    }

    let animOpt = {
        duration: 150,
    }

    cont1.animate([
        { transform: translateCont1 }
    ], animOpt)
    .onfinish = () => {
        cell2.appendChild(cont1);
    };

    cont2.animate([
        { transform: translateCont2 }
    ], animOpt)
    .onfinish = () => {
        cell1.appendChild(cont2);
    };
}
   

function getContentBlock(cellId) {
    return document.querySelector(`#${cellId} .cell-content span`);
}

function checkWin() {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (winResultArea[x][y] != area[x][y]) {
                return false;
            }
        }
    }
    return true;
}

class AnimDirection {
    static Up = 'up';
    static Down = 'down';
    static Right = 'right';
    static Left = 'left';
}