/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"my/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookEdit.html",
	"dojo/cookie"
], function (declare, _ViewBaseMixin, template, cookie) {
	return declare("_WidgetGuestBookEdit", [_ViewBaseMixin], {

		constructor: function (kwArgs) {
			this.inherited("constructor", arguments);
			this.templateString = template;
		},

		editGreeting: function () {
			if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value && this.GuestBookGreetingIdNode.value) {
				var greeting = {
					"guestbook_name": this.GuestBookNameNode.value,
					"guestbook_mesage": this.GuestBookGreetingNameNode.value,
					"greeting_id": this.GuestBookGreetingIdNode.value
				};

				var _editApiRequest = new _ApiRequest({
					url: "/api/guestbook/" + greeting.guestbook_name + "/greeting/" + greeting.greeting_id,
					headers: {"X-CSRFToken": cookie("csrftoken")},
					method: "put", //get,post,put,del
					postData: greeting,
					expect: "httpStatus", //{json,httpStatus}
					callBack: function (e) {
						console.log(e)
					},
					errCallBack: function (err) {
						alert("Failed to delete greeting !")
					}
				});
				_editApiRequest.getResult();
				alert("Edit greeting success!")
			} else {
				alert("Validate failed!")
			}
		}
	});
});