function Racer() {

	var SPACEBARKEY = 32;

	var inputArea;
	var textArea;
	var racingArea;

	var car;
	var carWidth;
	var containerWidth;
	var paragraph;
	var text;
	var inputText;
	var words;
	var currentIndex = 0;

	this.init = function() {
		textArea = document.getElementById('text-area');
		inputArea = document.getElementById('input-area');
		racingArea = document.getElementById('racing-area');

		car = document.createElement('div');
		car.setAttribute('class', 'car');
		racingArea.appendChild(car);

		containerWidth = parseInt(window.getComputedStyle(car.parentNode, null).getPropertyValue('width'));
		carWidth = parseInt(window.getComputedStyle(car, null).getPropertyValue('width'));

		text = 'Keying text is important, but it is more important to be able to make it look professional.';
		words = text.split(' ');

		addSpan();
		updatePlayGround(0);

		inputText = document.createElement('input');
		inputText.type = 'text';
		inputText.placeholder = 'type here';
		inputArea.appendChild(inputText);

		inputText.addEventListener( 'keypress', function(event) {
			inputText.setAttribute('class', '');
			if(event.keyCode == SPACEBARKEY) {
				event.preventDefault();
				match(inputText.value, words[currentIndex]);
			}
		});
	}

	function addSpan() {
		for(var j = 0; j < words.length; j++) {
			paragraph = document.createElement('span');
			paragraph.innerHTML += words[j] + " "; 
			textArea.appendChild(paragraph);
		}
	}

	function match(inputValue, givenValue) {
		
		if(inputValue == givenValue) {
			inputText.value = '';
			currentIndex ++;
			moveCar(currentIndex);
			updatePlayGround(currentIndex);
			if( currentIndex >= words.length) {
				setTimeout(function() {
					alert("You Win");
            	},500);
			}
		}

		else {
			inputText.setAttribute('class', 'error');
			console.log('value doesnot match');
		}
	}

	function updatePlayGround(index) {
		current = index;
		for(var j = 0; j < words.length; j++) {
			if (j == current ) {
				textArea.children[current].setAttribute('class', 'current');
			}
			else {
				textArea.children[j].setAttribute('class','');
			}
		}
	}

	function moveCar(currentIndex) {
		car.style.left = (currentIndex / words.length) * (100 - (carWidth/containerWidth * 100)) + '%';
	}

}