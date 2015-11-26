/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"my/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookList.html",
	"dojo/_base/array"
], function (declare, _ViewBaseMixin, template, array) {
	return declare("_WidgetGuestBookList", [_ViewBaseMixin], {
		constructor: function (/*Object*/ kwArgs) {
			this.inherited("constructor", arguments);
			this.templateString = template;
		},

		getList: function () {
			if (this.GuestBookNameNode.value) {
				var listContent = this.guestbook_list_content;
				listContent.innerHTML = '';
				var _domConstruct = this.domConstruct;

				this.guestbook_list_header.innerHTML = this.GuestBookNameNode.value;
				this.request("/api/guestbook/" + this.GuestBookNameNode.value + "/greeting/", {handleAs: "json"}).then(
						function (data) {
							var greeting;
							array.forEach(data.greetings, function (jsonGreeting) {
								//var obj = new Greeting(jsonGreeting);
								greeting = new _WidgetGuestBookGreeting(jsonGreeting);
								_domConstruct.place(greeting.domNode, listContent);
							});
						},
						function (error) {
							alert("Failed to get data !")
						}
				);
			}
		}

	});
});