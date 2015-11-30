/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookGreeting.html",
	"dojo/cookie"
], function (declare, _ViewBaseMixin, template, cookie) {
	return declare("_WidgetGuestBookGreeting", [_ViewBaseMixin], {
		greeting: '',
		widgetGuestBookGetListParent: '',

		constructor: function (kwArgs) {
			this.inherited(arguments);
			this.templateString = template;
			this.greeting = new guestbook.models.Greeting(kwArgs);
		},

		setWidgetGuestBookGetListParent: function (instance) {
			this.widgetGuestBookGetListParent = instance;
		},

		makeEditForm: function () {
			this.widgetGuestBookGetListParent.generateEditForm(this.greeting);
		},

		delete: function () {
			var self = this;

			var _delApiRequest = new _GreetingStore({
				callBack: function (e) {
					console.log()
				},
				errCallBack: function (err) {
					alert("Failed to delete greeting !")
				}
			});

			_delApiRequest.deleteGreeting(this.greeting.guestbookName, this.greeting.greetingId, cookie("csrftoken"));
			self.domNode.remove()
		}
	});
});