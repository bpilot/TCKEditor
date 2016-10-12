
CKEDITOR.plugins.add("personalize",
{
  init: function(editor)
  {
    function handleInsertCurly(field)
    {
      editor.insertText("{" + field.id + "}");
    }

    var command = new CKEDITOR.command(editor,
      {
        exec: function(editor)
        {
          PersonalizationDialog.openPrompt()
          .affirmed(handleInsertCurly);
        }
      });

    editor.addCommand("personalize", command);

    editor.ui.addButton("Personalize", {
      label: "Personalize",
      command: "personalize"
    });
  }
});

