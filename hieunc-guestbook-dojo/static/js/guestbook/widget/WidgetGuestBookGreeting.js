/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dijit/registry",
	"dojo/on",
	"dijit/form/TextBox",
	"guestbook/widget/_base/_ViewBaseMixin",
	"dojo/text!./templates/WidgetGuestBookGreeting.html",
	"guestbook/models/Greeting",
	"guestbook/store/GreetingStore"
], function (declare, lang, domConstruct, domAttr, registry, on, TextBox, _ViewBaseMixin, template, Greeting, GreetingStore) {
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
		}
		,

		updateGreeting: function (label) {
			var task = domAttr.get(this.linkMakeEditFormNode, "task");

			if (task == "frmCreate") {
				this._txtBoxInputGreetingContent = new TextBox({value: this.greeting.content});
				domConstruct.empty(this.GreetingContentNode);
				domConstruct.place(this._txtBoxInputGreetingContent.domNode, this.GreetingContentNode);
				this.linkMakeEditFormNode.innerHTML = "Update";
				domAttr.set(this.linkMakeEditFormNode, "task", "frmSave");
			} else {
				if (this._txtBoxInputGreetingContent.value) {
					this.greeting.content = this._txtBoxInputGreetingContent.value;
					var fnDestroyInputGreetingContent = lang.hitch(this._txtBoxInputGreetingContent, "destroy");
					var greetingStore = new GreetingStore({
						callBack: function (result) {
							fnDestroyInputGreetingContent();
							alert("Edit greeting success!")
						},
						errCallBack: function (err) {
							console.log(err)
						}
					});
					greetingStore.updateGreeting(this.greeting);
					domConstruct.empty(this.GreetingContentNode);
					this.GreetingContentNode.innerHTML = this.greeting.content;
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