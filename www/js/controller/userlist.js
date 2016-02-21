
app.controller('userCtrl', function($scope, $http) {
    $http.get('http://localhost:8888/userList').success(function(response){
                $scope.users = response ;
                });

    // Sort Users
    $scope.predicate = 'age';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };


    // Pagination
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.maxSize = 5;

    //When the *delete* button is clicked.
    $scope.deleteUser = function(user) {
        $http.delete('http://localhost:8888/deleteUser/'+parseInt(user.id)).success(function(response){
                    
                    $scope.users = response ;
                    
                })
    };
});