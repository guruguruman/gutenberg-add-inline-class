/**
 * Internal dependencies
 */
import metadata from '../../../format-type.json';

/**
 * Generates the format object that will be applied to the element.
 *
 * @param {string}  classAttribute		The class attribute of the element.
 *
 * @return {Object} The final format object.
 */
export default function createClassFormat( classAttribute ) {
	const format = {
		type: metadata[ 'type' ],
		attributes: {
			class: classAttribute,
		},
	};

	return format;
}
