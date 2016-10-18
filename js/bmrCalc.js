// Angular Controller
var app =  angular.module('BMRApp',[]);
app.controller('TrueBMR', function($scope, $http){
	// Global variables
	$scope.units = "Imperial"; // Imperial Units are used by default
	$scope.gender = 'male';

	$scope.dob = new Date('1980-01-02'); //new Date().toISOString().slice(0, 10).replace('T', ' ');
	$scope.age = 37;

	$scope.currentWeight = 200;
	$scope.currentWeight_lb = 100;
	$scope.currentWeight_kg = 50;
	$scope.weightUnits = 'lb';

	$scope.currentHeight_big = 5;
	$scope.currentHeight_small = 7;
	$scope.heightUnit_big = 'ft';
	$scope.heightUnit_small = 'in';
	$scope.currentHeight_in;
	$scope.currentHeight_cm;

	$scope.currentBMR;
	$scope.lose1lb;
	$scope.lose1lb_percent;
	$scope.lose2lb;
	$scope.lose2lb_percent;

	$scope.changeSettings = function(units){
		$scope.units = units;
		if($scope.units=="Imperial"){
			$scope.weightUnits = "lb";
			$scope.heightUnit_big = "ft";
			$scope.heightUnit_small = "in";
		}else{
			$scope.weightUnits = "kg"
			$scope.heightUnit_big = "m";
			$scope.heightUnit_small = "cm";
		}
		$('.selectedRow').switchClass( "selectedRow", "detailRow", 500 );
		$('#unitSelection_'+$scope.units).switchClass( "detailRow", "selectedRow", 500 );
	}

	$scope.saveSettings = function(){
		transitionBetweenSection('settings', 'chooseGender');
		console.log('Units = '+$scope.units);
	}

	$scope.chooseGender = function(){
		/**
		* Ask user to identify its gender
		*/
/*
		$http.post("Model/starVisitors.php").success(function(data){
			$scope.chooseGender = data;
			console.log(data);
		});
	*/
	}

	$scope.createAccount = function(){
		/*
		$http.post("Model/starVisiYeaHHtors.php").success(function(data){
			$scope.newVariable = data;
			var q = $scope.newYeaHHVariable[0];
			for (var i = 0; i < array.length; i++) {
				array[i]
			}
		});
		*/
	}

	$scope.selectGender = function(gender){
		$scope.gender = gender;
		$('.genderSelected').removeClass('genderSelected');
		$('.selectedRow').switchClass( "selectedRow", "detailRow", 500 );
		if($scope.gender =="male"){
			$('#genderSelection_male img').animate({"height":"100px"}, 500);
			$('#genderSelection_female img').animate({"height":"50px"}, 500);
		}else{
			$('#genderSelection_male img').animate({"height":"50px"}, 500);
			$('#genderSelection_female img').animate({"height":"100px"}, 500);
		}
		$('#genderSelection_'+$scope.gender).switchClass( "detailRow", "selectedRow", 500 );
		if($scope.gender == 'male'){
			$('#scaleIcon').attr('src', 'img/heightMale_icon.png');
		}else{
			$('#scaleIcon').attr('src', 'img/heightFemale_icon.png');
		}
	}

	$scope.saveGenderSelection = function(){
		transitionBetweenSection('chooseGender', 'editAge');

		console.log('gender = '+$scope.gender);
	}

	$scope.saveAge = function(){

		console.log($scope.dob);

		//var dob_tSpamp = new Date($scope.dob.split("-").join("-")).getTime();

		var today = new Date();
		var birthDate = new Date($scope.dob);
		$scope.age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			$scope.age--;
		}

		//console.log('tStamp = '+dob_tSpamp);
		//console.log('age = '+$scope.age);


		transitionBetweenSection('editAge', 'editWeight');
	}

	$scope.editWeight = function(){

		if($scope.units=='Imperial'){
			$scope.currentWeight_lb = $scope.currentWeight;
			$scope.currentWeight_kg = $scope.currentWeight_lb * 0.453592;
		}else{
			$scope.currentWeight_kg = $scope.currentWeight;
			$scope.currentWeight_lb = $scope.currentWeight_kg * 2.20462
		}

		transitionBetweenSection('editWeight', 'editHeight');

		console.log('currentWeight_lb = '+$scope.currentWeight_lb);
		console.log('currentWeight_kg = '+$scope.currentWeight_kg);
	}

	$scope.editHeight = function(){

		if($scope.units=="Imperial"){
			$scope.currentHeight_in = ($scope.currentHeight_big * 12) + $scope.currentHeight_small;
			$scope.currentHeight_cm = $scope.currentHeight_in * 2.54;
		}else{
			$scope.currentHeight_cm = ($scope.currentHeight_big * 100) + $scope.currentHeight_small;
			$scope.currentHeight_in = $scope.currentHeight_cm * 0.393701;
		}
		$('#editHeight').hide();
		$('#fullBMR').show();

		transitionBetweenSection('editHeight', 'fullBMR');

		console.log('currentHeight_in = '+$scope.currentHeight_in);
		console.log('currentHeight_cm = '+$scope.currentHeight_cm);
		$scope.showBMR();
	}

	$scope.showBMR = function(){
		/**
		* For men: BMR = 	10 x weight (kg) + 6.25 x height (cm) - 5 x age (years) + 5
		* For women: BMR = 	10 x weight (kg) + 6.25 x height (cm) - 5 x age (years) - 161
		*/

		if($scope.gender == "male"){
			$scope.currentBMR = parseInt((10 * $scope.currentWeight_kg) + (6.25 * $scope.currentHeight_cm) - (5 * $scope.age) + 5);
		}else{
			$scope.currentBMR = parseInt((10 * $scope.currentWeight_kg) + (6.25 * $scope.currentHeight_cm) - (5 * $scope.age) - 161);
		}

	}

	$scope.saveBMR = function(){
		transitionBetweenSection('fullBMR', 'suggestedCalories');

		console.log('currentBMR = '+$scope.currentBMR);

		$scope.calcSuggestions();
	}

	$scope.calcSuggestions = function(){
		var precentOfReduction;
		$scope.currentBMR;
		$scope.lose1lb = (($scope.currentBMR * 7) - (3500 * 1))/7;
		$scope.lose1lb_percent = parseInt((1 - ($scope.lose1lb / $scope.currentBMR)) * 100);
		console.log('$scope.lose1lb_percent: '+$scope.lose1lb_percent);
		$('#suggestion_1lb_cover').css({'transform':'rotate('+(180-$scope.lose1lb_percent)+'deg)'});

		$scope.lose2lb = (($scope.currentBMR * 7) - (3500 * 2))/7;
		$scope.lose2lb_percent = parseInt((1 - ($scope.lose2lb / $scope.currentBMR)) * 100);
		console.log('$scope.lose2lb_percent: '+$scope.lose2lb_percent);
		$('#suggestion_2lb_cover').css({'transform':'rotate('+(180-$scope.lose2lb_percent)+'deg)'});
	}

	$scope.editGoal = function(){
	}

	$scope.showSuggestedCalories = function(){

	}

	$scope.showCalorieBrakedown = function(){
		transitionBetweenSection('suggestedCalories', 'caloriesBrakedown');
	}

	$scope.startOver = function(){
		transitionBetweenSection('caloriesBrakedown', 'settings');
	}

	$scope.showWeightTracker = function(){

	}

	$scope.showCalorieTracker = function(){

	}

	transitionBetweenSection = function(outID, inID){
		$("#"+inID).show(); //show the new slide, but leave it's opacity at 0
		$('#'+outID).animate({ "opacity": "0" }, 300, function () { // fade out the current slide
						$("#"+outID).hide(); // make current slide disappear after reaching 0 opacity
                        $("#"+inID).animate({ "opacity": "1" }, 300); // fade in the new slide
                    });
	}
	if(localStorage.getItem("loanAmount")){
        //alert(localStorage.getItem("loanAmount"));
    }
});
