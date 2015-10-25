// Import modules
import CKEditor = require("/ZealandLib/TCKEditor/ckeditor/core/CKEDITOR_BOOTSTRAPPER");
import ck_editable = require("/ZealandLib/TCKEditor/ckeditor/core/editable");

import default_skin = require("/ZealandLib/TCKEditor/ckeditor/skins/moono/skin");
import lang_en = require("/ZealandLib/TCKEditor/ckeditor/lang/en");
import ck_styles = require("/ZealandLib/TCKEditor/ckeditor/styles");

// AI LABS extensions to Editor
import ailabs_editor_addons = require("/ZealandLib/TCKEditor/ailabs/editor-addons");

// Import plugins
import DEFAULT_PLUGINS = require("/ZealandLib/TCKEditor/DEFAULT_PLUGINS");

// Load editorConfig
import editorConfig = require("/ZealandLib/TCKEditor/ckeditor/config");

// Add web fonts
import editor_webfonts = require("/ZealandLib/TCKEditor/ailabs/editor-webfonts");

CKEditor.editorConfig(CKEditor.config);

// NOTE: ckeditor_base is CORE, imported everywhere but here.

// DO NOT LOAD CUSTOM CONFIG.
CKEditor.config.customConfig = null;

// Must set skinName
CKEditor.skinName = "moono";

// Adapter for CKEditor.

export = CKEditor;
