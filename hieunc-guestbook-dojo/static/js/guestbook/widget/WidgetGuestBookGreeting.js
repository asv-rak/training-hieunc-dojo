/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/widget/_base/_ViewBaseMixin",
	"dojo/text!./templates/WidgetGuestBookGreeting.html",
	"guestbook/models/Greeting",
	"guestbook/store/GreetingStore"
	//"models/Greeting"
], function (declare, _ViewBaseMixin, template, Greeting, GreetingStore) {
	return declare("guestbook.widget.WidgetGuestBookGreeting", [_ViewBaseMixin], {
		templateString: template,
		greeting: '',
		widgetGuestBookGetListParent: '',

		constructor: function (kwArgs) {
			this.inherited(arguments);
			this.greeting = new Greeting(kwArgs);
		},

		setWidgetGuestBookList: function (instance) {
			this.widgetGuestBookGetListParent = instance;
		},

		makeEditForm: function () {
			if (this.greeting.isAdmin || this.greeting.updatedBy == this.greeting.userInfo) {
				this.widgetGuestBookGetListParent.generateEditForm(this.greeting);
			} else {
				alert("Permission denied!")
			}
		},

		delete: function () {
			var self = this;
			if (this.greeting.isAdmin || this.greeting.updatedBy == this.greeting.userInfo) {
				var greetingStore = new GreetingStore({
					callBack: function (result) {
						console.log(result)
					},
					errCallBack: function (err) {
						console.log(err)
					}
				});

				greetingStore.deleteGreeting(this.greeting.guestbookName, this.greeting.greetingId);
				self.domNode.remove()
			} else {
				alert("Permission denied!")
			}
		}
	});
});