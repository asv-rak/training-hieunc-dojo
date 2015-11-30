/**
 * Created by hieunc on 27/11/2015.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dojo/request/xhr"
], function (declare, lang, Deferred, xhr) {
	return declare("_GreetingStore", null, {
		url: "/api/guestbook/default_guestbook/greeting/",
		headers: {},
		method: "get", //get,post,put,del
		postData: {},
		handleAs: "json",
		expect: "json", //{json,httpStatus}

		callBack: function (e) {
			console.log()
		},
		errCallBack: function (err) {
			alert("Failed to delete greeting !")
		},

		constructor: function (/*Object*/ kwArgs) {
			lang.mixin(this, kwArgs);
		},

		getResult: function () {
			var _self = this;
			var _def = new Deferred();
			_def.then(this.callBack, this.errCallBack);

			xhr[this.method](_self.url, {
				//sync: true,
				headers: _self.headers,
				preventCache: _self.preventCache,
				data: _self.postData,
				handleAs: _self.handleAs
			}).then(
					function (data) {
						if (_self.expect === "json") {
							_def.resolve(data);
						}
					},
					function (error) {
						_def.resolve(error);
					},
					function (e) {
						if (_self.expect === "httpStatus") {
							console.log(e);
							_def.resolve(e);
						}
					}
			);
		},

		_getResult: function () {
			var _self = this;
			var _def = new Deferred();
			_def.then(this.callBack, this.errCallBack);

			xhr[this.method](_self.url, {
				//sync: true,
				headers: _self.headers,
				preventCache: _self.preventCache,
				data: _self.postData,
				handleAs: _self.handleAs
			}).then(
					function (data) {
						if (_self.expect === "json") {
							_def.resolve(data);
						}
					},
					function (error) {
						_def.resolve(error);
					},
					function (e) {
						if (_self.expect === "httpStatus") {
							console.log(e);
							_def.resolve(e);
						}
					}
			);
		},

		getGrettingList: function (guestbook_name) {
			this.url = "/api/guestbook/" + guestbook_name + "/greeting/";
			this.method = "get"; //get,post,put,del
			this.handleAs = "json";
			this.expect = "json"; //{json,httpStatus}
			this._getResult();
		},

		deleteGreeting: function (guestbook_name, greeting_id, cookie) {
			this.url = "/api/guestbook/" + guestbook_name + "/greeting/" + greeting_id;
			this.headers = {"X-CSRFToken": cookie};
			this.method = "del"; //get,post,put,del
			this.expect = "httpStatus"; //{json,httpStatus}
			this._getResult();
		},

		createNewGreeting: function (greeting, cookie) {
			this.url = "/api/guestbook/" + greeting.guestbook_name + "/greeting/";
			this.headers = {"X-CSRFToken": cookie};
			this.method = "post"; //get,post,put,del
			this.postData = greeting;
			this.expect = "httpStatus"; //{json,httpStatus}
			this._getResult();
		},

		updateGreeting: function (greeting, cookie) {
			this.url = "/api/guestbook/" + greeting.guestbookName + "/greeting/" + greeting.greetingId;
			this.headers = {"X-CSRFToken": cookie};
			this.method = "put"; //get,post,put,del
			this.postData = {
				"guestbook_name": greeting.guestbookName,
				"guestbook_mesage": greeting.content,
				"greeting_id": greeting.greetingId
			};
			this.expect = "httpStatus"; //{json,httpStatus}
			this._getResult();
		}
	});
});
