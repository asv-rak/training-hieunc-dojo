/**
 * Created by hieunc on 25/11/2015.
 */
define("my/_ViewBaseMixin", [
	'dojo/_base/declare',
	'dojo/dom-class',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetsInTemplateMixin',
	"dojo/dom-construct",
	"dojo/request"
], function (declare, domClass, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, request) {

	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		request: request,
		domConstruct: domConstruct,

		buildRendering: function () {
			this.inherited(arguments);
			this._appendClass();
		},

		_appendClass: function () {
			var parts = this.declaredClass.split('.'),
					baseClass = parts[parts.length - 1];
			baseClass = baseClass.substring(0, 1).toLowerCase() + baseClass.substring(1);
			domClass.add(this.domNode, baseClass);
		}
	});
});