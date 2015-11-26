/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"my/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookSign.html",
	"dojo/cookie"
], function (declare, _ViewBaseMixin, template, cookie) {
	return declare("_WidgetGuestBookSign", [_ViewBaseMixin], {

		constructor: function (kwArgs) {
			this.inherited("constructor", arguments);
			this.templateString = template;
		},

		signup: function () {
			if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value) {
				var greeting = {
					"guestbook_mesage": this.GuestBookGreetingNameNode.value,
					"guestbook_name": this.GuestBookNameNode.value
				};

				this.request.post("/api/guestbook/" + this.GuestBookNameNode.value + "/greeting/", {
					data: greeting,
					headers: {
						"X-CSRFToken": cookie("csrftoken")
					},
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
			} else {
				alert("Validate failed!")
			}
		}
	});
});