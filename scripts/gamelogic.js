const spaceValue = '';

const winResultArea = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, spaceValue],
];

var area = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, spaceValue],
];

onclickInit();
fillRandomArea();
initGameBoard();

function onclickInit() {
    let tds = document.getElementsByTagName('td');
    for (const td of tds) {
        td.onclick = (event) => {
            changeCell(event.target.textContent);
        }
    }
}

function fillRandomArea() {
    let yRand, xRand, tempValue;
    for (let y = 3; y >= 0; y--) {
        for (let x = 3; x >= 0; x--) {
            yRand = Math.floor(Math.random()*(y + 1));
            xRand = Math.floor(Math.random()*(x + 1));
            tempValue = area[y][x];
            area[y][x] = area[yRand][xRand];
            area[yRand][xRand] = tempValue;
        }
    }
}

function initGameBoard() {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            let cell = document.getElementById(`${x}-${y}`);
            cell.innerText = area[y][x];
        }
    }
}

function changeCell(num) {
    //Ищем "координаты" элемента
    var x, y;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (area[i][j] == num) {
                x = i;
                y = j;
            }
        }
    }
    //Проверяем, есть ли элемент со значением 0 (пустой квадрат) с какой-либо стороны, меняем местами значения если так.
    try {
        if (area[x - 1][y] == spaceValue) {
            area[x][y] = spaceValue;
            area[x - 1][y] = num;
        }
    }
    catch { };

    try {
        if (area[x + 1][y] == spaceValue) {
            area[x][y] = spaceValue;
            area[x + 1][y] = num;
        }
    }
    catch { };

    try {
        if (area[x][y - 1] == spaceValue) {
            area[x][y] = spaceValue;
            area[x][y - 1] = num;
        }
    }
    catch { };

    try {
        if (area[x][y + 1] == spaceValue) {
            area[x][y] = spaceValue;
            area[x][y + 1] = num;
        }
    }
    catch { };

    if (checkWin()) {
        alert("Win!");
        fillRandomArea();
    }

    initGameBoard();
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