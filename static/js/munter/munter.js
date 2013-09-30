msa = angular.module("msApp", ["ngResource"]);

msa.controller("MunterSystemCtrl", ["$scope", "MunterTrip",
    function($scope, MunterTrip) {
		// Munter System units		
        $scope.elevationUnits = {
            m: "m",
            ft: "ft"
        };
		
		$scope.distanceUnits = {
			mi: "mi",
			km: "km"
		};
		
        // balling out of control with a model!
        // default selected...
        $scope.munterTrip = new MunterTrip({
            elevationUnit: $scope.elevationUnits.ft,
            distanceUnit: $scope.distanceUnits.mi,
        });

		// calculates time in seconds
		$scope.time = function() {
			var dist = $scope.munterTrip.distance ? $scope.munterTrip.distance : 0;
			var elev = $scope.munterTrip.elevation ? $scope.munterTrip.elevation : 0;
			var munterUnits = normalize(dist, $scope.munterTrip.distanceUnit)/1000 + Math.abs(normalize(elev, $scope.munterTrip.elevationUnit))/100;
			return munterUnits / ($scope.munterTrip.rate/3600);
		};

		// calculates munter rate
		$scope.rate = function() {
			var dist = $scope.munterTrip.distance ? $scope.munterTrip.distance : 0;
			var elev = $scope.munterTrip.elevation ? $scope.munterTrip.elevation : 0;
			var munterUnits = normalize(dist, $scope.munterTrip.distanceUnit)/1000 + Math.abs(normalize(elev, $scope.munterTrip.elevationUnit))/100;
			var hrs = $scope.munterTrip.hours ? $scope.munterTrip.hours : 0;
			var min = $scope.munterTrip.minutes ? $scope.munterTrip.minutes : 0;
			return Math.round(10*munterUnits / (hrs/1 + min/60))/10;
		};
		
        // test if length inputs (distance & elevation) are valid
		$scope.isValidLength = function(val) {
            return !val || (isNumber(val) && val>=0);
        };
		
        // test if rate input is valid
		$scope.isValidRate = function(val) {
			return !val || (isNumber(val) && val>0 && val<20);
		};
		
        // test if hours input is valid
		$scope.isValidHours = function(val) {
			return !val || (isNumber(val) && val>=0 && val<48);
		};
		
        // test if minutes input is valid
		$scope.isValidMinutes= function(val) {
			return !val || (isNumber(val) && val>=0 && val<600);
		};		
		
		// true if all necessary inputs are present and valid
		$scope.showTime = function() {
			return (($scope.munterTrip.elevation && $scope.isValidLength($scope.munterTrip.elevation)) || ($scope.munterTrip.distance && $scope.isValidLength($scope.munterTrip.distance)))
			&& $scope.munterTrip.rate && $scope.isValidRate($scope.munterTrip.rate);
		};
		
		$scope.showRate = function() {
			return (($scope.munterTrip.distance && $scope.isValidLength($scope.munterTrip.distance)) || ($scope.munterTrip.elevation && $scope.isValidLength($scope.munterTrip.elevation)))
			&& (($scope.munterTrip.hours && $scope.isValidHours($scope.munterTrip.hours)) || ($scope.munterTrip.minutes && $scope.isValidMinutes($scope.munterTrip.minutes)))
			&& !($scope.munterTrip.hours + $scope.munterTrip.minutes == 0);
		};
    }
]);

// --------------------------------------------------
//  Angular Models
// --------------------------------------------------
// Ok, so here's where things get a bit more complicated...
// Earlier (above) I was touting the importance of MVC (Model-View-Controller) or MVVM (Model-View-View-Model) architectures. Cool.
// So far we've only dealt with Views and Controllers; so what about Models? We've sort of hacked a model in place by using $scope,
//  which is fine, but that doesn't scale. In essence, we want to encapsulate all of the parameters that define a time calculation
//  into some sort of MunterTrip model, or something like that. We've already defined the components above (elevation, units, distance, etc.)
//  and now we need to add some structure. Even though this is going to get confusing, its utility will become apparent when we start
//  doing things like creating lists of MunterTrips, saving them to a database, loading them from a database (lookup CRUD), editing them,
//  etc.
// For the time being, don't worry about "$resource"...that will come up later when we integrate this with a database for persistence
msa.factory("MunterTrip", ["$resource",
    function($resource) {
        return $resource("some/RESTful/url/:id", {id: "@id"});
    }
]);

// --------------------------------------------------
//  Angular Filters
// --------------------------------------------------
// Sweet! A simple display function for time! Notice that despite the fancy declaration as an AngularJS Filter, this is really just a function!
// Also note that, because we've "jammed" this filter onto our "msa" object (i.e. our AngularJS Module/Application), it is available anywhere
//  within our application and can be reused.
msa.filter("prettyTime", function(){
    return function(time) {
        var h = Math.floor(time/3600);
        var m = Math.round((time - 3600*h)/60);
        // returns a string of the format: hh:mm:ss
        // the "join(<delimiter>)" function is a sweet native JS function on Arrays (things liek [el0, el1, ..., elN])
        //   that concats the Array elements separated by the <delimiter> string that you can specify (in this case, a colon ":")
        return [h + " hr ", (m < 10 ? "0" : "") + m + "  min"].join("");
    };
});

// --------------------------------------------------
//  Utils
// --------------------------------------------------
// a function to convert from miles/kilometers/feet to meters
function normalize(value, units) {
	switch(units) {
		case "mi":
			return value * 1609;
		case "km":
			return value * 1000;
		case "ft":
			return value / 3.281;
		case "m":
			return value;
	}
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}