/**
 * Created by hieunc on 25/11/2015.
 */

define([
			"dojo/_base/declare",
			"dojo/_base/lang"
		], function (declare, lang) {
			return declare("Greeting", null, {
				greetingId: -1,
				content: "",
				guestbookName: "",
				date: "",
				updatedDate: "",
				updatedBy: "",

				constructor: function (/*Object*/ kwArgs) {
					lang.mixin(this, kwArgs);
					this.greetingId = kwArgs.greeting_id;
					this.guestbookName = kwArgs.guestbook_name;
					this.updatedDate = kwArgs.updated_date;
					this.updatedBy = kwArgs.updated_by;
				}
			})
		}
)