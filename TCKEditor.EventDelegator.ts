// Import modules
import CKEditor = require('/Libraries/TCKEditor/ckeditor/core/ckeditor');
import attachEvent = require('/Libraries/Common/util/dom.attachEvent');

// Globally handle event delegation!
// Only one instance of this class exists, handling events across ALL editor instances.
// Operates on current instance only.
class EventDelegator // @SINGLETON
{
  constructor()
  {
    attachEvent(document, "click", this.handleClickEvent, this);
  }

  handleClickEvent(event: Event): void
  {
    var target = <HTMLElement>event.target;
    var editor_dom = this.getCurrentEditorDOM();
    if (editor_dom != null) // Check we have an active editor.
    {
      var contains_target = editor_dom.contains(target);
      if (contains_target)
      {
        var target_func_id = this.getTargetCommand(editor_dom, target);
        if (target_func_id != null)
        {
          CKEditor.tools.callFunction(target_func_id, target, event); // Eval function.
          event.stopPropagation();
        }
      }
    }
  }

  getCurrentEditorDOM(): HTMLElement
  {
    var editor = CKEditor.currentInstance;
    if (editor == null) { return null; }
    return <HTMLElement>document.querySelector("div.cke." + editor.id );
  }

  getTargetCommand(editor_dom: HTMLElement, target: HTMLElement): number
  {
    while ( !target.hasAttribute("data-cmd-click") )
    {
      if (target == editor_dom) { return null; }
      target = target.parentElement;
    }
    return parseInt( target.getAttribute("data-cmd-click") );
  }
}

export = EventDelegator;
