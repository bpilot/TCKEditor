// Import modules
import CKEditor = require('/Libraries/TCKEditor/ckeditor/core/CKEDITOR_BOOTSTRAPPER');
import ck_editable = require('/Libraries/TCKEditor/ckeditor/core/editable');

import default_skin = require('/Libraries/TCKEditor/ckeditor/skins/moono/skin');
import lang_en = require('/Libraries/TCKEditor/ckeditor/lang/en');
import ck_styles = require('/Libraries/TCKEditor/ckeditor/styles');

// AI LABS extensions to Editor
import ailabs_editor_addons = require('/Libraries/TCKEditor/ailabs/editor-addons');

// Import plugins
import DEFAULT_PLUGINS = require('/Libraries/TCKEditor/DEFAULT_PLUGINS');

// Load editorConfig
import editorConfig = require('/Libraries/TCKEditor/ckeditor/config');
CKEditor.editorConfig(CKEditor.config);

// NOTE: ckeditor_base is CORE, imported everywhere but here.

// DO NOT LOAD CUSTOM CONFIG.
CKEditor.config.customConfig = null;

// Must set skinName
CKEditor.skinName = "moono";

// Adapter for CKEditor.

export = CKEditor;
