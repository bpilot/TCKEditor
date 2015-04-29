// Import modules
import CKEditor = require('/Libraries/TCKEditor/ckeditor/core/ckeditor');
import ck_editable = require('/Libraries/TCKEditor/ckeditor/core/editable');

import lang_en = require('/Libraries/TCKEditor/ckeditor/lang/en');
import default_skin = require('/Libraries/TCKEditor/ckeditor/skins/moono/skin');
import ck_styles = require('/Libraries/TCKEditor/ckeditor/styles');

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
