/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/widget/_base/_ViewBaseMixin",
	"dojo/text!./templates/WidgetGuestBookEdit.html",
	"guestbook/models/Greeting",
	"guestbook/store/GreetingStore",
	"dojo/_base/lang",
	"dojo/on"
], function (declare, _ViewBaseMixin, template, Greeting, GreetingStore, lang, on) {
	return declare("guestbook.widget.WidgetGuestBookEdit", [_ViewBaseMixin], {
		templateString: template,
		greeting: '',
		widgetGuestBookGetListParent: '',

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
			var self = this;
			if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value && this.GuestBookGreetingIdNode.value) {
				this.greeting.content = this.GuestBookGreetingNameNode.value;
				var greetingStore = new GreetingStore({
					callBack: function (result) {
						self.widgetGuestBookGetListParent.getList();
						self.domNode.remove();
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