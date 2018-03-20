
// Button class ///////////////////////////////////////////////////////////
class Button {

	constructor(Text, Wrapper) {
		this.text = Text;
		this.wrapper = Wrapper;
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

}

// Calculator class /////////////////////////////////////////////////////////
{
	class Calculator {

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


