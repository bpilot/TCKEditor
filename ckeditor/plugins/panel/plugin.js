/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

// AI LABS PATCHED: Remove iframes. This module heavily modified.

( function() {
	CKEDITOR.plugins.add( 'panel', {
		beforeInit: function( editor ) {
			editor.ui.addHandler( CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler );
		}
	} );

	/**
	 * Panel UI element.
	 *
	 * @readonly
	 * @property {String} [='panel']
	 * @member CKEDITOR
	 */
	CKEDITOR.UI_PANEL = 'panel';

	/**
	 * @class
	 * @constructor Creates a panel class instance.
	 * @param {CKEDITOR.dom.document} document
	 * @param {Object} definition
	 */
	CKEDITOR.ui.panel = function( document, definition ) {
		// Copy all definition properties to this object.
		if ( definition )
			CKEDITOR.tools.extend( this, definition );

		// Set defaults.
		CKEDITOR.tools.extend( this, {
			className: '',
			css: []
		} );

		this.id = CKEDITOR.tools.getNextId();
		this.document = document;
    this.isLoaded = true; // Immediately loaded. AI LABS PATCH

		this._ = {
			blocks: {}
		};
	};

	/**
	 * Represents panel handler object.
	 *
	 * @class
	 * @singleton
	 * @extends CKEDITOR.ui.handlerDefinition
	 */
	CKEDITOR.ui.panel.handler = {
		/**
		 * Transforms a panel definition in a {@link CKEDITOR.ui.panel} instance.
		 *
		 * @param {Object} definition
		 * @returns {CKEDITOR.ui.panel}
		 */
		create: function( definition ) {
			return new CKEDITOR.ui.panel( definition );
		}
	};

	var panelTpl = CKEDITOR.addTemplate( 'panel',
    '<div lang="{langCode}" id="{id}" dir={dir} tabindex="-1"' + // AI LABS PATCH: Allow focus without iframe.
		' class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}"' +
		' style="z-index:{z-index}" role="presentation">' + // AI LABS PATCH: Overflow scroll because we have no iframe
		'{frame}' +
		'</div>' );

	/** @class CKEDITOR.ui.panel */
	CKEDITOR.ui.panel.prototype = {
		/**
		 * Renders the combo.
		 *
		 * @param {CKEDITOR.editor} editor The editor instance which this button is
		 * to be used by.
		 * @param {Array} [output] The output array to which append the HTML relative
		 * to this button.
		 */
		render: function( editor, output ) {
			this.getHolderElement = function() {
				var holder = this._.holder;

        holder = this.document.getById( this.id );
        this._.holder = holder;

				return holder;
			};

			var data = {
				editorId: editor.id,
				id: this.id,
				langCode: editor.langCode,
				dir: editor.lang.dir,
				cls: this.className,
        frame: '',
        overflow_y: this.scroll_y ? 'auto' : 'hidden', // AI LABS PATCH
				env: CKEDITOR.env.cssClass,
				'z-index': editor.config.baseFloatZIndex + 1
			};

			var html = panelTpl.output( data );

			if ( output )
				output.push( html );

			return html;
		},

		/**
		 * @todo
		 */
		addBlock: function( name, block ) {
			block = this._.blocks[ name ] = block instanceof CKEDITOR.ui.panel.block ? block : new CKEDITOR.ui.panel.block( this.getHolderElement(), block );

			if ( !this._.currentBlock )
				this.showBlock( name );

			return block;
		},

		/**
		 * @todo
		 */
		getBlock: function( name ) {
			return this._.blocks[ name ];
		},

		/**
		 * @todo
		 */
		showBlock: function( name ) {
			var blocks = this._.blocks,
				block = blocks[ name ],
				current = this._.currentBlock;

			// ARIA role works better in IE on the body element, while on the iframe
			// for FF. (#8864)
			var holder = this._.holder;

			if ( current )
				current.hide();

			this._.currentBlock = block;

			CKEDITOR.fire( 'ariaWidget', holder );

			// Reset the focus index, so it will always go into the first one.
			block._.focusIndex = -1;

			this._.onKeyDown = block.onKeyDown && CKEDITOR.tools.bind( block.onKeyDown, block );

			block.show();

			return block;
		},

		/**
		 * @todo
		 */
		destroy: function() {
			this.element && this.element.remove();
		}
	};

	/**
	 * @class
	 *
	 * @todo class and all methods
	 */
	CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass( {
		/**
		 * Creates a block class instances.
		 *
		 * @constructor
		 * @todo
		 */
		$: function( blockHolder, blockDefinition ) {
			this.element = blockHolder.append( blockHolder.getDocument().createElement( 'div', {
				attributes: {
					'tabindex': -1,
					'class': 'cke_panel_block'
				},
				styles: {
					display: 'none'
				}
			} ) );

			// Copy all definition properties to this object.
			if ( blockDefinition )
				CKEDITOR.tools.extend( this, blockDefinition );

			// Set the a11y attributes of this element ...
			this.element.setAttributes( {
				'role': this.attributes.role || 'presentation',
				'aria-label': this.attributes[ 'aria-label' ],
				'title': this.attributes.title || this.attributes[ 'aria-label' ]
			} );

			this.keys = {};

			this._.focusIndex = -1;

			// Disable context menu for panels.
			this.element.disableContextMenu();
		},

		_: {

			/**
			 * Mark the item specified by the index as current activated.
			 */
			markItem: function( index ) {
				if ( index == -1 )
					return;
				var links = this.element.getElementsByTag( 'a' );
				var item = links.getItem( this._.focusIndex = index );

				// Safari need focus on the iframe window first(#3389), but we need
				// lock the blur to avoid hiding the panel.
				if ( CKEDITOR.env.webkit )
					item.getDocument().getWindow().focus();
				item.focus();

				this.onMark && this.onMark( item );
			}
		},

		proto: {
			show: function() {
				this.element.setStyle( 'display', '' );
			},

			hide: function() {
				if ( !this.onHide || this.onHide.call( this ) !== true )
					this.element.setStyle( 'display', 'none' );
			},

			onKeyDown: function( keystroke, noCycle ) {
				var keyAction = this.keys[ keystroke ];
				switch ( keyAction ) {
					// Move forward.
					case 'next':
						var index = this._.focusIndex,
							links = this.element.getElementsByTag( 'a' ),
							link;

						while ( ( link = links.getItem( ++index ) ) ) {
							// Move the focus only if the element is marked with
							// the _cke_focus and it it's visible (check if it has
							// width).
							if ( link.getAttribute( '_cke_focus' ) && link.$.offsetWidth ) {
								this._.focusIndex = index;
								link.focus();
								break;
							}
						}

						// If no link was found, cycle and restart from the top. (#11125)
						if ( !link && !noCycle ) {
							this._.focusIndex = -1;
							return this.onKeyDown( keystroke, 1 );
						}

						return false;

						// Move backward.
					case 'prev':
						index = this._.focusIndex;
						links = this.element.getElementsByTag( 'a' );

						while ( index > 0 && ( link = links.getItem( --index ) ) ) {
							// Move the focus only if the element is marked with
							// the _cke_focus and it it's visible (check if it has
							// width).
							if ( link.getAttribute( '_cke_focus' ) && link.$.offsetWidth ) {
								this._.focusIndex = index;
								link.focus();
								break;
							}

							// Make sure link is null when the loop ends and nothing was
							// found (#11125).
							link = null;
						}

						// If no link was found, cycle and restart from the bottom. (#11125)
						if ( !link && !noCycle ) {
							this._.focusIndex = links.count();
							return this.onKeyDown( keystroke, 1 );
						}

						return false;

					case 'click':
					case 'mouseup':
						index = this._.focusIndex;
						link = index >= 0 && this.element.getElementsByTag( 'a' ).getItem( index );

						if ( link )
							link.$[ keyAction ] ? link.$[ keyAction ]() : link.$[ 'on' + keyAction ]();

						return false;
				}

				return true;
			}
		}
	} );

} )();

/**
 * Fired when a panel is added to the document.
 *
 * @event ariaWidget
 * @member CKEDITOR
 * @param {Object} data The element wrapping the panel.
 */
