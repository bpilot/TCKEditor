import CKEditor = require("/TCKEditor/ckeditor/core/CKEDITOR_BOOTSTRAPPER");

// Add web fonts
import FontFoundryClient = require("/Zealand/FontFoundry/FontFoundryClient"); // Used for dropdown and detecting use of fonts.

// Set fonts.
var NATIVE_FONTS = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, Marker Felt, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif";

var web_fonts = FontFoundryClient.fontsInstalled();

CKEditor.config.font_names = [NATIVE_FONTS].concat(web_fonts).join(';');

// Extend editor prototype to add support for web fonts.
CKEditor.editor.prototype.getFonts = function(): string[]
{
	var editable = this.container.$;

  var elements = editable.querySelectorAll("*");
  var len = elements.length;
  var fontNames: string[] = [];
  for (var i=0; i < len; i++)
  {
    var fontName: string;
    if (elements[i].tagName == "FONT" && elements[i].hasAttribute("face") ) {
      fontName = elements[i].getAttribute("face");
    }
    else {
      fontName = elements[i].style.fontFamily;
    }

    fontName = fontName.split("'")[1] || fontName.split("\"")[1] || fontName; // Font name may not be quoted (in case it doesn't have spaces).
    if ( fontName &&
         FontFoundryClient.haveFont(fontName) && // IS A WEB FONT
         !~fontNames.indexOf(fontName) )
    {
      fontNames.push(fontName);
    }
  }
  return fontNames;
};

// Initialize web fonts on editor ready.
CKEditor.on("instanceReady", function(event: any)
{
  var editor = event.editor;
  editor.on("change", function()
  {
    var font_names = editor.getFonts();
    FontFoundryClient.requestFonts(font_names);
  });
});
