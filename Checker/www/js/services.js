angular.module('starter.services', [])
.factory('Chats', function () {
    var chats = [{
        id: 1,
        name: 'Do morning exercise',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
        monday: true, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: true
    }];
    var zeroTask = {
        id: 0,
        name: 'Add new',
        lastText: 'Click to add new',
        face: 'https://cdn3.iconfinder.com/data/icons/line/36/add-64.png',
        monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
    };
    var contains = function (id) {
        for (var i in chats) {
            if (chats[i].id === id) return true;
        }

        return false;
    };
    var getNewId = function () {
        var min = 1, max = 32767;
        var id;

        do{
            id = Math.floor(Math.random() * (max - min)) + min;
        } while (contains(id));

        return id;
    };

    return {
        allWithNew: function () {
            //var tasks = localStorage.getItem(m_Name) || [];
            var tasks = chats.slice();
            tasks.splice(0, 0, zeroTask);
            return tasks;
        },
        all: function () {
            //var tasks = localStorage.getItem(m_Name) || [];
            var tasks = chats.slice();
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
            var id = parseInt(chatId);

            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === id) {
                    return chats[i];
                }
            }

            var copy = JSON.parse(JSON.stringify(zeroTask));
            copy.id = getNewId();
            return copy;
        }
    };
});