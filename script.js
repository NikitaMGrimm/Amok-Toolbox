let selected;
let n;
let numbers;
let columns;
let ms;
let running;
let interval;
let solution;
let solved;
let moreInfo = ["EF", "EO", "EF", "OE", "EN"];
let rand = 0;
let bool_moreInfo = false;
let possibleCombinations = [
	["ON", "5861"],
	["NF", "8165"],
	["NO", "8561"],
	["FN", "1856"],
	["FO", "1568"]
];

document.addEventListener("DOMContentLoaded", restart);
document.addEventListener('keydown', function(event) {
    handleInput(event);
}, true);

function restart() {
    solved = false;
    selected = 0;
    numbers = [9, 0, 1, 9, 0, 1, 9, 0, 1, 9, 0, 1];
    document.querySelector('#solution').innerText = "[Letters will appear here]";
    // 0-2 First, 3-5 Second, 6-8 Third, 9-11 Fourth
    n = document.querySelectorAll("h4");
    columns = document.querySelectorAll(".number");
    setSolution();
    restartTimer();
    selectColumn(0);    
    setNumbers();
}

function setSolution() {
	rand = Math.floor(Math.random() * 5)
    
	
    solution = possibleCombinations[rand];
    console.log(solution);
}

function stopTimer() {
    clearInterval(interval);
    running = false;
}

function restartTimer() {
    stopTimer();
    ms = 0;
    document.querySelector("#timer").innerText = "Time: 0.0s";
}

function updateTimer() {
    ms += 100;
    document.querySelector("#timer").innerText = "Time: " + (ms/1000).toFixed(1) + "s";
}

function startTimer() {
    running = true;
    interval = setInterval(updateTimer, 100);
}

function handleInput(event) {
    if (event.key == ' ' || event.key == 'Escape' || event.key == 'Enter') {
		if (event.repeat) return;
		handleSpace();
	}
    
    switch(event.key) {
        case 'w':
			if (event.repeat) return;
			if (running) handleVert("up");
            break;
        case 's':
			if (event.repeat) return;
            if (running) handleVert("down");
            break;
        case 'a':
			if (event.repeat) return;
            handleHoriz("left");
			if (!running) handleSpace();
            break;
        case 'd':
		    if (event.repeat) return;
            handleHoriz("right");
			if (!running) handleSpace();
            break;
		case 'h':
			let displayStyle = document.querySelector("#combos").style.display;
			if (displayStyle === "none") {
				document.querySelector("#combos").style.display = "block";
			} else {
				document.querySelector("#combos").style.display = "none";
			}
			break;
		break;
		case 'm':
			if (!bool_moreInfo) bool_moreInfo = true;
			else bool_moreInfo = false;
			if (bool_moreInfo) {
				for (let i = 0; i < possibleCombinations.length; i++) {
					possibleCombinations[i][0] += moreInfo[i];
				}
			} else {
				possibleCombinations = [
				["ON", "5861"],
				["NF", "8165"],
				["NO", "8561"],
				["FN", "1856"],
				["FO", "1568"]
				];
			}	
			restart();
			break;
			
    }
	if (!running) return;
    if (!solved && running) {
        checkSolved();
    }
}

function checkSolved() {
    let current = [numbers[1], numbers[4], numbers[7], numbers[10]].join("");
    if (current == solution[1]) {
        stopTimer();
        solved = true;
        running = false;
        document.querySelector("#solution").innerText = "Solved!";
        console.log("Solved!");
    }
}

function handleSpace() {
    if (!running && !solved) {
        setSolution();
        document.querySelector('#solution').innerText = solution[0];
        startTimer();
    }
    else restart();
}

function handleHoriz(dir) {
    if (dir == "left") {
        selectColumn(selected - 1);
    } else {
        selectColumn(selected + 1);
    }
}

function handleVert(dir) {
    if (dir == "up") {
        console.log("decrement selected column");
        decrementSelectedColumn();
    } else {
        console.log("increment selected column")
        incrementSelectedColumn();
    }
}

function selectColumn(index) {
    let next;
    if (index < 0) {
        next = 3;
    } else if (index > 3) {
        next = 0;
    } else next = index;
    for (let i of columns) {
        i.setAttribute("style", "border-color: rgba(111,111,111,0.2) transparent;");
    }
    columns[next].setAttribute("style", "border-color: grey");
    selected = next;
}

function setNumbers() {
    for (let i in n) {
        n[i].innerText = numbers[i];		
	}
}

function incrementSelectedColumn() {
    for (let i = 0; i < 3; i++) {
        let current = numbers[selected * 3 + i];
        numbers[selected * 3 + i] = increment(current); 
    }
    setNumbers();
}

function decrementSelectedColumn() {
    for (let i = 0; i < 3; i++) {
        let current = numbers[selected * 3 + i];
        numbers[selected * 3 + i] = decrement(current); 
    }
    setNumbers();
}

function increment(i) {
    if (i >= 9) {return 0}
    else {return i + 1};
}

function decrement(i) {
    if (i <= 0) {return 9}
    else {return i - 1};
}

