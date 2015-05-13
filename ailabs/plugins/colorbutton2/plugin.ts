import CKEDITOR = require('/Libraries/TCKEditor/ckeditor/core/ckeditor');
import CuratedColorPicker = require('/Libraries/Michigan/Michigan1/widgets/CuratedColorPicker');
import AngularExternal = require('/Libraries/Michigan/Michigan2/lib/angular-objectoriented/AngularExternal');

var colorDialog = AngularExternal.dialog(CuratedColorPicker, {title: "Colorpicker"});

class ColorCommand
{
	constructor(private colorStyle) { } // Color style tells us where the color is set, BG or FG.
	
	exec(editor): boolean
  {
    var colorStyle = this.colorStyle;
    colorDialog.prompt()
    .submit(function(result: string)
    {
      editor.focus();
      editor.fire('saveSnapshot');
      // Clean up any conflicting style within the range.
      editor.removeStyle( new CKEDITOR.style(colorStyle, { color: 'inherit' } ) );
      // Set on editor.
      editor.applyStyle( new CKEDITOR.style(colorStyle, { color: '#' + result } ) );
      editor.fire('saveSnapshot');
    });
    return false;
	}

	canUndo = true;
	readOnly = false;
	modes = { wysiwyg: true };
}

CKEDITOR.plugins.add('colorbutton2', {

	init: function( editor ) {

		// Register the command.
		editor.addCommand("fgcolor_prompt", new ColorCommand(CKEDITOR.config.colorButton_foreStyle) );
    editor.addCommand("bgcolor_prompt", new ColorCommand(CKEDITOR.config.colorButton_backStyle) );

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
	element: 'span',
	styles: { 'color': '#(color)' },
	overrides: [ {
		element: 'font', attributes: { 'color': null }
	} ]
};

// CONFIG backstyle
CKEDITOR.config.colorButton_backStyle = {
	element: 'span',
	styles: { 'background-color': '#(color)' }
};

// Required so color will be restored.
CKEDITOR.config.allowedContent = true;
