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
                wednesday: true,
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
                chats = JSON.parse(localStorage.getItem('rawDataList')) || [];
            }

            return chats.slice();
            //return chats;
        }
        var save = function() {
            localStorage.setItem('rawDataList', JSON.stringify(chats) );
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
                save();
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
            var weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            var date = new Date();
            var day = date.getDay();
            return weekday[day];
        };
        var getTodayDateStr = function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            return dd + '/' + mm + '/' + yyyy;
        };
        var isNull = function (value) {
            return null == value || '' == value;
        };
        var getTaskList = function() {
            if (!isNull(tasks)) return tasks;

            var key = getTodayDateStr();
            tasks = JSON.parse(localStorage.getItem(key));

            if (!isNull(tasks)) return tasks;

            tasks = [];
            var rawTasks = JSON.parse(localStorage.getItem('rawDataList')) || [];
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
                    tasks.push(task);
                }
            }

            save(key);
            return tasks;
        }
        var save = function (key) {
            key = key||getTodayDateStr();
            localStorage.setItem(key, JSON.stringify(tasks));
        };

        return {
            all: function() {
                var allTasks = getTaskList();
                return allTasks;
            },
            save: function () {
                save();
            }
        };
    });