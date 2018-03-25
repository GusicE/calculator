
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
	}
}

// Calculator class /////////////////////////////////////////////////////////

	function createScreen(){
		let display = new Screen('screen');
		return display;
	};

	function createMenu(arr) {
		let tempMenu = arr;
		let menu = [];

		tempMenu.forEach(function(butn) {
			butn = new Button(butn, 'menu');
			menu.push(butn);
		})

		return menu;
	}

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

		constructor(arr1, arr2, arr3){
			this.display = createScreen();
			this.array_menu = createMenu(arr1);
			this.array_numbers = createButtons(arr2);
			this.array_operators = createOperators(arr3);
			this.array_buttons = this.array_menu.concat(this.array_numbers, this.array_operators);
			this.calcDone = false;
			this.storedValue = [];
			this.addScreen();	
			this.addButtons();
			this.addEvent();
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
			console.log(this.array_buttons);
			this.array_buttons.forEach(function(btn) {
				btn.element = document.createElement("button");

				if ( btn.value == "i" || btn.value == "<=") {
				} else {
					btn.element.textContent = btn.value;
				}
				btn.element.setAttribute("id", btn.value);

				let container = document.getElementById(btn.wrapper);
				container.appendChild(btn.element);
			})
		}

		addEvent() {
			var that = this;

			this.array_menu.forEach(function(btn) {
				if (btn.value == "i") {
					btn.element.addEventListener("click", function() { that.info()});
				} else if (btn.value == "clear") {
					btn.element.addEventListener("click", function() { that.clear()});
				} else if (btn.value == "<=") {
					btn.element.addEventListener("click", function() { that.backspace()});
				}
			});

			this.array_numbers.forEach(function(btn) {
				if (btn.value == "NEG") {
					btn.element.addEventListener("click", function() { that.makeNegative()});
				} else if (btn.value == ".") {
					btn.element.addEventListener("click", function() { that.addComma(btn.value)});
				} else {
					btn.element.addEventListener("click", function() { that.addNumber(btn.value)});
				}
			});

			this.array_operators.forEach(function(btn) {
				if (btn.value == "=") {
					btn.element.addEventListener("click", function() { that.showCalc(btn.value)});
				} else {
					btn.element.addEventListener("click", function() { that.addOperator(btn.value)});
				}
			});
				
		}

		// EVENTS ////////////////////////////////

		addNumber(value) {

			if(this.calcDone) {
				this.storedValue = [];
				this.display.calcScreen.textContent = "";
				this.display.valueScreen.textContent = value;
				this.storedValue.push(value);
				this.calcDone = false;
			} else {
				if(this.storedValue.length > 0) {
					this.display.valueScreen.textContent += value;
					this.storedValue.push(value);
				} else if(this.storedValue.length == 0) {
					this.display.valueScreen.textContent = value;
					this.storedValue.push(value);
				}
			}
		}

		addComma(value) {

			if (this.display.valueScreen.textContent == "") {
				value = 0+value;
			}			
			
			if(this.calcDone) {
				value = 0+value;
				this.storedValue = [];
				this.display.calcScreen.textContent = "";
				this.display.valueScreen.textContent = value;
				this.storedValue.push(value);
				this.calcDone = false;

			} else {

				if(this.storedValue.length > 0) {

					if(this.display.valueScreen.textContent.includes(".")) {

					} else {
							this.display.valueScreen.textContent += value;
							this.storedValue.push(value);
					}

				} else if(this.storedValue.length == 0) {
					this.display.valueScreen.textContent = value;
					this.storedValue.push(value);
				}
			}
		}

		addOperator(value) {
			let OperatorValue = " " + value + " ";
			this.calcDone = false;

			if (this.storedValue.length == 0) {
				this.storedValue.push("0");
				this.display.valueScreen.textContent = "";
				this.storedValue.push(OperatorValue);
				this.display.calcScreen.textContent = this.storedValue.join("");
			} else {
				let lastStoredvalue = this.storedValue[this.storedValue.length-1];

				if(lastStoredvalue == " + " || lastStoredvalue == " - " || lastStoredvalue == " * " || lastStoredvalue == " / ") {
					this.storedValue.splice(-1);
				} 

				this.display.valueScreen.textContent = "";
				this.storedValue.push(OperatorValue);
				this.display.calcScreen.textContent = this.storedValue.join("");	
			}
		}

		makeNegative() {
			let lastStoredvalue = this.storedValue[this.storedValue.length-1];
			var that = this;

			if (this.storedValue.length == 0) {
				let value = -0;
				this.display.valueScreen.textContent = value;
				this.storedValue.push(value);
			} else if (lastStoredvalue == " + " || lastStoredvalue == " - " || lastStoredvalue == " * " || lastStoredvalue == " / ") {
				let value = loopUntilOperator(2);
				this.storedValue.push(-value);
				this.display.valueScreen.textContent = -value;
			} else {
				var loops = 0;
				let value = loopUntilOperator(1);
				this.storedValue.splice(-loops);
				this.storedValue.push(-value);
				this.display.valueScreen.textContent = -value;
			}

			function loopUntilOperator(y) {
				let x = true;
				let i = that.storedValue.length-y;
				let Value = "";

				while(x) {
					let lastValue = that.storedValue[i];

					if (lastValue == " + " || lastValue == " - " || lastValue == " * " || lastValue == " / ") {
						x = false;
						break;
					} else {
						Value = lastValue + Value;

						if (i == 0) {
							x = false;
						}
						
						i--;
						loops++;
					}	
				}

				return Value;
			}
		}

		showCalc(value) {
			let tempStoredValue = this.storedValue;
			let result = eval(tempStoredValue.join(""));
			let cleanStoredValue = tempStoredValue.join("");

			this.storedValue.push(value);
			this.display.calcScreen.textContent = cleanStoredValue;
			this.display.valueScreen.textContent = result;
			this.storedValue = [];
			this.storedValue.push(result);
			this.calcDone = true;
		}

		backspace() {
			this.storedValue.splice(-1);
			this.display.calcScreen.textContent = "";
			this.display.valueScreen.textContent = this.storedValue.join("");
		}

		clear() {
			this.storedValue = [];
			this.display.calcScreen.textContent = "";
			this.display.valueScreen.textContent = "";
			this.calcDone = false;
		}

		info() {		
			swal({
			  title: "Web Calculator v1.0",
			  text: "by Edin Gusic - 2018",
			  icon: "info",
			  button: false,
			  animation: false
			});
		}		

		debug() {
			console.log(this.display);
			console.log(this.array_buttons);
		}

	};



// Main function ////////////////////////////////////////////////////////////
function main() {

	var menu = ['i', 'clear', '<=']
	var buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'NEG', '0', '.'];
	var operators = ['+', '-', '*', '/', '='];

	calc = new Calculator(menu, buttons, operators);

	calc.debug();
}

// Call main function //////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", main, false);


