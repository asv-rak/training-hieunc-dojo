/**
 * Created by hieunc on 27/11/2015.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dojo/request/xhr",
	"dojo/cookie"
], function (declare, lang, Deferred, xhr, cookie) {
	var widgetGuestbookList = declare("guestbook.store.GreetingStore", null, {
		url: "/api/guestbook/default_guestbook/greeting/",
		headers: {},
		method: "get", //get,post,put,del
		postData: {},
		handleAs: "json",
		expect: "", //{json,httpStatus}

		callBack: function (result) {
		},

		errCallBack: function (err) {
			console.log(err)
		},

		constructor: function (/*Object*/ kwArgs) {
			lang.mixin(this, kwArgs);
		},

		_getResult: function () {
			var _def = new Deferred();
			_def.then(this.callBack, this.errCallBack);

			xhr[this.method](this.url, {
				headers: this.headers,
				preventCache: true,
				data: this.postData,
				handleAs: this.handleAs
			}).then(
					lang.hitch(this, function (data) {
						if (this.expect === "json") {
							_def.resolve(data);
						}
					}),
					function (error) {
						console.log(error);
					},
					lang.hitch(this, function (extra) {
						if (this.expect === "httpStatus") {
							_def.resolve(extra);
						}
					})
			);
		},

		getGreetingList: function (guestbook_name) {
			this.url = "/api/guestbook/" + guestbook_name + "/greeting/";
			this.method = "get";
			this.handleAs = "json";
			this.expect = "json";
			this._getResult();
		},

		deleteGreeting: function (guestbook_name, greeting_id) {
			this.url = "/api/guestbook/" + guestbook_name + "/greeting/" + greeting_id;
			this.headers = {"X-CSRFToken": cookie("csrftoken")};
			this.method = "del";
			this.expect = "json";
			this.handleAs = "";
			this._getResult();
		},

		createNewGreeting: function (greeting) {
			this.url = "/api/guestbook/" + greeting.guestbook_name + "/greeting/";
			this.headers = {"X-CSRFToken": cookie("csrftoken")};
			this.method = "post";
			this.postData = greeting;
			this.expect = "httpStatus";
			this._getResult();
		},

		updateGreeting: function (greeting) {
			this.url = "/api/guestbook/" + greeting.guestbookName + "/greeting/" + greeting.greetingId;
			this.headers = {"X-CSRFToken": cookie("csrftoken")};
			this.method = "put";
			this.postData = {
				"guestbook_name": greeting.guestbookName,
				"guestbook_mesage": greeting.content,
				"greeting_id": greeting.greetingId
			};
			this.expect = "json";
			this._getResult();
		}
	});

	return widgetGuestbookList;
});
