
import CKEDITOR = require("/TCKEditor/ckeditor/core/ckeditor_base");
import EditorBase = require("/TCKEditor/ckeditor/core/editor_basic");

// Returns height required to contain all content without scrolling.
EditorBase.prototype.contentHeight = function(): number
{
  if (this.container == null) { return 0; }

	var element = <HTMLElement>this.container.$;

  var first_child = closestVisibleSibling(<HTMLElement>element.firstElementChild, true);
  var last_child = closestVisibleSibling(<HTMLElement>element.lastElementChild, false);

  if (first_child == last_child) { return first_child.offsetHeight; } // Account for one element.

  return (last_child.offsetTop + last_child.offsetHeight) - first_child.offsetTop;
};


// Util code: Necessary to handle element not in document flow being first or last
function closestVisibleSibling(element: HTMLElement, direction: boolean): HTMLElement
{
  while( element.getAttribute('data-cke-hidden-sel') == '1' )
  {
    element = direction ? <HTMLElement>element.nextElementSibling : <HTMLElement>element.previousElementSibling;
  }
  return element;
}

	
