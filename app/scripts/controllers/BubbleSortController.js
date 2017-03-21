var myApp = angular.module('myApp', ['ngAnimate']);
myApp.controller('BubbleSortController', function ($rootScope) {

	// to shift the elements in case of swap for each iteration of bubble sort
	$rootScope.getNewPosition = function (index) {
		return {
			left: index * 100 + 'px'
		};
	}

	// controller function to implement Bubble sort on an array of elements
	$rootScope.bubbleSort = function (ascOrDesc) {
		$rootScope.itemsLength = $rootScope.items.length;
		bool = "false"; // default value which is set to "true" only in case of swap between 2 adjacent elements
		$rootScope.flagVariable = ascOrDesc; // for enabling and disabling of sorting buttons
		$rootScope.showNote = 1; // ng-show color coding used

		$rootScope.displayWhichNosAreGettingCompared = '';
		
		$rootScope.inputText = 1;
		
		if ($rootScope.itemsLength == 0) {
			$rootScope.buttonMessage = 0;
			$rootScope.flagVariable = 'x';
			$rootScope.showNote = 0;
		}

		for (; $rootScope.i < $rootScope.itemsLength - $rootScope.lastIndex - 1; $rootScope.i++) {
			// display which elements are getting compared
			$rootScope.displayWhichNosAreGettingCompared = $rootScope.displayWhichNosAreGettingCompared + ' Compared ' + $rootScope.items[$rootScope.i].number + ' with ' + $rootScope.items[$rootScope.i + 1].number;

			// Checking if the i-th element is > or < than the (i+1)-th element, if then swap function is called
			if ($rootScope.compareElems(ascOrDesc)) {
				$rootScope.items[$rootScope.i].color = "yellow";
				$rootScope.items[$rootScope.i + 1].color = "yellow";
				$rootScope.swap($rootScope.i); //call to swap function with the position of i-th element as the parameter
				$rootScope.displayWhichNosAreGettingCompared = $rootScope.displayWhichNosAreGettingCompared + ' [Swapped].';
				bool = "true"; // this will custom set the last index and i-th value
				$rootScope.i = $rootScope.i + 1;
				break;
			} else {
				$rootScope.displayWhichNosAreGettingCompared = $rootScope.displayWhichNosAreGettingCompared + ' [Not swapped].';
			}
		}

		if ($rootScope.i == ($rootScope.itemsLength - $rootScope.lastIndex - 1)) {
			$rootScope.displayWhichNosAreGettingCompared = $rootScope.displayWhichNosAreGettingCompared + ' Element has bubbled to its correct positions so no more comparisons required.';
			$rootScope.i = 0;
		}

		// after one pass of bubble sort we initialize i to 0
		if (bool == "false") {
			$rootScope.lastIndex = $rootScope.lastIndex + 1;
			$rootScope.i = 0;
		}

		// to display success message
		if ($rootScope.lastIndex == $rootScope.itemsLength - 1) {
			$rootScope.message = "Congratulations!!! You have mastered Bubble Sort successfully!";
			$rootScope.buttonMessage = 0;
			$rootScope.flagVariable = " ";
			$rootScope.displayWhichNosAreGettingCompared = " ";
		}
	};

	// swap the adjacent elements
	$rootScope.swap = function (pos) {
		var tempElement = $rootScope.items[pos];
		$rootScope.items[pos] = $rootScope.items[pos + 1];
		$rootScope.items[pos + 1] = tempElement;

		// sets the position of the 2 swapped elements for animation
		var tempPosition = $rootScope.items[pos].position;
		$rootScope.items[pos].position = $rootScope.items[pos + 1].position;
		$rootScope.items[pos + 1].position = tempPosition;
	};

	// Handling the click of Ascending or Descending Bubble sort buttons
	$rootScope.compareElems = function (compare) {
		if (compare == 'asc') {
			return (parseFloat($rootScope.items[$rootScope.i].number) > parseFloat($rootScope.items[$rootScope.i + 1].number));
		} else {
			return (parseFloat($rootScope.items[$rootScope.i].number) < parseFloat($rootScope.items[$rootScope.i + 1].number));
		}
	};

});

// MakeArrayController to convert user input to JSON
myApp.controller('MakeArrayController', function ($rootScope) {
	$rootScope.items = [];
	$rootScope.lastIndex = 0;
	$rootScope.i = 0;

	// refresh the page, called on clear button
	$rootScope.clear = function () {
		location.reload();
	}

	$rootScope.makeArray = function () {
		var userInput = angular.element(document.getElementById("number"));
		$rootScope.numberList = userInput.val();

		$rootScope.arrayOfNumber = $rootScope.numberList.match(/\S+/g); //To handle multiple and trailing whitespaces

		if ($rootScope.arrayOfNumber) {
			var len = $rootScope.arrayOfNumber.length;
			for (var a = 0; a < len; a++) {
				$rootScope.items.push({
					"number": $rootScope.arrayOfNumber[a],
					"color": "lightblue",
					"position": a
				});
			}
		}

		// to disable the bubble sort button when user input is empty
		if ($rootScope.numberList == "") {
			$rootScope.buttonMessage = 0;
			$rootScope.flagVariable = 'x';
		}

		if (len == 1) {
			$rootScope.message = "Congratulations!!! You have mastered Bubble Sort successfully!";
			$rootScope.buttonMessage = 0;
			return;
		}
	};
});