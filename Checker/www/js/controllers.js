angular.module('starter.controllers', [])

.controller('CheckCtrl', function ($scope, Tasks) {
    $scope.tasks = Tasks.all();

    $scope.onCheckedChange = function () {
        Tasks.save();
    };
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
        if (!$scope.isNew) {
            Chats.remove(chat);
        }

        $state.go('tab.chats');
    };
    $scope.save = function (chat) {
        if ($scope.isNew) {
            Chats.add(add);
        } else {
            Chats.save(chat);
        }

        $state.go('tab.chats');
    };
})
.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
//    if (typeof name === 'undefined' || '' == name) return;