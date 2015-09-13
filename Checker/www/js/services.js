angular.module('starter.services', [])
    .factory('Chats', function() {
        //var chats = null;
        var chats = [
            {
                id: 1,
                name: 'Do morning exercise',
                lastText: 'You on your way?',
                face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
                monday: true,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: true
            }
        ];
        var zeroTask = {
            id: 0,
            name: 'Add new',
            lastText: 'Click to add new',
            face: 'https://cdn3.iconfinder.com/data/icons/line/36/add-64.png',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        };
        var contains = function(id) {
            for (var i in chats) {
                if (chats[i].id === id) return true;
            }

            return false;
        };
        var getNewId = function() {
            var min = 1, max = 32767;
            var id;

            do {
                id = Math.floor(Math.random() * (max - min)) + min;
            } while (contains(id));

            return id;
        };
        var getTasks = function() {
            if (null == chats) {
                chats = localStorage.getItem('rawDataList') || [];
            }
            //return chats.slice();
            return chats;
        }
        var save = function() {
            localStorage.setItem('rawDataList', chats );
        }
        var createNewEmptyTask = function() {
            var copy = JSON.parse(JSON.stringify(zeroTask));
            copy.id = getNewId();
            copy.name = '';
            copy.lastText = '';
            return copy;
        }

        return {
            allWithNew: function() {
                var tasks = getTasks();
                tasks.splice(0, 0, zeroTask);
                return tasks;
            },
            add: function(task) {
                chats.splice(chats.indexOf(task), 1);
                save();
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
                save();
            },
            get: function(chatId) {
                var id = parseInt(chatId);

                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === id) {
                        return chats[i];
                    }
                }

                return createNewEmptyTask();
            }
        };
    })
    .factory('Tasks', function() {
        var tasks = null;
        var getTodayWeekDay = function() {
            debugger;
            return null;
        };
        var getTodayDateStr = function() {
            debugger;
            return null;
        };
        var getTaskList = function() {
            if (null != tasks) return tasks;

            var key = getTodayDateStr();
            tasks = localStorage.getItem(key);

            if (null != tasks) return tasks;

            tasks = [];
            var rawTasks = localStorage.getItem('rawDataList') || [];
            var todayWeekDay = getTodayWeekDay();

            for (var i in rawTasks) {
                var raw = rawTasks[i];

                if (raw[todayWeekDay]) {
                    var task = {
                        id: raw.id,
                        name: raw.name,
                        lastText: raw.lastText,
                        checked: false
                    };
                    tasks.splice(tasks.indexOf(task), 1);
                }
            }

            localStorage.setItem(key, tasks);
            return tasks;
        }
        var save = function() {
            var key = getTodayDateStr();
            localStorage.setItem(key, tasks);
        };

        return {
            all: function() {
                var tasks = getTaskList();
                return tasks;
            },
            check: function (task) {
                task.checked = true;
                save();
            },
            unCheck: function (task) {
                task.checked = false;
                save();
            }
        };
    });