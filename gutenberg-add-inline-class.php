<?php
/**
 * Plugin Name:     Gutenberg Add Inline Class Name
 * Description:     Add class attribute into inline element within richtext on gutenberg editor.
 * Version:         0.1.0
 * Author:          Tomoyuki Kato
 * Text Domain:     gutenberg-add-inline-classs
 */

/**
 * Register rich text format type assets so that they can be enqueued.
 */
function gutenberg_add_inline_class_init() {
	$dir        = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "gutenberg-add-inline-class" block first.'
		);
	}
	$script_asset = require( $script_asset_path );
	$js_path     = 'build/index.js';
	wp_enqueue_script('gutenberg-add-inline-class-editor-script', plugins_url( $js_path, __FILE__ ), $script_asset['dependencies'], $script_asset['version']);
}
add_action( 'init', 'gutenberg_add_inline_class_init' );

function gutenberg_add_inline_class_style() {
	$css_path = "/build/index.css";
	wp_enqueue_style( 'gutenberg-add-inline-class-editor-style', plugins_url( $css_path, __FILE__ ) );
}
add_action( 'admin_enqueue_scripts', 'gutenberg_add_inline_class_style' );
