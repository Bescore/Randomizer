
//recuperer les boutons et inputs, divs
let inputParticipants = $( "#inp_participant" );
let boutonAjoutParticipant = $( "#add_participant" );
let boutonEffacerParticipant = $( "#effacer_part" );
let boutonChoisirPersonne = $( "#bouton-choisir" );
let divAffichageParticipant = $( '#afficher-participant' );
let divAffichageNombreParticipant = $( '#nombre-participant' );
let boutonNombreParGroupe = $( "#nbr-par-groupes" );
let inputNombreParGroupe = $( "#input-nombre-par-groupes" );
let afficherGroupesDiv = $( "#afficher-groupes" );
let rewind = $( "#rewind" );
let boutonChangeTheme = $( "#change-theme" );
let afficherHomer = $( "#homer" );



//var utilisé ici pour que le tableau puisse varier
var tab_participant;
let oldParticipant = [];
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
function verifierChamps () {
    if ( inputParticipants.val() == "" ) {
        alert( 'Ajoutez des noms' );
        return false;
    }
    return true;
}

//verifier que le participant ajouté n'est pas déjà présent dans la liste
function verifierPresenceParticipant ( array, value ) {
    return array.includes( value );
}


//Fonction qui push le participant et le stock
function pushParticipant () {
    //verifier d'abord que l'entrée utilisateur (peut être améliorer avec un regex ou autre)
    if ( verifierChamps() && !verifierPresenceParticipant( tab_participant, inputParticipants.val() ) ) {
        tab_participant.push( inputParticipants.val() );
        localStorage.setItem( "participants", JSON.stringify( tab_participant ) );
    } else {
        alert( "Cet élement est déjà enregistré" )
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
    } )

}
ajouterParticipant();

//gérer l'ajout avec la touche entrer
function keyPressEnter () {
    inputParticipants.keypress( function ( event ) {
        if ( event.key === "Enter" ) {
            if ( verifierChamps() && !verifierPresenceParticipant( tab_participant, inputParticipants.val() ) ) {
                tab_participant.push( inputParticipants.val() );
                localStorage.setItem( "participants", JSON.stringify( tab_participant ) );
                //on clear le champs
                inputParticipants.val( "" );
            } else {
                alert( "Cet élement est déjà enregistré" )
            }
            //actualiser affichage participant
            afficherPaticipants();
            //actualiser affichage nombre participant
            afficherNombreParticipant();
        }
    } )

}
keyPressEnter();


//Fonction effacer l'entrée courante au focus du champs
function effacerChampAuFocus () {
    inputParticipants.focus( function () {
        inputParticipants.val( "" );
    } )
}
effacerChampAuFocus();


//Fonction afficher participants
function afficherPaticipants () {
    //on efface d'abord le contenu de la div
    divAffichageParticipant.html( `` );
    //puis on boucle et on ajoute chaque paticipant
    $( tab_participant ).each( function ( index, value ) {
        divAffichageParticipant.append( ` 🏝️ ${ value }   ` );
    } )
}
afficherPaticipants();

//Fonction afficher le nombre de participants
function afficherNombreParticipant () {
    divAffichageNombreParticipant.html( "<strong>Nombre de participants : <strong>" + tab_participant.length + "" );
}
afficherNombreParticipant();

//Fonction effacer les participants;
function effacerParticipants () {
    $( '#remove_modal' ).click( function () {
        //afficher le nombre de participants
        $( "#nombre-participant" ).html( "Nombre de participants : aucun" );
        localStorage.removeItem( "participants" );
        localStorage.removeItem( "a_ete_choisi" );
        localStorage.removeItem( "groupes" );
        recupérerLocalStorage();
        divAffichageParticipant.html( `` );
        afficherGroupesDiv.html( '' );
        $( '#modal' ).modal( 'hide' );
    } )
}

//gestion modal

//fermer le modal en cliquant sur non
$( '#close_modal' ).click( function () {
    $( '#modal' ).modal( 'hide' );
} )
//fermer le modal en cliquant sur la croix
$( '#close_cross' ).click( function () {
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
    if ( maxLimit > 0 ) {
        $( "#personne-choisi" ).html( "<img style=width:6%;height:6%;' src='homer.gif'>" + tab_participant[ nombre_random ] + " <img style=width:6%;height:6%;' src='homer.gif'>" );
        oldParticipant.push( tab_participant[ nombre_random ] );
        tab_participant.splice( nombre_random, 1 );
        //renvoyer le tableau dans le localStorage
        localStorage.setItem( "participants", JSON.stringify( tab_participant ) );
        localStorage.setItem( "a_ete_choisi", JSON.stringify( oldParticipant ) );
        //actualiser l'affichage du nombre de participant
        afficherNombreParticipant();
        //actualiser affichage participant
        afficherPaticipants();

    }
} )

//Générer les groupes


//on creer un sous tableau et on envoi le nombre de participant décidé par l'utilisateur dans celui-ci
function creerSousTableauDeParticipant ( nombre ) {
    let newTab = [];
    for ( let i = 0; i < nombre; i++ ) {
        let maxLimit = tab_participant.length;
        //générer chiffre aléatoire
        let nombre_random = Math.floor( Math.random() * maxLimit );

        if ( !newTab.includes( tab_participant[ nombre_random ] ) ) {
            newTab.push( tab_participant[ nombre_random ] );

        } else {
            newTab.push( tab_participant[ i ] );

        }

    }
    return newTab;
}

//verifier qu'un nom est présent dans le tableau
function isExist ( tableauDeGroupe, tableauTemporaire ) {
    for ( const elem of tableauDeGroupe ) {
        if ( !tableauTemporaire.includes( elem ) ) {
            tableauTemporaire.push( elem );
            return true;
        }
        else {
            return false;
        }
    }
}

//on envoit les tableaux créé dans un autre tableau qu'on onverra dans le localStorage
function tableauDeGroupes () {
    let groupTab = [];
    let tempTab = [];
    for ( let i = 0; i < ( tab_participant.length ) / inputNombreParGroupe.val(); i++ ) {
        let tableau = creerSousTableauDeParticipant( inputNombreParGroupe.val() );

        if ( isExist( tableau, tempTab ) ) {
            groupTab.push( tableau );
        }
    }
    //si la taille du tableau de groupe est inférieur à la taille totale du tableau de participants divisé par le nombre par groupe on relance la fonction
    if ( ( groupTab.length < tab_participant.length / inputNombreParGroupe.val() ) ) {
        tableauDeGroupes();
    } else {
        nouveauGroupes( groupTab );
        localStorage.setItem( "groupes", JSON.stringify( groupTab ) );
    }
}


//declencher la creation de grp au click
boutonNombreParGroupe.click( function () {
    if ( tab_participant.length % inputNombreParGroupe.val() == 0 && tab_participant.length != inputNombreParGroupe.val() ) {
        tableauDeGroupes();
    } else {
        alert( "Vous ne pouvez pas effectuer cette action vérifiez le nombre de participants" );
    }

} )

//afficher les groupes
function nouveauGroupes ( array ) {
    let i = 1;
    afficherGroupesDiv.html( '' );
    for ( const element of array ) {
        afficherGroupesDiv.append( `<li class="fs-4 list-group-item" ><span>Groupe ${ i }  : </span><strong>${ element }</strong></li>` )
        i++
    }
}

//afficher les groupes au démarrage si ils existent
function afficherGroupauLaod () {
    let groupTabParsed = JSON.parse( localStorage.getItem( "groupes" ) )
    if ( groupTabParsed != null && ( groupTabParsed.length > 0 ) ) {
        nouveauGroupes( groupTabParsed );
    }
}
afficherGroupauLaod();

//reset l'array de participant
function resetArrayDeParticipants () {
    rewind.click( function () {
        tab_participant = oldParticipant.concat( tab_participant );
        oldParticipant = [];
        localStorage.setItem( "participants", JSON.stringify( tab_participant ) );
        localStorage.removeItem( "a_ete_choisi" );
        //vider le contenu html de la div 'personne choisi'
        $( "#personne-choisi" ).html( '' );
        //actualiser l'affichage du nombre de participant
        afficherNombreParticipant();
        //actualiser affichage participant
        afficherPaticipants();
    } )
}
resetArrayDeParticipants();

//function de changement de theme
function changeTheme () {
    boutonChangeTheme.click( function () {
        if ( localStorage.getItem( "theme" ) ) {
            $( "body" ).removeClass( "dark-theme" );
            localStorage.removeItem( "theme" );
        } else {
            $( "body" ).addClass( "dark-theme" );
            //envoyer la class dans le localStorage
            localStorage.setItem( "theme", "dark-theme" );
        }
    } )
}
changeTheme();

//function thème préféré de l'utilisateur à l'arrivé sur la page
function iniTtheme () {
    if ( localStorage.getItem( "theme" ) ) {
        $( "body" ).addClass( "dark-theme" );
    }
}
iniTtheme();