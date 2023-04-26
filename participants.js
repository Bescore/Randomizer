
//recuperer les boutons et inputs, divs
let inputParticipants = $( "#inp_participant" );
let boutonAjoutParticipant = $( "#add_participant" );
let boutonEffacerParticipant = $( "#effacer_part" );
let boutonChoisirPersonne = $( "#bouton-choisir" );
let divAffichageParticipant = $( '#afficher-participant' );
let divAffichageNombreParticipant = $( '#nombre-participant' );
let boutonNombreParGroupe = $( "#nbr-par-groupes" );
let inputNombreParGroupe=$( "#input-nombre-par-groupes" );
let groupes = [];

//var utilisé ici pour que le tableau puisse varier
var tab_participant ;
//Fonctions charger et récupérer le localeStrorage si il existe sinon le créer
function recupérerLocalStorage () {
    
    if ( localStorage.getItem( "participants" ) ) {
        //on recupere le tableau dans le localStorage si il existe
        tab_participant = JSON.parse( localStorage.getItem( "participants" ) );
    } else {
        tab_participant = [];
    }
}



//Fonction verifier que le champs n'est pas vide
function verifierChamps() {
    if ( inputParticipants.val() == "" ) {
        alert( 'Ajoutez des noms' )
        return false;
    }
    return true;
}

//Fonction qui push le participant et le stock
function pushParticipant () {
    //verifier d'abord que l'entrée utilisateur (peut être améliorer avec un regex ou autre)
    if (verifierChamps()) {
        tab_participant.push( inputParticipants.val() );
        localStorage.setItem( "participants", JSON.stringify( tab_participant ) );
        }
        //actualiser affichage participant
        afficherPaticipants();
        //actualiser affichage nombre participant
        afficherNombreParticipant();
}    


//Fonction ajouter un participant
function ajouterParticipant () {
    //charge le localStorage
    recupérerLocalStorage();
    boutonAjoutParticipant.click( function () {
        pushParticipant();
        })  
    
}
ajouterParticipant();

//gérer l'ajout avec la touche entrer
function keyPressEnter () {
    inputParticipants.keypress(function ( event ) {
        if ( event.key === "Enter" ) {
            if (verifierChamps()) {
                tab_participant.push( inputParticipants.val() );
                localStorage.setItem( "participants", JSON.stringify( tab_participant ) );
                //on clear le champs
                inputParticipants.val( "" );
                }
            //actualiser affichage participant
            afficherPaticipants();
            //actualiser affichage nombre participant
            afficherNombreParticipant();
        }
    })
    
}
keyPressEnter();


//Fonction effacer l'entrée courante au focus du champs
function effacerChampAuFocus () {
    inputParticipants.focus( function () {
        inputParticipants.val("");
    })
}
effacerChampAuFocus();


//Fonction afficher participants
function afficherPaticipants () {
    //on efface d'abord le contenu de la div
    divAffichageParticipant.html( `` );
    //puis on boucle et on ajoute chaque paticipant
    $( tab_participant ).each( function ( index, value ) {
        divAffichageParticipant.append( ` - ${ value }   ` );
    } )
}
afficherPaticipants();

//Fonction afficher le nombre de participants
function afficherNombreParticipant() {
    divAffichageNombreParticipant.html( "Nombre de participants : " + tab_participant.length +"")
}
afficherNombreParticipant();

//Fonction effacer les participants;
function effacerParticipants() {
    $( '#remove_modal' ).click( function () {
        //afficher le nombre de participants
        $( "#nombre-participant" ).html( "Nombre de participants : aucun" );
        localStorage.removeItem( "participants" );
        recupérerLocalStorage();
        divAffichageParticipant.html( `` );
        $( '#modal' ).modal( 'hide' );
    } )
}

//gestion modal

//fermer le modal en cliquant sur non
$( '#close_modal' ).click(function () {
    $( '#modal' ).modal( 'hide' );
})
  //fermer le modal en cliquant sur la croix
$( '#close_cross' ).click(function () {
    $( '#modal' ).modal( 'hide' );
} )

//gestion modal au click du bouton effacer
$( "#effacer_part" ).click( function () {
    $( '#modal' ).modal( 'show' );
    effacerParticipants();
} )

//Choix aléatoire d'un personne
boutonChoisirPersonne.click( function () {
    let maxLimit = tab_participant.length
    let nombre_random = Math.floor( Math.random() * maxLimit );
    if ( maxLimit > 1 ) {
        $( "#personne-choisi" ).html("🥳 "+ tab_participant[ nombre_random ]+" 🥳" )
        tab_participant.splice( nombre_random, 1 );
        
        //renvoyer le tableau dans le localStorage
        localStorage.setItem( "participants", JSON.stringify( tab_participant ) );
        //actualiser l'affichage du nombre de participant
        afficherNombreParticipant();
        //actualiser affichage participant
        afficherPaticipants();
        
    }
    console.log(tab_participant)
} )

//Générer les groupes


//on creer un sous tableau et on envoi le nombre de participant décidé par l'utilisateur dans celui-ci
function creerSousTableauDeParticipant(nombre) {
    let newTab = [];
    for (let i = 0; i < nombre; i++) {
        let maxLimit = tab_participant.length;
        //générer chiffre aléatoire
        let nombre_random = Math.floor( Math.random() * maxLimit );
        
            if (!newTab.includes(tab_participant[ nombre_random ])) {
                newTab.push( tab_participant[ nombre_random ] );
                tab_participant.splice( nombre_random, 1);
            } else {
                newTab.push( tab_participant[ i ] );
                tab_participant.splice(i,1)
            }
            
    } 
    console.log( tab_participant );
    return newTab;
}


//on envoit les tableaux créé dans un autre tableau qu'on onverra dans le localStorage
function tableauDeGroupe () {
    let groupTab = [];
    for ( let i = 0; i < ( tab_participant.length ) / inputNombreParGroupe.val(); i++ ) {
        let tableau = creerSousTableauDeParticipant( inputNombreParGroupe.val() );
        
        groupTab.push( tableau );
        
    }
    console.log( groupTab);
}


//declencher la creation de grp au click
boutonNombreParGroupe.click(function () {
    tableauDeGroupe();
})