/**
 * WordPress dependencies
 */
import {
	RichTextToolbarButton,
	RichTextShortcut,
} from '@wordpress/block-editor';
import {
	applyFormat,
	getTextContent,
	getActiveFormat,
	removeFormat,
	slice,
} from '@wordpress/rich-text';
import { Fragment, Component } from '@wordpress/element';
import { tag as classIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InlineAddClassUI from './components/inline-add-class-ui';
import createClassFormat from './utils/create-class-format';
import metadata from '../../format-type.json';

/**
 * Format type component with features rendering toolbar ui and inserting class attributes on selected in editor.
 */
export default class extends Component {
	constructor() {
		super( ...arguments );

		this.getActiveClassAttribute = this.getActiveClassAttribute.bind(
			this
		);
		this.stopAddingClass = this.stopAddingClass.bind( this );
		this.applyFormat = this.applyFormat.bind( this );
		this.removeFormat = this.removeFormat.bind( this );
		this.submitClass = this.submitClass.bind( this );

		this.state = {
			addingClass: false,
		};
	}

	getActiveClassAttribute() {
		const { value, isActive } = this.props;

		let activeClassAttribute = '';
		if ( isActive ) {
			const activeFormat = getActiveFormat( value, metadata[ 'type' ] );
			activeClassAttribute = activeFormat.attributes.class;
		}

		return activeClassAttribute;
	}

	stopAddingClass() {
		const { onFocus } = this.props;
		this.setState( { addingClass: false } );

		onFocus();
	}

	submitClass( nextClassAttribute ) {
		const { isActive, value, onChange, speak } = this.props;
		if ( nextClassAttribute && nextClassAttribute.length > 0 ) {
			const format = createClassFormat( nextClassAttribute );
			onChange( applyFormat( value, format ) );
		} else {
			this.removeFormat();
		}

		this.stopAddingClass();

		if ( isActive ) {
			speak( __( 'Class edited.' ), 'assertive' );
		} else {
			speak( __( 'Class inserted.' ), 'assertive' );
		}
	}

	applyFormat() {
		const { value, onChange } = this.props;

		const text = getTextContent( slice( value ) );
		if ( ! text ) {
			return;
		}

		const activeClassAttribute = this.getActiveClassAttribute();
		let format = createClassFormat( activeClassAttribute );
		onChange( applyFormat( value, format ) );
		this.setState( { addingClass: true } );
	}

	removeFormat() {
		const { value, onChange, speak } = this.props;

		onChange( removeFormat( value, metadata[ 'type' ] ) );
		speak( __( 'Class removed.' ), 'assertive' );

		this.setState( { addingClass: false } );
	}

	render() {
		const { isActive, value, onChange } = this.props;
		const activeClassAttribute = this.getActiveClassAttribute();

		return (
			<Fragment>
				<RichTextShortcut
					type="primary"
					character="m"
					onUse={ this.applyFormat }
				/>
				<RichTextShortcut
					type="primaryShift"
					character="m"
					onUse={ this.removeFormat }
				/>
				{ ! isActive && (
					<RichTextToolbarButton
						icon={ classIcon }
						title={ __( 'Add Inline Class' ) }
						onClick={ this.applyFormat }
						isActive={ isActive }
						shortcutType="primary"
						shortcutCharacter="m"
					/>
				) }
				{ isActive && (
					<RichTextToolbarButton
						icon={ classIcon }
						title={ __( 'Remove Inline Class' ) }
						onClick={ this.removeFormat }
						isActive={ isActive }
						shortcutType="primaryShift"
						shortcutCharacter="m"
					/>
				) }
				{ isActive && (
					<InlineAddClassUI
						stopAddingClass={ this.stopAddingClass }
						initialClassAttribute={ activeClassAttribute }
						isActive={ isActive }
						value={ value }
						onSubmit={ this.submitClass }
						onClose={ () => {
							// Remove format with empty class attribute since empty value is assined when on click toolbar button.
							const activeClass = this.getActiveClassAttribute();
							if ( activeClass.length > 0 ) {
								return;
							}

							this.removeFormat();
						} }
					/>
				) }
			</Fragment>
		);
	}
}
