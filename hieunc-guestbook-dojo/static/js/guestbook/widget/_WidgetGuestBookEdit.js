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
		greeting: '',
		widgetGuestBookGetListParent: '',

		constructor: function (kwArgs) {
			this.inherited(arguments);
			this.templateString = template;
			this.greeting = kwArgs.greeting;
			this.widgetGuestBookGetListParent = kwArgs.widgetGuestBookGetListParent;
		},

		buildRendering: function () {
			this.inherited(arguments);
			this._appenData()
		},

		_appenData: function () {
			this.GuestBookGreetingIdNode.value = this.greeting.greetingId;
			this.GuestBookGreetingNameNode.value = this.greeting.content;
			this.GuestBookNameNode.value = this.greeting.guestbookName;
		},

		editGreeting: function () {
			if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value && this.GuestBookGreetingIdNode.value) {
				this.greeting.content = this.GuestBookGreetingNameNode.value;

				var _editApiRequest = new _GreetingStore({
					callBack: function (e) {
						console.log(e)
					},
					errCallBack: function (err) {
						alert("Failed to delete greeting !")
					}
				});
				_editApiRequest.updateGreeting(this.greeting, cookie("csrftoken"));
				this.widgetGuestBookGetListParent.getList();
				this.domNode.remove();
				alert("Edit greeting success!")
			} else {
				alert("Validate failed!")
			}
		}
	});
});