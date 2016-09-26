function Racer() {

	var SPACEBARKEY = 32;
	var paragraph;
	var inputArea;
	var textArea;
	var text;
	var inputText;
	var words;
	var currentIndex = 0;

	this.init = function() {
		textArea = document.getElementById('text-area');
		inputArea = document.getElementById('input-area');

		text = 'Keying text is important, but it is more important to be able to make it look professional. Keying text is important, but it is more important to be able to make it look professional.';
		words = text.split(' ');

		for(var j = 0; j < words.length; j++) {
			paragraph = document.createElement('span');
			paragraph.innerHTML += words[j] + " "; 
			textArea.appendChild(paragraph);
		}
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

	function match(inputValue, givenValue) {
		
		if(inputValue == givenValue) {
			inputText.value = '';
			currentIndex ++;
			updatePlayGround(currentIndex);
			if( currentIndex == words.length) {
				alert("You Win");
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

}