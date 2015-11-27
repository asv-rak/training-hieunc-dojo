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

				var _signupApiRequest = new _ApiRequest({
					url: "/api/guestbook/" + greeting.guestbookName + "/greeting/",
					headers: {"X-CSRFToken": cookie("csrftoken")},
					method: "post", //get,post,put,del
					postData: greeting,
					expect: "httpStatus", //{json,httpStatus}
					callBack: function (e) {
						console.log(e)
					},
					errCallBack: function (err) {
						alert("Failed to delete greeting !")
					}
				});

				_signupApiRequest.getResult();
				alert("Sign up successly!")
			} else {
				alert("Validate failed!")
			}
		}
	});
});