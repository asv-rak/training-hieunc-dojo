/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookSign.html",
	"dojo/cookie"
], function (declare, _ViewBaseMixin, template, cookie) {
	return declare("_WidgetGuestBookSign", [_ViewBaseMixin], {
		_guesbookName: "guestbook_default",
		_parentWidget: "",

		constructor: function (kwArgs) {
			this.templateString = template;
			this._parentWidget = kwArgs.widgetGuestBookGetListParent;
			this._guesbookName = kwArgs.guestbook_name;
		},

		postCreate: function () {
			this.inherited(arguments);
			this.GuestBookNameNode.value = this._guesbookName;
		},

		createNew: function () {
			if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value) {
				var greeting = {
					"guestbook_mesage": this.GuestBookGreetingNameNode.value,
					"guestbook_name": this.GuestBookNameNode.value
				};

				var _signupApiRequest = new _GreetingStore({
					callBack: function (e) {
						console.log(e)
					},
					errCallBack: function (err) {
						alert("Failed to delete greeting !")
					}
				});

				_signupApiRequest.createNewGreeting(greeting, cookie("csrftoken"));
				this.GuestBookGreetingNameNode.value = "";
				this._parentWidget.getList();
				alert("Sign up successly!")
			} else {
				alert("Validate failed!")
			}
		}
	});
});