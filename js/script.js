
// Button class ///////////////////////////////////////////////////////////
class Button {

	constructor(Text, Wrapper) {
		this.value = Text;
		this.wrapper = Wrapper;
	}
}

// Screen class /////////////////////////////////////////////////////////////
class Screen {

	constructor(id) {
		this.screen = document.getElementById(id);
		this.calcScreen;
		this.valueScreen;
		this.storedValue = [];
	}

	addNumber(value) {
		if(this.storedValue.length > 0) {
			this.valueScreen.textContent += value;
			this.storedValue.push(value);
		} else if(this.storedValue.length == 0) {
			this.calcScreen.textContent = this.storedValue.join("");
			this.valueScreen.textContent = value;
			this.storedValue.push(value);
		}

		console.log(this.storedValue);
	}

	addOperator(value) {
		let OperatorValue = " " + value + " ";

		this.valueScreen.textContent = "";
		this.storedValue.push(OperatorValue);
		this.calcScreen.textContent = this.storedValue.join("");

		console.log(this.storedValue);
	}

	showCalc(value) {
		let result = eval(this.storedValue.join(""));
		let cleanStoredValue = this.storedValue.join("");

		this.storedValue += " " + value;
		this.calcScreen.textContent = cleanStoredValue;
		this.valueScreen.textContent = result;
		this.storedValue = [];
	}

	backspace() {
		this.storedValue.splice(-1);
		this.calcScreen.textContent = "";
		this.valueScreen.textContent = this.storedValue.join("");
	}

	clear() {
		this.storedValue = [];
		this.calcScreen.textContent = "";
		this.valueScreen.textContent = "";
	}
}

// Calculator class /////////////////////////////////////////////////////////

	function createScreen(){
		let display = new Screen('screen');
		return display;
	};

	function createButtons(arr) {
		let tempButtons = arr;
		let buttons = [];

		tempButtons.forEach(function(btn) {
			btn = new Button(btn, 'numbers');
			buttons.push(btn);
		})

		return buttons;
	};

	function createOperators(arr) {
		let tempOperators = arr;
		let operators = [];

		tempOperators.forEach(function(element) {
			element = new Button(element, 'operators');
			operators.push(element);
		})

		return operators;
	};



	class Calculator {

		constructor(arr1, arr2){
			this.display = createScreen();
			this.array_numbers = createButtons(arr1);
			this.array_operators = createOperators(arr2);
			this.array_buttons = this.array_numbers.concat(this.array_operators)	
		}

		addScreen() {
			let display = this.display;
			let container = display.screen;

			display.calcScreen = document.createElement("span");
			display.calcScreen.setAttribute("id", "calcScreen");

			display.valueScreen = document.createElement("span");
			display.valueScreen.setAttribute("id", "valueScreen");

			container.appendChild(display.calcScreen);
			container.appendChild(display.valueScreen);		
		}

		addButtons() {
			this.array_buttons.forEach(function(btn) {
				btn.element = document.createElement("button");
				btn.element.textContent = btn.value;
				btn.element.setAttribute("id", btn.value);

				let container = document.getElementById(btn.wrapper);
				container.appendChild(btn.element);
			})
		}

		addEvent() {
			let display = this.display;

			this.array_numbers.forEach(function(btn) {
				if (btn.value == "<=") {
					btn.element.addEventListener("click", function() { display.backspace()});
				} else {
					btn.element.addEventListener("click", function() { display.addNumber(btn.value)});
				}
			});

			this.array_operators.forEach(function(btn) {
				if (btn.value == "+" || btn.value == "-") {
					btn.element.addEventListener("click", function() { display.addOperator(btn.value)});
				} else if (btn.value == "=") {
					btn.element.addEventListener("click", function() { display.showCalc(btn.value)});
				} else if (btn.value == "clear") {
					btn.element.addEventListener("click", function() { display.clear()});
				}
			});
				
		}
		

		debug() {
			console.log(this.display);
			console.log(this.array_buttons);
		}

	};


// Main function ////////////////////////////////////////////////////////////
function main() {

	var buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '<='];
	var operators = ['clear', '+', '-', '='];

	calc = new Calculator(buttons, operators);

	calc.debug();

	calc.addScreen();

	calc.addButtons();

	calc.addEvent();

}

// Call main function //////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", main, false);


