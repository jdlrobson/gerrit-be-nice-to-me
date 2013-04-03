( function( $ ) {

function listener( ev ) {
	var $t = $( ev.target ), $owner;
	if ( $t.hasClass( 'commentPanel' ) ) { // force open comment panel
		$t.find( '.commentPanelContent' ).show();
	} else if ( $t.hasClass( 'gwt-DisclosurePanel' ) ) { // open patchset
		$( '.gwt-DisclosurePanel-closed tbody tr' ).trigger( 'click' ); // HACK! not optimal
	} else if ( $t.children( '.changeTable' ).length > 0 ) {

		var comments = 0;
		$t.find( '.changeTable .commentCell' ).each( function() { // count comments
			var text = $( this ).text(), newCount;
			if ( text ) { // not empty
				text = text.replace( ' comment' ); // errgg hacky sorry
				newCount = parseInt( text, 10 );
				if ( !isNaN( newCount ) ) { // check we got a number
					comments += newCount; // add it to the count
				}
			}
		} );
		$owner = $t.parents( '.gwt-DisclosurePanel' );
		$( '<a class="downloadLink">' ).text( comments + ' comments' ).
			appendTo( $owner.find( 'tr' ).eq( 0 ).find( 'td' ).eq( 2 ) );
		$owner.find( 'tbody tr' ).trigger( 'click' );
	}
}
document.addEventListener( 'DOMNodeInserted', listener, false );

} )( jQuery );
