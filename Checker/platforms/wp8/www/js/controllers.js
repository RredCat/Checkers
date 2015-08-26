angular.module('starter.controllers', [])

.controller('CheckCtrl', function ($scope) { })

.controller('ChatsCtrl', function ($scope) {
    $scope.items = [];
    $scope.addItem = function () {
        $scope.items.push({
            name: $scope.itemName
        });

        $scope.itemName = "";
    };
    $scope.removeItem = function (index) {
        $scope.items.splice(index, 1);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});