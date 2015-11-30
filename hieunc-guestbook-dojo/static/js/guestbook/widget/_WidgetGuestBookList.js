/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"guestbook/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookList.html",
	"dojo/_base/array",
	"dojo/when"
], function (declare, _ViewBaseMixin, template, array, when) {
	return declare("_WidgetGuestBookList", [_ViewBaseMixin], {
		constructor: function (/*Object*/ kwArgs) {
			this.inherited(arguments);
			this.templateString = template;
		},

		postCreate: function () {
			this.inherited(arguments);
			var guestbookSignWidget = new _WidgetGuestBookSign({
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
				var _listApiRequest = new _GreetingStore({
					callBack: function (data) {
						var greeting;
						array.forEach(data.greetings, function (jsonGreeting) {
							greeting = new _WidgetGuestBookGreeting(jsonGreeting);
							greeting.setWidgetGuestBookGetListParent(widgetGuestBookGetListParent);
							_domConstruct.place(greeting.domNode, listContent);
						});
					},
					errCallBack: function (err) {
						alert("Failed to get data !")
					}
				});
				_listApiRequest.getGrettingList(this.GuestBookNameNode.value);
			}
		},

		generateEditForm: function (greeting) {
			var guesbookEditWidget = new _WidgetGuestBookEdit({
				"greeting": greeting,
				"widgetGuestBookGetListParent": this
			});
			this.GuestBookEditNode.innerHTML = '';
			this.domConstruct.place(guesbookEditWidget.domNode, this.GuestBookEditNode);
		}

	});
});