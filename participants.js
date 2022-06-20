
//inputs
var input_participant = document.querySelector( '#inp_participant' );
var input_group_of = document.querySelector( '#groupe_de_combien' );
//boutons
var add_part = document.querySelector( '#add_participant' );
//div
var display_part = document.querySelector( '.display_part' );


//charger le localStorage
function locSTorage() {
  tab_participant= JSON.parse( localStorage.getItem( "participants" ))
}


//création d'un tableau
var tab_participant = []

//clear le champ au focus
$( input_participant ).focus( function () {
  $( input_participant ).val("");
})
//ajouter les noms à ce tableau
$( add_part ).click( function () {
  if ( $( input_participant ).val() == "" ) {
    alert( 'Ajoutez des noms' )
  } else {
    /*si un tableau de nom est présent dans le localStorage on le récupère, 
    on y ajoute les noms voulu et on renvoit ce tableau dans le localStorage */
    if ( localStorage.getItem( "participants" ) ) {
      locSTorage();
      tab_participant.push( $( input_participant ).val() )
      localStorage.setItem( "participants", JSON.stringify( tab_participant ) )
      /*sinon on continue d'ajouter des noms*/
    } else {
      tab_participant = []
      tab_participant.push( $( input_participant ).val() )
      localStorage.setItem( "participants", JSON.stringify( tab_participant ) )
    }
    //afficher chaque nom à la volée
    $( display_part ).append( ` ${ $( input_participant ).val() } || ` )
    //afficher le nombre de participants
    $( "#nombre_participant" ).html( "Nombre de participants : " + JSON.parse( localStorage.getItem( "participants" ) ).length )
  }
} )



$( "#effacer_part" ).click( function () {
  $( '#modal' ).modal( 'show' );
  //effacer les participants
  $( '#remove_modal' ).click( function () {
    //afficher le nombre de participants
$("#nombre_participant").html("Nombre de participants : aucun")
    localStorage.removeItem( "participants" )
    $( display_part ).html( `` )
    $( '#modal' ).modal( 'hide' );
  } )
}
)
//fermer le modal en cliquant sur non
$( '#close_modal' ).click(function () {
  $( '#modal' ).modal( 'hide' );
})
//fermer le modal en cliquant sur la croix
$( '#close_cross' ).click(function () {
  $( '#modal' ).modal( 'hide' );
})
//afficher participants au load
var tab_particip = JSON.parse( localStorage.getItem( "participants" ) );
$(tab_particip).each(function (index,value) {
  $(display_part).append(` ${value} ,  `)
} )


