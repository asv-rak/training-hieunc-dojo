/**
 * Created by hieunc on 25/11/2015.
 */

define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/guestbook_sign.html",
    "dojo/request",
    "dojo/cookie"
], function (declare, _WidgetBase, _TemplatedMixin, template, request, cookie) {
    return declare("GuestBookSign", [_WidgetBase, _TemplatedMixin], {
        templateString: template,
        signup: function () {
            if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value) {
                var greeting = {
                    "guestbook_mesage": this.GuestBookGreetingNameNode.value,
                    "guestbook_name": this.GuestBookNameNode.value
                };

                request.post("/api/guestbook/" + this.GuestBookNameNode.value + "/greeting/", {
                    data: greeting,
                    headers: {
                        "X-CSRFToken": cookie("csrftoken")
                    }
                    ,
                    handleAs: "json"
                }).
                then(
                    function (data) {
                        alert("Sign up successly!")
                    },
                    function (error) {
                        alert("Sign up failed!")
                    }
                );
            }else{
                alert("Validate failed!")
            }
        }
    });
});