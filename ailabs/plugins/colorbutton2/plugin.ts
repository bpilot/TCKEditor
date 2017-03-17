import CKEDITOR = require("/TCKEditor/ckeditor/core/ckeditor");
import CuratedColorPicker = require("/Zealand/legacy-components/CuratedColorPicker");
import FDialog = require("/ZealandLib/legacy-libs/Fusion/FDialog");

// Added 11/3/2016 from: https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/colorbutton/plugin.js
function isUnstylable(ele: any): boolean
{
  return ( ele.getAttribute( 'contentEditable' ) == 'false' ) || ele.getAttribute( 'data-nostyle' );
}

class ColorCommand
{
  constructor(private colorStyle: any, private isBackground: boolean) { } // Color style tells us where the color is set, BG or FG.
	
  exec(editor: any): boolean
  {
    var colorStyle = this.colorStyle;
    var isBackground = this.isBackground;

    var colorDialog = new CuratedColorPicker();
    colorDialog.addNoColorOption();
    FDialog.create(colorDialog, {title: "Colorpicker"})
    .affirmed(function(result: string)
    {
      editor.focus();
      editor.fire('saveSnapshot');
      // Clean up any conflicting style within the range.
      editor.removeStyle( new CKEDITOR.style(colorStyle, { color: 'inherit' } ) );
      // Set on editor.
      if (result != null) {

					colorStyle.childRule = isBackground ?
					function( element: any ) {
						// It's better to apply background color as the innermost style. (#3599)
						// Except for "unstylable elements". (#6103)
						return isUnstylable( element );
					} : function( element: any ) {
						// Fore color style must be applied inside links instead of around it. (#4772,#6908)
						return !( element.is( 'a' ) || element.getElementsByTag( 'a' ).count() ) || isUnstylable( element );
					};

        editor.applyStyle( new CKEDITOR.style(colorStyle, { color: '#' + result } ) );
      }
      editor.fire('saveSnapshot');
    });
    return false;
  }

  canUndo = true;
  readOnly = false;
  modes = { wysiwyg: true };
}

CKEDITOR.plugins.add('colorbutton2',
{
  init: function( editor: any )
  {

		// Register the command.
		editor.addCommand("fgcolor_prompt", new ColorCommand(CKEDITOR.config.colorButton_foreStyle, false) );
    editor.addCommand("bgcolor_prompt", new ColorCommand(CKEDITOR.config.colorButton_backStyle, true) );

    // Register the foreground toolbar button.
    editor.ui.addButton("TextColor",
    {
      className: "colorbutton-btn",
			label: "Text Color",
			command: "fgcolor_prompt",
			toolbar: 'document,50'
   });

		// Register the background toolbar button.
    editor.ui.addButton("BGColor",
    {
      className: "colorbutton-btn",
			label: "Background Color",
			command: "bgcolor_prompt",
			toolbar: 'document,51'
    });
  }
});


// CONFIG forestyle
CKEDITOR.config.colorButton_foreStyle = {
	element: 'font', // TEST
	styles: { 'color': '#(color)' },
	overrides: [ {
		element: 'font', attributes: { 'color': <string>null }
	} ]
};

// CONFIG backstyle
CKEDITOR.config.colorButton_backStyle = {
	element: 'span',
	styles: { 'background-color': '#(color)' }
};

// Required so color will be restored.
CKEDITOR.config.allowedContent = true;
