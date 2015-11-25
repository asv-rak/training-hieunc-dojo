/**
 * Created by hieunc on 25/11/2015.
 */

define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/guestbook_edit.html",
    "dojo/request",
    "dojo/cookie"
], function (declare, _WidgetBase, _TemplatedMixin, template, request, cookie) {
    return declare("GuestBookEdit", [_WidgetBase, _TemplatedMixin], {
        templateString: template,
        editGreeting: function () {
            if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value && this.GuestBookGreetingIdNode.value) {
                var greeting = {
                    "guestbook_name": this.GuestBookNameNode.value,
                    "guestbook_mesage": this.GuestBookGreetingNameNode.value,
                    "greeting_id": this.GuestBookGreetingIdNode.value
                };

                request.put("/api/guestbook/" + this.GuestBookNameNode.value + "/greeting/" + this.GuestBookGreetingIdNode.value, {
                    data: greeting,
                    headers: {
                        "X-CSRFToken": cookie("csrftoken")
                    }
                    ,
                    handleAs: "json"
                }).
                then(
                    function (data) {
                        alert("Edit greeting success!")
                    },
                    function (error) {
                        alert("Edit greeting failed!")
                    }
                );
            } else {
                alert("Validate failed!")
            }
        }
    });
});