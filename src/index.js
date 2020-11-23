/**
 * WordPress dependencies
 */
import { registerFormatType } from '@wordpress/rich-text';
import { withSpokenMessages } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Build SCSS into CSS.
 */
import './scss/editor.scss';

/**
 * Internal dependencies
 */
import metadata from './../format-type.json';
import edit from './js';

/**
 * Registers a new format type shown in toolbar.
 */
registerFormatType( 'guruguruman/gutenberg-add-inline-class', {
	title: __( metadata[ 'title' ] ),
	tagName: metadata[ 'tagName' ],
	className: metadata[ 'className' ],
	attributes: metadata[ 'attributes' ],
	edit: withSpokenMessages( edit ),
} );
