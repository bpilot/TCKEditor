# TCKEditor
This is CKEditor with manifest files needed. From CKEditor-source to a Typescript/DependencyGraph-ready.

Source from: https://github.com/bpilot/CKEditor-source

LEARNED:

ckeditor_base is the central, common file
that defines the CKEDITOR.

DIFFERENCES FROM AI LABS BASE:
1) skin.getIconStyle() and getIcon() do not exist.
   Instead, plugins should use a stylesheet and glyph to apply icon style.

Each plugin with toolbar buttons has been modified to specify a className, provide a glyph and stylesheet to set background-image pos.

2) We do not use iframes!

NO:
2) There is no CKEDITOR global.

3) Consequently, onclick handlers have been replaced with event delegation with data-cmd-click.

How to build widgets:
http://docs.ckeditor.com/#!/guide/widget_sdk_tutorial_1

