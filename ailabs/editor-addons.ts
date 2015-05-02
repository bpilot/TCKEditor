
import CKEDITOR = require('/Libraries/TCKEditor/ckeditor/core/ckeditor_base');
import EditorBase = require('/Libraries/TCKEditor/ckeditor/core/editor_basic');

// Returns height required to contain all content without scrolling.
EditorBase.prototype.contentHeight = function(): number
{
  if (this.container == null) { return 0; }

	var element = this.container.$;

  var first_child = element.firstElementChild;
  var last_child = element.lastElementChild;

  if (first_child == last_child) { return first_child.offsetHeight; } // Account for one element.

  return (last_child.offsetTop + last_child.offsetHeight) - (first_child.offsetTop - first_child.offsetHeight);
};
