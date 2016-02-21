
app.controller('newUser', function($scope,$http) {
    $scope.incomplete = true;
    $scope.fName = '';
    $scope.lName = '';
    $scope.gender = '';
    $scope.age = '';
    $scope.passw1='';
    $scope.passw2='';
    $scope.error = false;

    $http.get('http://localhost:8888/userList').success(function(response){
            $scope.users = response ;
        });

    $scope.createUser = function() {
        Users.create($scope.fName,$scope.lName,$scope.gender,$scope.age);
    };


    $scope.$watch('passw1',function() {$scope.test();});
    $scope.$watch('passw2',function() {$scope.test();});
    $scope.$watch('fName', function() {$scope.test();});
    $scope.$watch('lName', function() {$scope.test();});
    $scope.$watch('gender', function() {$scope.test();});
    $scope.$watch('age', function() {$scope.test();});

    $scope.test = function() {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ( (!$scope.fName.length ||
            !$scope.lName.length ||
            !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };
    $scope.save = function () {
            var newuser = {
                id: -1,
                fName: $scope.fName,
                lName: $scope.lName,
                sex: $scope.sex,
                age: $scope.age
            };
            var createNew = JSON.stringify(newuser) ;
            $http.post('http://localhost:8888/createUser/' + createNew).success(function(response){
                console.log(response) ;
                $scope.success = response ;
                $scope.createsuccess = true ;
            })
         }
});