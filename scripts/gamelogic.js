var area = [
    [4, 7, 11, 2],
    [5, "", 8, 3],
    [1, 9, 14, 12],
    [6, 10, 13, 15]
]

initGameBoard();

function initGameBoard() {
    $("#0-0")[0].textContent = area[0][0];
    $("#1-0")[0].textContent = area[1][0];
    $("#2-0")[0].textContent = area[2][0];
    $("#3-0")[0].textContent = area[3][0];
    $("#0-1")[0].textContent = area[0][1];
    $("#1-1")[0].textContent = area[1][1];
    $("#2-1")[0].textContent = area[2][1];
    $("#3-1")[0].textContent = area[3][1];
    $("#0-2")[0].textContent = area[0][2];
    $("#1-2")[0].textContent = area[1][2];
    $("#2-2")[0].textContent = area[2][2];
    $("#3-2")[0].textContent = area[3][2];
    $("#0-3")[0].textContent = area[0][3];
    $("#1-3")[0].textContent = area[1][3];
    $("#2-3")[0].textContent = area[2][3];
    $("#3-3")[0].textContent = area[3][3];
}

function changeCell(num) {
    //Ищем "координаты" элемента
    var x = 0, y = 0;
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
        if (area[x - 1][y] == "") {
            area[x][y] = ""
            area[x - 1][y] = num;
        }
    }
    catch { };

    try {
        if (area[x + 1][y] == "") {
            area[x][y] = ""
            area[x + 1][y] = num;
        }
    }
    catch { };

    try {
        if (area[x][y - 1] == "") {
            area[x][y] = ""
            area[x][y - 1] = num;
        }
    }
    catch { };

    try {
        if (area[x][y + 1] == "") {
            area[x][y] = ""
            area[x][y + 1] = num;
        }
    }
    catch { };
    initGameBoard();
}