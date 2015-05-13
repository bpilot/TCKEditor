import CKEditor = require('/Libraries/TCKEditor/ckeditor/core/CKEDITOR_BOOTSTRAPPER');

// Add web fonts
import FontFoundryClient = require('/Shopwindow/FontFoundry/FontFoundryClient');

// Set fonts.
var NATIVE_FONTS = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif";

var web_fonts: string[];

alert("KLUDGE: Fix labels case mismatch");
FontFoundryClient.fontsInstalled()
.then(function(font_names)
{
  web_fonts = font_names;
  CKEditor.config.font_names += [NATIVE_FONTS].concat(font_names).join(';');
});

// Extend editor prototype to add support for web fonts.
CKEditor.editor.prototype.getFonts = function(): string[]
{
	var editable = this.container.$;

  var elements = editable.querySelectorAll('*');
  var len = elements.length;
  var font_names: string[] = [];
  for (var i=0; i < len; i++)
  {
    var font_name = elements[i].style.fontFamily;
    font_name = font_name.split("'")[1];

    if ( font_name &&
         ~web_fonts.indexOf(font_name) && // IS A WEB FONT
         !~font_names.indexOf(font_name) )
    {
      font_names.push(font_name);
    }
  }
  return font_names;
};

// Initialize web fonts on editor ready.
CKEditor.on("instanceReady", function(event)
{
  var editor = event.editor;
  editor.on("change", function()
  {
    var font_names = editor.getFonts();
    FontFoundryClient.requestFonts(font_names);
  });
});
