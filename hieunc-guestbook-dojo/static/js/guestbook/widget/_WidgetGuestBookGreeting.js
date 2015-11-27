/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"my/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookGreeting.html",
	"dojo/cookie",
	"dojo/request"
], function (declare, _ViewBaseMixin, template, cookie, request) {
	return declare("_WidgetGuestBookGreeting", [_ViewBaseMixin], {
		greeting: '',

		constructor: function (kwArgs) {
			this.inherited("constructor", arguments);
			this.templateString = template;
			this.greeting = new Greeting(kwArgs);
		},

		buildRendering: function () {
			this.inherited(arguments);
			this._appenData()
		},

		_appenData: function () {
			this.GreetingIdNode.innerHTML = this.greeting.greetingId;
			this.GreetingContentNode.innerHTML = this.greeting.content;
			this.GreetingGuestbookNameNode.innerHTML = this.greeting.guestbookName;
			this.GreetingDateNode.innerHTML = this.greeting.date;
			this.GreetingUpdatedDateNode.innerHTML = this.greeting.updatedDate;
			this.GreetingUpdatedByNode.innerHTML = this.greeting.updatedBy;
		},

		delete: function () {
			var self = this;

			var _delApiRequest = new _ApiRequest({
				url: "/api/guestbook/" + this.greeting.guestbookName + "/greeting/" + this.greeting.greetingId,
				headers: {"X-CSRFToken": cookie("csrftoken")},
				method: "del", //get,post,put,del
				expect: "httpStatus", //{json,httpStatus}
				callBack: function (e) {
					console.log()
				},
				errCallBack: function (err) {
					alert("Failed to delete greeting !")
				}
			});

			_delApiRequest.getResult();
			self.domNode.remove()
		}
	});
});