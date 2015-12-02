/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"dojo/text!./templates/WidgetGuestBookEdit.html",
	"guestbook/widget/_base/_ViewBaseMixin",
	"guestbook/models/Greeting",
	"guestbook/store/GreetingStore"
], function (declare, lang, on, template, _ViewBaseMixin, Greeting, GreetingStore) {
	return declare("guestbook.widget.WidgetGuestBookEdit", [_ViewBaseMixin], {
		templateString: template,
		greeting: null,
		widgetGuestBookGetListParent: null,

		constructor: function (kwArgs) {
			this.templateString = template;
			this.greeting = kwArgs.greeting;
			this.widgetGuestBookGetListParent = kwArgs.widgetGuestBookGetListParent;
		},

		postCreate: function () {
			this.inherited(arguments);
			this.own(
					on(this.btnEditGreetingNode, "click", lang.hitch(this, "editGreeting"))
			);
		},

		editGreeting: function () {
			var fnDestroyGreeting = lang.hitch(this, "destroy"),
					fnRefeshGreetingList = lang.hitch(this.widgetGuestBookGetListParent, "getList");
			if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value && this.GuestBookGreetingIdNode.value) {
				this.greeting.content = this.GuestBookGreetingNameNode.value;
				var greetingStore = new GreetingStore({
					callBack: function (result) {
						fnRefeshGreetingList();
						fnDestroyGreeting();
						alert("Edit greeting success!")
					},
					errCallBack: function (err) {
						console.log(err)
					}
				});
				greetingStore.updateGreeting(this.greeting);
			} else {
				alert("Validate failed!")
			}
		}
	});
});