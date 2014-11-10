/*jslint browser:true */

/**
 * return date in format <year>.<month>.<date> <hh>:<mm>:<ss>
 * @returns {String} represents time
 */
var time_mark = function(){
    var a = new Date();
    var rzlt = a.getFullYear() +
        '.' + (a.getMonth() < 10 ? '0' + a.getMonth() : a.getMonth()) +
        '.' + (a.getDate() < 10 ? '0' + a.getDate() : a.getDate()) +
        ' ' + (a.getHours() < 10 ? '0' + a.getHours() : a.getHours()) +
        ':' + (a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()) +
        ':' + (a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds());
    return rzlt;
};


var mouse_over_message = function() {
    this.getElementsByClassName('delete_message')[0].style.display = 'block';
    this.getElementsByClassName('message_text')[0].style.marginTop = '-25px';
};

var mouse_out_message = function() {
    this.getElementsByClassName('delete_message')[0].style.display = '';
    this.getElementsByClassName('message_text')[0].style.marginTop = '15px';
};

/**
 * adds div with message block to th page
 * @param {String} _time_mark date + time of creating message (is used as a key in localStorage)
 *                            and like id attribute for delete button
 * @param {String} _text      text that sholud be added to the message block
 */
var add_message = function(_time_mark, _text) {
    document.getElementById('messages_block').innerHTML = '<div class="message"><div class="time_mark">' +
        _time_mark + '</div><div class="delete_message" id="del_' + _time_mark +
        '"> X </div><div class="message_text">' + _text + '</div></div>' +
        document.getElementById('messages_block').innerHTML;
    var del_btn = document.getElementsByClassName('delete_message');
    for (var i = 0; i < del_btn.length; i++) {
        del_btn[i].onclick = del_function;
        del_btn[i].parentElement.onmouseover = mouse_over_message;
        del_btn[i].parentElement.onmouseout = mouse_out_message;
    }
};


/**
 * deletes message block
 */
var del_function = function () {
    this.parentElement.parentElement.removeChild(this.parentElement);
    window.localStorage.removeItem(this.id.slice(4));
};


window.onload = function() {
    for (var i in window.localStorage) {
        add_message(i, window.localStorage[i]);
    }
    var save = document.getElementById('save');

    /**
     * action on saving text in textarea field. Adds a message like a separate block to the page,
     * makes time marker for it, saves message to localStorage and cleans textarea
     */
    save.onclick = function() {
        var text = document.getElementById('message_input');
        var _time_mark = time_mark();
        var _text = text.value.replace('\n', '<br/>', 'g');
        window.localStorage[_time_mark] = _text;
        add_message(_time_mark, _text);
        text.value = '';

    };
};
