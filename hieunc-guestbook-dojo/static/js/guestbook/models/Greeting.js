/**
 * Created by hieunc on 25/11/2015.
 */

define([
        "dojo/_base/declare",
        "dojo/_base/lang"
    ], function (declare, lang) {
        return declare(null, {
            greeting_id: -1,
            content: "",
            guestbook_name: "",
            date: "",
            updated_date: "",
            updated_by: "",

            constructor: function (/*Object*/ kwArgs) {
                lang.mixin(this, kwArgs);
            },

            moveTo: function (/*String*/ residence) {
                this.residence = residence;
            }
        })
    }
)