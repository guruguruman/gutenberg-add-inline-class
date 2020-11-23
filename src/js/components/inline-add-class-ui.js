/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withSpokenMessages, Popover } from '@wordpress/components';
import { applyFormat, getActiveFormat } from '@wordpress/rich-text';

/**
 * External dependencies
 */
import { uniqueId } from 'lodash';

/**
 * Internal dependencies
 */
import ClassInput from './class-input';

/**
 * Popover with input field to edit 'class' attribute.
 */
function InlineAddClassUI( {
	addingClass,
	initialClassAttribute,
	isActive,
	value,
	onSubmit,
	onClose,
	speak,
} ) {
	/**
	 * A unique key is generated when switching between editing and not editing a class.
	 */
	const mountingKey = useMemo( uniqueId, [ addingClass ] );

	const anchorRef = useMemo( () => {
		const selection = window.getSelection();

		if ( ! selection.rangeCount ) {
			return;
		}

		const range = selection.getRangeAt( 0 );

		if ( addingClass && ! isActive ) {
			return range;
		}

		let element = range.startContainer;

		// If the caret is right before the element, select the next element.
		element = element.nextElementSibling || element;

		while ( element.nodeType !== element.ELEMENT_NODE ) {
			element = element.parentNode;
		}

		return element.closest( 'span' );
	}, [ addingClass, value.start, value.end ] );

	const hasActiveLinkFormat = useMemo( () => {
		const linkFormat = getActiveFormat( value, 'core/link' );

		return linkFormat && linkFormat.attributes.url.length > 0;
	}, [ value ] );

	// Class adding popover ui position can overwrap link popover which display same position if applying both formats.
	const position = hasActiveLinkFormat ? 'top center' : 'bottom center';

	return (
		<Popover
			key={ mountingKey }
			anchorRef={ anchorRef }
			focusOnMount={ addingClass ? 'firstElement' : false }
			position={ position }
			onClose={ onClose }
		>
			<ClassInput
				initialClassAttribute={ initialClassAttribute }
				onSubmit={ onSubmit }
			/>
		</Popover>
	);
}

export default withSpokenMessages( InlineAddClassUI );
