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
                chats = localStorage.getItem("rawDataList") || [];
            }
            //return chats.slice();
            return chats();
        }

        return {
            allWithNew: function() {
                var tasks = getTasks();
                tasks.splice(0, 0, zeroTask);
                return tasks;
            },
            add: function(task) {
                var tasks = chats;
                tasks.splice(tasks.indexOf(task), 1);
                save(tasks);
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                var id = parseInt(chatId);

                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === id) {
                        return chats[i];
                    }
                }

                var copy = JSON.parse(JSON.stringify(zeroTask));
                copy.id = getNewId();
                copy.name = "";
                copy.lastText = "";
                return copy;
            }
        };
    })
    .factory('Tasks', function() {
        var tasks = null;
        var getTodayWeekDay = function () {
            debugger;
            return null;
        }
        var getTaskList = function() {
            if (null == tasks) {
                tasks = [];
                var rawTasks = localStorage.getItem("rawDataList") || [];
                var todayWeekDay = getTodayWeekDay();

                for (var i in rawTasks) {
                    var raw = rawTasks[i];

                    if (raw.weeks[todayWeekDay]) {
                        var task = {
                            id: raw.id,
                            name: raw.name,
                            lastText: raw.lastText,
                            check:false
                        };
                        tasks.splice(tasks.indexOf(task), 1);
                    }
                }
            }

            return tasks;
        }

        return {
            all: function() {
                var tasks = getTaskList();
                return tasks;
            },
            check: function (task) {
                //save
                debugger; //not implemented yet
            },
            unCheck: function (task) {
                //save again
                debugger; //not implemented yet
            }
        };
    });