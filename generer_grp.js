//inputs
var input_group_of = document.querySelector( '#groupe_de_combien' );
//boutons
var groupe_de_combien = document.querySelector( '#groupe_de_combien' );
var Afficher_les_groupes = document.querySelector( '#Afficher les groupes' );
var generer_grp = document.querySelector( '#generate_grp' );








if ( localStorage.getItem( "participants" ) ) {
    //on recupere le tableau dans le localStorage
    var tab_participant = JSON.parse( localStorage.getItem( "participants" ) )
}

//choisir une personne au hasard
$( "#choisir_une_personne" ).click( function () {
    var maxLimit = tab_participant.length
    var nombre_random = Math.floor( Math.random() * maxLimit );
    if ( maxLimit > 0 ) {
        $( "#personne_choisi" ).html("🥳 "+ tab_participant[ nombre_random ]+" 🥳" )
        tab_participant.splice( nombre_random, 1 )  
    }

    console.log(tab_participant)
})
var array = []
for ( let i = 0; i < (tab_participant.length/ 2 ); i++ ) {
    // on écrit la fonction qui va générer un nombre random , nombre d'item dans le tableau exclu, car les tableux commencent à l'indice 0
    var maxLimit = tab_participant.length
    var nombre_random = Math.floor( Math.random() * maxLimit );
    var new_random = Math.floor( Math.random() * maxLimit );
    
    
    if ( !array.includes( tab_participant[ nombre_random ] ) ) {
        array.push( tab_participant[ nombre_random ], tab_participant[ new_random ] )
        
    
    } 
    
    
    
}
console.log(tab_participant)
