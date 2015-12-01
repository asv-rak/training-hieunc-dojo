/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/widget/_base/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookList.html",
	"dojo/_base/array",
	"guestbook/widget/_WidgetGuestBookGreeting",
	"guestbook/widget/_WidgetGuestBookSign",
	"guestbook/widget/_WidgetGuestBookEdit"
], function (declare, _ViewBaseMixin, template, array, WidgetGuestBookGreeting,WidgetGuestBookSign,WidgetGuestBookEdit) {
	return declare("_WidgetGuestBookList", [_ViewBaseMixin], {
		templateString: template,
		constructor: function (/*Object*/ kwArgs) {
			this.inherited(arguments);
		},

		postCreate: function () {
			this.inherited(arguments);
			var guestbookSignWidget = new WidgetGuestBookSign({
						widgetGuestBookGetListParent: this,
						guestbook_name: this.GuestBookNameNode.value
					})
					;
			this.domConstruct.place(guestbookSignWidget.domNode, this.GuestBookSignNode);
			this.getList();
		},

		getList: function () {
			if (this.GuestBookNameNode.value) {
				var listContent = this.guestbook_list_content;
				listContent.innerHTML = '';
				var _domConstruct = this.domConstruct;
				var widgetGuestBookGetListParent = this;
				this.guestbook_list_header.innerHTML = this.GuestBookNameNode.value;
				var greetingStore = new GreetingStore({
					callBack: function (data) {
						var greeting;
						array.forEach(data.greetings, function (jsonGreeting) {
							greeting = new WidgetGuestBookGreeting(jsonGreeting);
							greeting.setWidgetGuestBookList(widgetGuestBookGetListParent);
							_domConstruct.place(greeting.domNode, listContent);
						});
					},
					errCallBack: function (err) {
						console.log(err)
					}
				});
				greetingStore.getGreetingList(this.GuestBookNameNode.value);
			}
		},

		generateEditForm: function (greeting) {
			var guesbookEditWidget = new WidgetGuestBookEdit({
				"greeting": greeting,
				"widgetGuestBookGetListParent": this
			});
			this.GuestBookEditNode.innerHTML = '';
			this.domConstruct.place(guesbookEditWidget.domNode, this.GuestBookEditNode);
		}

	});
});