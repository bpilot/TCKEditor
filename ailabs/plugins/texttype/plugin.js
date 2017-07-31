/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

// CUSTOM CKEDITOR PLUGIN.
var panelTitle = "Looks Like";
var defaultLabel = panelTitle;
var labels = ["Normal", "Heading 1", "Heading 2", "Heading 3"];
var css_names = ["texttype", "texttype texttype-heading1", "texttype texttype-heading2", "texttype texttype-heading3"];

function addCombo(editor, comboName, order)
{
	var config = editor.config;

  var currentElement = null;

	editor.ui.addRichCombo( comboName, {
		label: panelTitle,
		title: panelTitle,
		toolbar: "styles," + order,

		panel: {
			css: [ CKEDITOR.skin.getPath("editor") ].concat( config.contentsCss ),
			multiSelect: false,
			attributes: {"aria-label": panelTitle }
		},

		init: function() {
			this.startGroup(panelTitle);

			for ( var i = 0; i < css_names.length; i++ ) {
				var name = css_names[ i ];

				// Add the tag entry to the panel list.
				this.add(name, labels[i], name);
			}
		},

		onClick: function( value )
    {
			if (currentElement != null)
      {
        currentElement.$.className = value;
			}
		},

		onRender: function() {

			editor.on("selectionChange", function( ev ) {
				var currentValue = this.getValue();

				var elementPath = ev.data.path,
				    elements = elementPath.elements;

        currentElement = elements[0];

				// If no styles match, just empty it.
        var cssName = currentElement.$.className
        if (currentElement != null && css_names.indexOf(cssName) != -1 ) {
          this.setValue(cssName, labels[css_names.indexOf(cssName)]);
				}
        else {
				  this.setValue("", defaultLabel);
			  }
			}, this);
		},

		refresh: function()
    {
console.log("refresh callback!");
	  }
  });
}


CKEDITOR.plugins.add("texttype", {
		requires: "richcombo",
		// jscs:disable maximumLineLength
		lang: "af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn", // %REMOVE_LINE_CORE%
		// jscs:enable maximumLineLength
		init: function(editor)
    {
			var config = editor.config;

      addCombo(editor, "TextTypeCssName", "Looks Like", 30);
		}
	} );
