/**
 * Created by hieunc on 25/11/2015.
 */

define([
	"dojo/_base/declare"
], function (declare) {
	return declare("Greeting", null, {
		greetingId: -1,
		content: "",
		guestbookName: "",
		date: "",
		updatedDate: "",
		updatedBy: "",

		constructor: function (/*Object*/ kwArgs) {
			this.greetingId = kwArgs.greeting_id;
			this.content = kwArgs.content;
			this.date = kwArgs.date;
			this.guestbookName = kwArgs.guestbook_name;
			this.updatedDate = kwArgs.updated_date;
			this.updatedBy = kwArgs.updated_by;
		}
	})
});