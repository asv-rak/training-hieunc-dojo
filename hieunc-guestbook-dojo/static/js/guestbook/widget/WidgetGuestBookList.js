/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/topic",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/text!./templates/WidgetGuestBookList.html",
	"guestbook/widget/_base/_ViewBaseMixin",
	"guestbook/store/GreetingStore",
	"guestbook/widget/WidgetGuestBookGreeting",
	"guestbook/widget/WidgetGuestBookSign"
], function (declare, lang, array, topic, domConstruct, on, template, _ViewBaseMixin, GreetingStore, WidgetGuestBookGreeting,
             WidgetGuestBookSign) {
	return declare("guestbook.widget.WidgetGuestBookList", [_ViewBaseMixin], {
		templateString: template,

		constructor: function (/*Object*/ kwArgs) {
			this.inherited(arguments);
		},

		postCreate: function () {
			this.inherited(arguments);

			var guestbookSignWidget = new WidgetGuestBookSign({
				guestbook_name: this.guestBookNameNode.value
			});

			domConstruct.place(guestbookSignWidget.domNode, this.guestBookSignNode);
			var fnGetList = lang.hitch(this, "getList");
			fnGetList();
			this.own(
					on(this.btnGetListNode, "click", fnGetList),
					topic.subscribe("guestbook.widget. WidgetGuestBookList.refreshList/topic", function () {
						fnGetList();
					})
			);
		},

		getList: function () {
			if (this.guestBookNameNode.value) {
				var listContent = this.guestbookListContentNode;
				listContent.innerHTML = '';
				var greetingStore = new GreetingStore({
					callBack: function (data) {
						var greeting;
						array.forEach(data.greetings, function (jsonGreeting) {
							greeting = new WidgetGuestBookGreeting(jsonGreeting);
							domConstruct.place(greeting.domNode, listContent);
						});
					},
					errCallBack: function (err) {
						console.log(err)
					}
				});
				greetingStore.getGreetingList(this.guestBookNameNode.value);
			}
		}
	});
});