/**
 * Created by hieunc on 27/11/2015.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dojo/request/xhr"
], function (declare, lang, Deferred, xhr) {
	return declare("_ApiRequest", null, {
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
		}
	});
});
