/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/text!./templates/WidgetGuestBookGreeting.html",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/on",
	"dijit/form/TextBox",
	"guestbook/widget/_base/_ViewBaseMixin",
	"guestbook/models/Greeting",
	"guestbook/store/GreetingStore"
], function (declare, lang, template, domConstruct, domAttr, on, TextBox, _ViewBaseMixin, Greeting, GreetingStore) {
	return declare("guestbook.widget.WidgetGuestBookGreeting", [_ViewBaseMixin], {
		_txtBoxInputGreetingContent: null,
		templateString: template,
		greeting: null,

		constructor: function (kwArgs) {
			this.inherited(arguments);
			this.greeting = new Greeting(kwArgs);
		},

		postCreate: function () {
			this.inherited(arguments);
			this.own(
					on(this.linkMakeEditFormNode, "click", lang.hitch(this, "updateGreeting")),
					on(this.linkDeleteNode, "click", lang.hitch(this, "delete"))
			);
		},

		updateGreeting: function (label) {
			var task = domAttr.get(this.linkMakeEditFormNode, "task");

			if (task == "frmCreate") {
				this._txtBoxInputGreetingContent = new TextBox({value: this.greeting.content});
				domConstruct.empty(this.greetingContentNode);
				domConstruct.place(this._txtBoxInputGreetingContent.domNode, this.greetingContentNode);
				this.linkMakeEditFormNode.innerHTML = "Update";
				domAttr.set(this.linkMakeEditFormNode, "task", "frmSave");
			} else {
				if (this._txtBoxInputGreetingContent.value) {
					this.greeting.content = this._txtBoxInputGreetingContent.value;

					var fnDestroyInputGreetingContent = lang.hitch(this, function () {
						domConstruct.destroy(this._txtBoxInputGreetingContent);
					});
					var greetingStore = new GreetingStore({
						callBack: function (result) {
							alert("Edit greeting success!")
						},
						errCallBack: function (err) {
							console.log(err)
						}
					});
					greetingStore.updateGreeting(this.greeting);
					domConstruct.empty(this.greetingContentNode);
					this.greetingContentNode.innerHTML = this.greeting.content;
				} else {
					alert("Validate failed!")
				}
				domAttr.set(this.linkMakeEditFormNode, "task", "frmCreate");
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
	})
			;
})
;