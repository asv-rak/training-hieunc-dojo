/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare"
], function (declare) {
	return declare("guestbook.models.Greeting", null, {
		greetingId: "",
		content: "",
		guestbookName: "",
		date: "",
		updatedDate: "",
		updatedBy: "",
		isAdmin: false,
		userInfo: "",

		constructor: function (/*Object*/ kwArgs) {
			this.greetingId = kwArgs.greeting_id;
			this.content = kwArgs.content;
			this.date = kwArgs.date;
			this.guestbookName = kwArgs.guestbook_name;
			this.updatedDate = kwArgs.updated_date;
			this.updatedBy = kwArgs.updated_by;
			this.isAdmin = kwArgs.is_admin;
			this.userInfo = kwArgs.user_info;
		}
	})
});