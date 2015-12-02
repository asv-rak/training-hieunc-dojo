/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/widget/_base/_ViewBaseMixin",
	"dojo/text!./templates/WidgetGuestBookGreeting.html",
	"guestbook/models/Greeting",
	"guestbook/store/GreetingStore",
	"dojo/_base/lang",
	"dojo/on"
], function (declare, _ViewBaseMixin, template, Greeting, GreetingStore, lang, on) {
	return declare("guestbook.widget.WidgetGuestBookGreeting", [_ViewBaseMixin], {
		templateString: template,
		greeting: '',
		widgetGuestBookGetListParent: '',

		constructor: function (kwArgs) {
			this.inherited(arguments);
			this.greeting = new Greeting(kwArgs);
		},

		postCreate: function () {
			this.inherited(arguments);
			this.own(
					on(this.linkMakeEditFormNode, "click", lang.hitch(this, "makeEditForm")),
					on(this.linkDeleteNode, "click", lang.hitch(this, "delete"))
			);
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
			var fnDestroyGreeting = lang.hitch(this, "destroy");
			if (this.greeting.isAdmin || this.greeting.updatedBy == this.greeting.userInfo) {
				var greetingStore = new GreetingStore({
					callBack: function (result) {
						fnDestroyGreeting();
					},
					errCallBack: function (err) {
						console.log(err)
					}
				});

				greetingStore.deleteGreeting(this.greeting.guestbookName, this.greeting.greetingId);
			} else {
				alert("Permission denied!")
			}
		}
	});
});