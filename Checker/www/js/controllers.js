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
    $scope.isNew = "0" === id;
    $scope.chat = Chats.get(id);
    $scope.i21n = $scope.isNew ? { save: "Create" } : { save: "Save" };

    $scope.cancel = function (chat) {
        $state.go('tab.chats');
    };
    $scope.delete = function (chat) {
        Chats.remove(chat);
        $state.go('tab.chats');
    };
    $scope.save = function (chat) {
        if ($scope.isNew) {
            Chats.add(chat);
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
    //localStorage.clear();
});
//    if (typeof name === 'undefined' || '' == name) return;