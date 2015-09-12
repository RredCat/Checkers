angular.module('starter.controllers', [])

.controller('CheckCtrl', function ($scope, Tasks) {
    $scope.tasks = Tasks.all();
})
.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.allWithNew();
})
.controller('ChatDetailCtrl', function ($scope, $state, $stateParams, Chats) {
    var id = $stateParams.chatId;
    $scope.isNew = "0" == id;
    $scope.chat = Chats.get(id);
    $scope.i21n = $scope.isNew
    ? { remove: "Cansel", save: "Create" }
    : { remove: "Remove", save: "Save" };

    $scope.remove = function (chat) {
        //Chats.remove(chat);
        $state.go('tab.chats');
    };
    $scope.save = function (chat) {
        $state.go('tab.chats');
    };
})
.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
//$scope.items = [];
//$scope.newItem = { name: "", monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false };

//$scope.addItem = function () {
//    var name = $scope.newItem.name;

//    if (typeof name === 'undefined' || '' == name) return;

//    $scope.items.push($scope.newItem);
//    $scope.newItem = { name: "", monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false };

//    //var initWeek = function () {//Make cycle in view. But later..
//    //    return {monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false };
//    //};
//    // Add validation checker!! But later..
//};
//$scope.removeItem = function (index) {
//    $scope.items.splice(index, 1);
//};