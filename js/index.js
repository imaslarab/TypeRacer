function Racer() {

	var that = this;

	var SPACE_BAR_KEY = 32;
	var ONE_SECOND = 1000;
	var HALF_SECOND = 500;
	var MINUTE_UNIT = 60;

	var timerArea;
	var racingArea;
	var textArea;
	var inputArea;

	var carWidth;
	var containerWidth;
	var paragraph;
	var text;
	var inputText;
	var words;
	
	var time;
	var speed;
	var car;
	var timer;
	var currentIndex;

	this.currentTime;
	this.wpm;
	this.minute;
	this.second;

	this.init = function() {

		currentIndex = 0;
		that.currentTime = 0;
		that.wpm = 0;
		that.minute = 0;
		that.second = 0;

		timerArea = document.getElementById('timer-area');
		racingArea = document.getElementById('racing-area');
		textArea = document.getElementById('text-area');
		inputArea = document.getElementById('input-area');

		time = document.createElement('span');
		speed = document.createElement('span');

		timer = setInterval(startTimer, ONE_SECOND);
		timerArea.appendChild(time);

		timerArea.appendChild(speed);

		car = document.createElement('div');
		car.setAttribute('class', 'car');
		racingArea.appendChild(car);

		containerWidth = parseInt(window.getComputedStyle(car.parentNode, null).getPropertyValue('width'));
		carWidth = parseInt(window.getComputedStyle(car, null).getPropertyValue('width'));

		text = 'My name is Sami!!!, Sami ki jawaani. I am too sexy for you. Mein tere haath na aani';
		words = text.split(' ');

		addSpan();
		updatePlayGround(0);

		inputText = document.createElement('input');
		inputText.type = 'text';
		inputText.placeholder = 'Start typing here';
		inputArea.appendChild(inputText);
		
		inputText.addEventListener( 'keypress', function(event) {
			inputText.setAttribute('class', '');
			if(event.keyCode == SPACE_BAR_KEY) {
				event.preventDefault();
				match(inputText.value, words[currentIndex]);
			}
		});
	}

	function addSpan() {
		for(var j = 0; j < words.length; j++) {
			paragraph = document.createElement('span');
			paragraph.innerHTML += words[j] + ' '; 
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
				clearInterval (timer);
				setTimeout(function() {
					alert('YaaaY!!!! COMPLETED ');
            	}, HALF_SECOND);
			}
		}

		else {
			inputText.setAttribute('class', 'error');
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

	function startTimer() {
		time.innerHTML = that.minute + ' : ' + that.second;
		inputText.focus();
	    that.second++;
	    that.currentTime++;
	    if (that.second >= MINUTE_UNIT) {
	    	that.minute++;
	    	that.second = 0;
	    }
	    updateWpm(that.wpm);
	}	

	function updateWpm(value) {
		value = Math.round((currentIndex + 1) / that.currentTime * MINUTE_UNIT);
		speed.innerHTML = value + ' ' + 'wpm';
	}

}