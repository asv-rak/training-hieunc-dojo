/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/text!./templates/WidgetGuestBookList.html",
	"guestbook/widget/_base/_ViewBaseMixin",
	"guestbook/store/GreetingStore",
	"guestbook/widget/WidgetGuestBookGreeting",
	"guestbook/widget/WidgetGuestBookSign",
	"guestbook/widget/WidgetGuestBookEdit"
], function (declare, lang, array, domConstruct, on, template, _ViewBaseMixin, GreetingStore, WidgetGuestBookGreeting,
             WidgetGuestBookSign, WidgetGuestBookEdit) {
	return declare("guestbook.widget.WidgetGuestBookList", [_ViewBaseMixin], {
		templateString: template,

		constructor: function (/*Object*/ kwArgs) {
			this.inherited(arguments);
		},

		postCreate: function () {
			this.inherited(arguments);

			var guestbookSignWidget = new WidgetGuestBookSign({
				widgetGuestBookGetListParent: this,
				guestbook_name: this.GuestBookNameNode.value
			});

			domConstruct.place(guestbookSignWidget.domNode, this.GuestBookSignNode);
			this.getList();

			this.own(
					on(this.btnGetListNode, "click", lang.hitch(this, "getList"))
			);
		},

		getList: function () {
			if (this.GuestBookNameNode.value) {
				var listContent = this.guestbook_list_content;
				listContent.innerHTML = '';
				var widgetGuestBookGetListParent = this;
				this.guestbook_list_header.innerHTML = this.GuestBookNameNode.value;
				var greetingStore = new GreetingStore({
					callBack: function (data) {
						var greeting;
						array.forEach(data.greetings, function (jsonGreeting) {
							greeting = new WidgetGuestBookGreeting(jsonGreeting);
							greeting.setWidgetGuestBookList(widgetGuestBookGetListParent);
							domConstruct.place(greeting.domNode, listContent);
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
			domConstruct.place(guesbookEditWidget.domNode, this.GuestBookEditNode);
		}

	});
});