
// Button class ///////////////////////////////////////////////////////////
class Button {

	constructor(Text, Wrapper) {
		this.value = Text;
		this.wrapper = Wrapper;
	}

		getValue() {
			return this.value;
		}

		createBtn() {
			this.element = document.createElement("button");
			this.element.textContent = this.text;

			let container = document.getElementById(this.wrapper);
			container.appendChild(this.element);
		}

		addEvent() {
			this.element.addEventListener("click", this.showBtn.bind(this), false);
		}

		showBtn() {
			alert(this.text);
		}

		consoleBtn(text) {
			console.log(this.text);
		}

}

// Screen class /////////////////////////////////////////////////////////////
class Screen {

	constructor(id) {
		this.screen = document.getElementById(id);
	}

	showValue(value) {
		this.element.textContent += this.text
	}

}

// Calculator class /////////////////////////////////////////////////////////
{
	createScreen(){
		let display = new Screen('screen');
	};

	createButtons(arr) {
		let buttons = arr

		buttons.forEach(function(element) {
			element = new Button(element, 'numbers');
		}
	};

	createOperators(arr) {
		let operators = arr;

		operators.forEach(function(element) {
			element = new Button(element, 'operators');
		}
	};

	class Calculator {

		constructor(){
			this.display = createDisplay();
			this.array_buttons = createButtons();
			this.array_operators = createOperators();	
		}
}

// Main function ////////////////////////////////////////////////////////////
function main() {

	var buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	buttons.forEach(function(element) {
		element = new Button(element, 'numbers');
		element.createBtn();
		element.addEvent();
	});

	var operators = ['+', '-', '='];

	operators.forEach(function(element) {
		element = new Button(element, 'operators');
		element.createBtn();
		element.addEvent();
	})

}

// Call main function //////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", main, false);


