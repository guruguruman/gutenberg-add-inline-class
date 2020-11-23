/**
 * Archive plugin files.
 */
const fs = require( 'fs' );
var path = require( 'path' );
const archiver = require( 'archiver' );

const dirname = path.dirname( __dirname ).split( path.sep ).pop();
const outputPath = './dist/' + dirname + '.zip';

const readdirRecursively = ( dir, files = [] ) => {
	const dirents = fs.readdirSync( dir, { withFileTypes: true } );
	const dirs = [];

	for ( const dirent of dirents ) {
		if ( dirent.isDirectory() ) {
			dirs.push( `${ dir }/${ dirent.name }` );
		}
		if ( dirent.isFile() ) {
			files.push( `${ dir }/${ dirent.name }` );
		}
	}
	for ( const d of dirs ) {
		files = readdirRecursively( d, files );
	}

	return files;
};

let ignore = fs
	.readFileSync( '.archiveignore' )
	.toString()
	.split( '\n' )
	.map( ( ignore ) => {
		if ( 0 === ignore.length ) {
			return null;
		}

		return '^\\.\\/' + ignore;
	} )
	.filter( Boolean )
	.join( '|' );

const regex = new RegExp( ignore.length > 0 ? ignore : '.*', 'g' );
const archive = archiver( 'zip', {
	zlib: { level: 9 }, // Sets the compression level.
} );
const output = fs.createWriteStream( outputPath );

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on( 'close', function () {
	console.log( archive.pointer() + ' total bytes' );
	console.log(
		'archiver has been finalized and the output file descriptor has closed.'
	);
} );

// catch warnings (ie stat failures and other non-blocking errors)
archive.on( 'warning', function ( err ) {
	if ( err.code === 'ENOENT' ) {
		// log warning
	} else {
		// throw error
		throw err;
	}
} );

// catch this error explicitly
archive.on( 'error', function ( err ) {
	throw err;
} );
archive.pipe( output );

const paths = readdirRecursively( '.' );
paths.forEach( ( path ) => {
	if ( path.match( regex ) ) {
		return;
	}

	archive.file( path, { name: path } );
} );
archive.finalize();
