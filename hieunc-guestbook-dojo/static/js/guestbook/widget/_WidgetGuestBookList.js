/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare",
	"my/_ViewBaseMixin",
	"dojo/text!./templates/_WidgetGuestBookList.html",
	"dojo/_base/array",
	"dojo/when"
], function (declare, _ViewBaseMixin, template, array, when) {
	return declare("_WidgetGuestBookList", [_ViewBaseMixin], {
		constructor: function (/*Object*/ kwArgs) {
			this.inherited("constructor", arguments);
			this.templateString = template;
		},

		postCreate: function () {
			this.inherited("postCreate", arguments);
			this.getList();
		},

		getList: function () {
			if (this.GuestBookNameNode.value) {
				var listContent = this.guestbook_list_content;
				listContent.innerHTML = '';
				var _domConstruct = this.domConstruct;

				this.guestbook_list_header.innerHTML = this.GuestBookNameNode.value;
				var _listApiRequest = new _ApiRequest({
					url: "/api/guestbook/" + this.GuestBookNameNode.value + "/greeting/",
					method: "get", //get,post,put,del
					handleAs: "json",
					expect: "json", //{json,httpStatus}
					callBack: function (data) {
						var greeting;
						array.forEach(data.greetings, function (jsonGreeting) {
							greeting = new _WidgetGuestBookGreeting(jsonGreeting);
							_domConstruct.place(greeting.domNode, listContent);
						});
					},
					errCallBack: function (err) {
						alert("Failed to get data !")
					}
				});
				_listApiRequest.getResult();
			}
		}


	});
});