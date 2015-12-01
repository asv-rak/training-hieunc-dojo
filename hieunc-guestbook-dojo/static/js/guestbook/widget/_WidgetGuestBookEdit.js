/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookEdit.html",
	"dojo/cookie"
], function (declare, _ViewBaseMixin, template, cookie) {
	return declare("_WidgetGuestBookEdit", [_ViewBaseMixin], {
		templateString: template,
		greeting: '',
		widgetGuestBookGetListParent: '',

		constructor: function (kwArgs) {
			this.templateString = template;
			this.greeting = kwArgs.greeting;
			this.widgetGuestBookGetListParent = kwArgs.widgetGuestBookGetListParent;
		},

		editGreeting: function () {
			if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value && this.GuestBookGreetingIdNode.value) {
				this.greeting.content = this.GuestBookGreetingNameNode.value;
				var greetingStore = new GreetingStore({
					callBack: function (result) {
						console.log(result)
					},
					errCallBack: function (err) {
						console.log(err)
					}
				});
				greetingStore.updateGreeting(this.greeting);
				this.widgetGuestBookGetListParent.getList();
				this.domNode.remove();
				alert("Edit greeting success!")
			} else {
				alert("Validate failed!")
			}
		}
	});
});