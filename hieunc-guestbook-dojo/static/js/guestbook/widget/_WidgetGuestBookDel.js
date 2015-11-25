/**
 * Created by hieunc on 25/11/2015.
 */

define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/guestbook_del.html",
    "dojo/request",
    "dojo/cookie"
], function (declare, _WidgetBase, _TemplatedMixin, template, request, cookie) {
    return declare("GuestBookDel", [_WidgetBase, _TemplatedMixin], {
        templateString: template,
        deleteGreeting: function () {
            if (this.GuestBookNameNode.value && this.GuestBookGreetingIdNode.value) {
                var greeting = {
                    "greeting_id": this.GuestBookGreetingIdNode.value,
                    "guestbook_name": this.GuestBookNameNode.value
                };

                request.del("/api/guestbook/" + this.GuestBookNameNode.value + "/greeting/" + this.GuestBookGreetingIdNode.value, {
                    headers: {
                        "X-CSRFToken": cookie("csrftoken")
                    }
                }).
                then(
                    function (data) {
                        alert("Delete Greeting success!")
                    },
                    function (error) {
                        alert("Delete Greeting failed!")
                    }
                );
            }
        }
    });
});