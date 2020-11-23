/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { BaseControl, Button } from '@wordpress/components';
import { keyboardReturn } from '@wordpress/icons';
import { ENTER } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';

/**
 * Input control relaying on popover with return key.
 */
export default function ClassInput( { initialClassAttribute, onSubmit } ) {
	const [ nextClassAttribute, setNextClassAttribute ] = useState(
		initialClassAttribute
	);

	const onFormSubmit = ( event ) => {
		event.preventDefault();
		onSubmit( nextClassAttribute );
	};

	const onChange = ( event ) => {
		const inputValue = event.target.value;
		setNextClassAttribute( inputValue ? inputValue : undefined );
	};

	const onKeyDown = ( event ) => {
		if ( event.keyCode === ENTER ) {
			event.preventDefault();
			onSubmit( nextClassAttribute );
		}
	};

	const stopEventPropagation = ( event ) => {
		event.stopPropagation();
	};

	return (
		<div className="tm-block-editor-class-control">
			<div className="tm-block-editor-class-control__input-wrapper">
				<BaseControl
					className="tm-block-editor-class-control__label"
					label={ __( 'Inline Class' ) }
				></BaseControl>
				<form onSubmit={ onFormSubmit }>
					<div className="tm-block-editor-class-control__input">
						<input
							type="text"
							aria-label={ __( 'Inline Class' ) }
							autoFocus={ true }
							value={ nextClassAttribute }
							onChange={ onChange }
							onInput={ stopEventPropagation }
							placeholder={ __(
								'Input class attribute as you want.'
							) }
							onKeyDown={ onKeyDown }
						/>
					</div>
					<div className="tm-block-editor-class-control__actions">
						<Button
							type="submit"
							label={ __( 'Submit' ) }
							icon={ keyboardReturn }
							label={ __( 'Done' ) }
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
