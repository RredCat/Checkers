angular.module('starter.services', [])
.factory('Chats', function () {
    var chats = [{
        id: 1,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
        monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
    }];
    var addTask = {
        id: 0,
        name: 'Add new',
        lastText: 'Click to add new',
        face: 'https://cdn3.iconfinder.com/data/icons/line/36/add-64.png',
        monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
    };

    return {
        all: function () {
            //var tasks = localStorage.getItem(m_Name) || [];
            var tasks = chats || [];
            tasks.splice(0, 0, addTask);
            return tasks;
        },
        add: function (task) {
            var tasks = chats;
            tasks.splice(tasks.indexOf(task), 1);
            save(tasks);
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});