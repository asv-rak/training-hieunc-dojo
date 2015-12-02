/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/widget/_base/_ViewBaseMixin",
	"dojo/text!./templates/WidgetGuestBookSign.html",
	"guestbook/models/Greeting",
	"guestbook/store/GreetingStore",
	"dojo/_base/lang",
	"dojo/on"
], function (declare, _ViewBaseMixin, template, Greeting, GreetingStore, lang, on) {
	return declare("guestbook.widget.WidgetGuestBookSign", [_ViewBaseMixin], {
		templateString: template,
		_guesbookName: "guestbook_default",
		_parentWidget: "",

		constructor: function (kwArgs) {
			this._parentWidget = kwArgs.widgetGuestBookGetListParent;
			this._guesbookName = kwArgs.guestbook_name;
		},

		postCreate: function () {
			this.inherited(arguments);
			this.GuestBookNameNode.value = this._guesbookName;

			this.own(
					on(this.btnGuestbookSignNode, "click", lang.hitch(this, "createNew"))
			);
		},

		createNew: function () {
			if (this.GuestBookNameNode.value && this.GuestBookGreetingNameNode.value) {
				var greeting = {
					"guestbook_mesage": this.GuestBookGreetingNameNode.value,
					"guestbook_name": this.GuestBookNameNode.value
				};

				var greetingStore = new GreetingStore({
					callBack: function (result) {
						console.log(result)
					},
					errCallBack: function (err) {
						alert(err)
					}
				});

				greetingStore.createNewGreeting(greeting);
				this.GuestBookGreetingNameNode.value = "";
				this._parentWidget.getList();
				alert("Sign up successly!")
			} else {
				alert("Validate failed!")
			}
		}
	});
});