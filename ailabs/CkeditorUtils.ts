
var CONTAINS_NON_WHITESPACE_REGEX = /\S+/;
function contains_only_whitespace(node: Node)
{
  if ( CONTAINS_NON_WHITESPACE_REGEX.test(node.textContent) )
  {
    // Already know this contains content.
    return false;
  }

  // Make sure no <img> tags are contained within.
  var CONTAINS_CONTENT_TAGS = false;
  if ( node.nodeType == 1 ) // Is element nodeType?
  {
    CONTAINS_CONTENT_TAGS = (<HTMLElement>node).querySelector('img, video') != null;
  }

  return !CONTAINS_CONTENT_TAGS;
}

export function stripTrailingWhitespace(user_html: string): string
{
  // Parse HTML
  var root = document.createElement('div');
  root.innerHTML = user_html;

  var last_child;
  while ( root.childNodes.length>0 &&
          contains_only_whitespace(last_child = root.lastChild) ) // Removes elements at end (most likely <p>) until non-whitespace reached
  {
    root.removeChild(last_child);
  }

  return root.innerHTML;
}
