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
	"guestbook/widget/_base/_ViewBaseMixin",
	"dojo/text!./templates/WidgetGuestBookGreeting.html",
	"guestbook/models/Greeting",
	"guestbook/store/GreetingStore"
], function (declare, lang, domConstruct, domAttr, registry, on, _ViewBaseMixin, template, Greeting, GreetingStore) {
	return declare("guestbook.widget.WidgetGuestBookGreeting", [_ViewBaseMixin], {
		templateString: template,
		greeting: null,
		widgetGuestBookGetListParent: '',

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

		setWidgetGuestBookList: function (instance) {
			this.widgetGuestBookGetListParent = instance;
		},

		updateGreeting: function (label) {
			var task = domAttr.get(this.linkMakeEditFormNode, "task");
			var node = domConstruct.create("input", {
				type: "text",
				value: this.greeting.content,
				"data-dojo-attach-point": "inpGreetingContentNode"
			});

			if (task == "frmCreate") {
				domConstruct.place(node, this.GreetingContentNode);
				registry.byNode(node, this);
				task = "frmSave";
				this.linkMakeEditFormNode.innerHTML = "Update";
			} else {
				if (node.value) {
					console.log(this.inpGreetingContentNode.value);
				}
				//	this.greeting.content = node.value;
				//	var fnDestroyGreeting = lang.hitch(this, function () {
				//		this.GreetingContentNode.innerHTML = this.greeting.content
				//	});
				//	var greetingStore = new GreetingStore({
				//		callBack: function (result) {
				//			fnDestroyGreeting();
				//			alert("Edit greeting success!")
				//		},
				//		errCallBack: function (err) {
				//			console.log(err)
				//		}
				//	});
				//	greetingStore.updateGreeting(this.greeting);
				//} else {
				//	alert("Validate failed!")
				//}

			}
			domAttr.set(this.linkMakeEditFormNode, "task", task);
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