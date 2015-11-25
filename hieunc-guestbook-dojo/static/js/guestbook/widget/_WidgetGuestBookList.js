/**
 * Created by hieunc on 25/11/2015.
 */

define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/guestbook_list.html",
    "dojo/request",
], function (declare, _WidgetBase, _TemplatedMixin, template, request) {
    return declare("GuestBookList", [_WidgetBase, _TemplatedMixin], {
        templateString: template,
        increment: function () {
            if (this.GuestBookNameNode.value) {
                this.guestbook_list_header.innerHTML = this.GuestBookNameNode.value;
                var listContent = this.guestbook_list_content;
                request("/api/guestbook/" + this.GuestBookNameNode.value + "/greeting/", {handleAs: "json"}).then(
                    function (data) {
                        var list = "";
                        for (var i = 0; i < data.greetings.length; i++) {
                            list += "<tr>" +
                                "<td>" + data.greetings[i].greeting_id + "</td>" +
                                "<td>" + data.greetings[i].content + "</td>" +
                                "<td>" + data.greetings[i].guestbook_name + "</td>" +
                                "<td>" + data.greetings[i].date + "</td>" +
                                "<td>" + data.greetings[i].updated_date + "</td>" +
                                "<td>" + data.greetings[i].updated_by + "</td>" +
                                "</tr>";
                        }
                        listContent.innerHTML = list;
                    },
                    function (error) {
                        console.log("An error occurred: " + error);
                    }
                );
            }
        }
    });
});