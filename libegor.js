// libegor v1.5 | Copyright 2019 libegor.ru/js | http://www.apache.org/licenses/LICENSE-2.0
// git: https://github.com/libegor/js
// contact: team@libegor.ru
libegor = {
    Class: {},
    moveparam: function (a, b) {
        for (let key in b) {
            if (typeof b[key] !== 'object') a[key] = b[key];
            else {
                if (b[key].obj || b[key].getFullYear || b[key] === null) {
                    a[key] = b[key];
                    continue;
                }
                if (!a[key]) a[key] = {};
                libegor.moveparam(a[key], b[key]);
            }
        }
    },
    isset: function (a) {
        return a !== undefined;
    },
    addClass: function (c) {
        if (typeof this.classList !== 'undefined') this.classList.add(c);
        return this;
    },
    delClass: function (c) {
        if (typeof this.classList !== 'undefined') this.classList.remove(c);
        return this;
    },
    ifClass: function (c) {
        if (typeof this.classList === 'undefined') return false;
        return this.classList.contains(c);
    },
    hide: function () {
        if (typeof this.classList !== 'undefined') this.addClass('hidden');
        return this;
    },
    show: function () {
        if (typeof this.classList !== 'undefined') this.delClass('hidden');
        return this;
    },
    del: function () {
        if (this.parentNode && this.parentNode.removeChild) this.parentNode.removeChild(this);
    },
    set: function (att, value) {
        this.setAttribute(att, value);
        return this;
    },
    get: function (att) {
        return this.getAttribute(att);
    },
    has: function (att) {
        return this.hasAttribute(att);
    },
    rem: function (att) {
        this.removeAttribute(att);
        return this;
    },
    push: function (obj) {
        let i = 0;
        while (this.el[i]) i++;
        obj.obj.key = i;
        return this.el[i] = obj;
    },
    pushList: function (obj) {
        let i = 0;
        while (this.el.list.el[i]) i++;
        obj.obj.key = i;
        return this.el.list.el[i] = obj;
    },
    add: function () {
        // example #1: .libegor.add(body, 'table')
        // param1[object] - html node parent element;
        // param2[string] - tag name new element.

        // example #2: .libegor.add('row_1', 'tr')
        // param1[string] - name child of parent;
        // param2[string] - tag name new element.

        // example #3: .libegor.add('myRow', 'tr', {class: 'row'})
        // param1[string] - name child of parent;
        // param2[string] - tag name new element;
        // param3[object] - new object data.

        // example #4: .libegor.add(td_1, 'input', {type: 'text', value: 'hello world'})
        // param1[object] - html node parent element;
        // param2[string] - tag name new element;
        // param3[object] - new object data.

        // example #5: .libegor.add('input', {type: 'text', value: 'hello world'})
        // param1[string] - tag name new element;
        // param2[object] - new object data.

        // example #6: .libegor.add('br')
        // param1[string] - tag name new element;

        // example #7: .libegor.add(table, 'rowSearch', 'tr', {text: '<td>id</td>'})
        // param1[object] - html node parent element;
        // param2[string] - name child of parent;
        // param3[string] - tag name new element;
        // param4[object] - new object data.


        let len = arguments.length;
        let parent;// parent node
        let id;// name child of parent
        let type;// tag name new element
        let param;// new object data

        if (len === 4) {
            // example #7
            parent = arguments[0];
            id = arguments[1];
            type = arguments[2];
            param = arguments[3];
        } else if (len === 3) {
            if (typeof arguments[0] !== 'object') {
                // example #3
                parent = this;
                id = arguments[0];
                type = arguments[1];
                param = arguments[2];
            } else {
                // example #4
                parent = arguments[0];
                type = arguments[1];
                param = arguments[2];
            }
        } else if (len === 2) {
            if (typeof arguments[0] !== 'object' && typeof arguments[1] !== 'object') {
                // example #2
                parent = this;
                id = arguments[0];
                type = arguments[1];
            } else if (typeof arguments[0] === 'object') {
                // example #1
                parent = arguments[0];
                type = arguments[1];
            } else {
                // example #5
                parent = this;
                type = arguments[0];
                param = arguments[1];
            }
        } else if (len) {
            // example #6
            parent = this;
            type = arguments[0];
        }
        else return 0;

        let obj;//new dom element

        if (type === 'text') {
            obj = document.createTextNode(param.text);
            delete param.text;
        }
        else obj = document.createElement(type);

        obj.parent = parent; // parentNode
        obj.obj = {};// object data
        obj.el = {}; // child elements
        obj.set = libegor.set;
        obj.get = libegor.get;
        obj.has = libegor.has;
        obj.rem = libegor.rem;
        obj.push = libegor.push;
        obj.pushList = libegor.pushList;
        obj.addClass = libegor.addClass;
        obj.delClass = libegor.delClass;
        obj.ifClass = libegor.ifClass;
        obj.hide = libegor.hide;
        obj.show = libegor.show;
        obj.del = libegor.del;
        obj.add = libegor.add;

        if (param) {
            if (param.after) {
                if (param.after.nextSibling) param.after.parentNode.insertBefore(obj, param.after.nextSibling); else param.after.parentNode.appendChild(obj);
                delete param.after;
            } else if (param.before) {
                param.before.parentNode.insertBefore(obj, param.before);
                delete param.before;
            } else if (param.replace) {
                param.replace.parentNode.replaceChild(obj, param.replace);
                delete param.replace;
            } else obj.parent.appendChild(obj);

            if (type !== 'text') {
                for (let key in param) {
                    switch (key) {
                        case 'base':
                        case 'baseAfter':
                        case 'reconstruct':
                        case 'push':
                            break;
                        case 'style':
                            obj.style.cssText = param[key];
                            delete param[key];
                            break;
                        case 'checked':
                            if (param[key] === true) obj.checked = true;
                            delete param[key];
                            break;
                        case 'text':
                            obj.innerHTML = param[key];
                            delete param[key];
                            break;
                        case 'onkeyenter':
                            obj['onkeydown'] = function (e) {
                                if (this._onkeydown) this._onkeydown();
                                if (e.keyCode === 13 && this.onkeyenter) this.onkeyenter();
                            };
                            obj[key] = param[key];
                            delete param[key];
                            break;
                        default:
                            if (typeof param[key] === 'object' || typeof param[key] === 'function') {
                                obj[key] = param[key];
                            } else {
                                obj.setAttribute(key, param[key]);
                            }// if

                            delete param[key];
                    }//switch
                }// for

                if (param.base) {
                    if (typeof param.base === 'function') {
                        obj.base = param.base;
                        obj.base();
                    } else {
                        for (let key in param.base) {
                            let Class = param.base[key].class;

                            if (typeof Class === 'function') {
                                obj.base = Class;
                                if (param.base[key].param) obj.base(param.base[key].param);
                                else obj.base();
                            } else if (typeof Class === 'object') for (let kec in Class) obj[kec] = Class[kec];
                        }// for
                    }// if

                    delete param.base;
                }// param.base
            }// type != text
        } else obj.parent.appendChild(obj);// if param

        let type_id = typeof id;

        if (type_id !== 'undefined' && type_id !== 'object') obj.parent.el[id] = obj;
        else if (param && param.push) {
            let i = 0;
            while (param.push[i]) i++;
            param.push[i] = obj;
        }// if

        if (obj.construct) obj.construct();
        return obj;
    },// add
    searchInArray: function (array, param) {
        if (typeof param === 'object') {

            Inner:for (let i in array) {
                for (let key in param) {
                    if (typeof array[i][key] === 'undefined') continue Inner;
                    if (array[i][key] !== param[key]) continue Inner;
                }

                if (arguments[2]) {
                    for (let key in arguments[2]) {
                        if (typeof array[i][key] !== 'undefined' && array[i][key] === arguments[2][key]) continue Inner;
                    }
                }

                return array[i];
            }

        } else {
            for (let i in array) if (array[i] === param) return array[i];
        }

        return 0;
    },// searchInArray
    searchArrayInArray: function (array, param) {
        let ret = [];
        if (typeof param === 'object') {

            Inner:for (let i in array) {
                for (let key in param) {
                    if (typeof array[i][key] === 'undefined') continue Inner;
                    if (array[i][key] !== param[key]) continue Inner;
                }

                if (arguments[2]) {
                    for (let key in arguments[2]) {
                        if (typeof array[i][key] !== 'undefined' && array[i][key] === arguments[2][key]) continue Inner;
                    }
                }

                ret.push(array[i]);
            }
        } else {
            for (let i in array) if (array[i] === param) ret.push(array[i]);
        }

        return ret;
    }// searchArrayInArray
};//libegor
