
app.controller('changeUser', function($scope, $routeParams,$http) {
    $http.get('/userList').success(function(data){
        console.log(data);
        $scope.users = data;
        $scope.fName = '';
        $scope.lName = '';
        $scope.sex = '';
        $scope.age = '';
        $scope.passw1 = '';
        $scope.passw2 = '';
        var id = $routeParams.id;
        $scope.fName = $scope.users[id-1].fName;
        $scope.lName = $scope.users[id-1].lName;
        $scope.gender = $scope.users[id-1].gender;
        $scope.age = $scope.users[id-1].age;
        
        $scope.saveChanges = function (){           
        var changedUser = {id: id, 
        fName: $scope.fName, 
        lName: $scope.lName, 
        gender: $scope.gender, 
        age: $scope.age};
            
        $http.put('/userList',changeduser ).
            success(function(data) {
                $scope.user = data;
        console.log(data);  
        });
        $scope.edit = false;
        $scope.delete = false;
        $scope.incomplete = true;
        $scope.fName = '';
        $scope.lName = '';
        $scope.gender = '';
        $scope.age = '';
        $scope.passw1 = '';
        $scope.passw2 = '';
        alert("changed!");
        };
    
        $scope.$watch('passw1',function() {$scope.test();});
        $scope.$watch('passw2',function() {$scope.test();});
        $scope.$watch('fName', function() {$scope.test();});
        $scope.$watch('lName', function() {$scope.test();});
        $scope.$watch('gender', function() {$scope.test();});
        $scope.$watch('age', function() {$scope.test();});

        $scope.incomplete = true;
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
})
    }); 
            