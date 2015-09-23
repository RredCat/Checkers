angular.module('starter.services', [])
    .factory('Chats', function () {
        var chats = null;
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
        var contains = function (id) {
            for (var i in chats) {
                if (chats[i].id === id) return true;
            }

            return false;
        };
        var getNewId = function () {
            var min = 1, max = 32767;
            var id;

            do {
                id = Math.floor(Math.random() * (max - min)) + min;
            } while (contains(id));

            return id;
        };
        var initTasks = function () {
            if (null == chats) {
                chats = JSON.parse(localStorage.getItem('rawDataList')) || [];
            }

            if (-1 === chats.indexOf(zeroTask)) {
                chats.unshift(zeroTask);
            }
        };
        var createNewEmptyTask = function () {
            var copy = JSON.parse(JSON.stringify(zeroTask));
            copy.id = getNewId();
            copy.name = '';
            copy.lastText = '';
            return copy;
        };
        var save = function () {
            var tasks = chats.slice();
            var index = tasks.indexOf(zeroTask);

            if (-1 !== index) {
                tasks.shift();
            }

            localStorage.setItem('rawDataList', JSON.stringify(tasks));
        };

        return {
            allWithNew: function () {
                initTasks();
                //save();
                return chats;
            },
            add: function (task) {
                chats.push(task);
                save();
            },
            remove: function (task) {
                var index = chats.indexOf(task);
                chats.splice(index, 1);
                save();
            },
            save: function () {
                save();
            },
            get: function (chatId) {
                var id = parseInt(chatId);

                if (0 === id) return createNewEmptyTask();

                for (var i = 0; i < chats.length; i++) {
                    var chat = chats[i];
                    if (chat.id === id && chat!==zeroTask) {
                        return chats[i];
                    }
                }

                return createNewEmptyTask();
            }
        };
    })
    .factory('Tasks', function () {
        var tasks = null;
        var getTodayWeekDay = function () {
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
        var save = function (key) {
            key = key || getTodayDateStr();
            localStorage.setItem(key, JSON.stringify(tasks));
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
        };

        return {
            all: function () {
                var allTasks = getTaskList();
                return allTasks;
            },
            save: function () {
                save();
            }
        };
    });