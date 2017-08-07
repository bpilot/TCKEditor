// Import modules
import CKEditor = require("/TCKEditor/ckeditor/core/CKEDITOR_BOOTSTRAPPER");
import ck_editable = require("/TCKEditor/ckeditor/core/editable");

import default_skin = require("/TCKEditor/ailabs/skins/ailabs-moono/skin");
import lang_en = require("/TCKEditor/ckeditor/lang/en");
import lang_en_gb = require("/TCKEditor/ckeditor/lang/en-gb");
import ck_styles = require("/TCKEditor/ckeditor/styles");

// AI LABS extensions to Editor
import ailabs_editor_addons = require("/TCKEditor/ailabs/editor-addons");

// Import plugins
import DEFAULT_PLUGINS = require("/TCKEditor/DEFAULT_PLUGINS");

// Load editorConfig
import editorConfig = require("/TCKEditor/ckeditor/config");

// Add web fonts
import editor_webfonts = require("/TCKEditor/ailabs/editor-webfonts");

import editor_custom_lang = require("/TCKEditor/ailabs/editor-custom-lang");

CKEditor.editorConfig(CKEditor.config);

// NOTE: ckeditor_base is CORE, imported everywhere but here.

// DO NOT LOAD CUSTOM CONFIG.
CKEditor.config.customConfig = null;

// Must set skinName
CKEditor.skinName = "moono";

// Adapter for CKEditor.

export = CKEditor;
