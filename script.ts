import { log } from 'console';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let listeContacts: object[] = [];
let compteur: number = 0;

function demanderCommande() {
  rl.question("Commande: ", (reponse) => {
    switch (reponse) {
      case '/aide':
        listerCommandes();
        break;
      case '/ajouter':
        ajouterContact();
        break;
      case '/lister':
        listerContacts();
        break;
      case '/supprimer':
        supprimerContact();
        break;
      case '/quitter':
        console.log("Fermeture de l'application.");
        rl.close();
        break;
      default:
        console.log("Commande invalide ! Veuillez recommencer");
        demanderCommande();
    }
  })
}

function accueil() {
  console.log("Bonjour et bienvenue ! Je suis votre repertoire !\n Saisissez /aide pour afficher la liste des commandes.\n Ou bien saisissez une commande existante.");
  demanderCommande();
}

function listerCommandes() {
  console.log("Voici le detail des différentes commandes disponible\n /aide : Affiche toutes les commandes disponibles\n /quitter : Quitte votre application repertoire\n /ajouter : Ajoute un nouveau contact à votre repertoire\n /lister : Liste tout les contacts de votre repertoire\n /supprimer : Supprime un contact en spécifiant son ID");
  demanderCommande();
}

function ajouterContact() {

  const nouveauContact : {
    id: number,
    prenom: string,
    nom: string,
    telephone: string,
  } = {
    id: -1,
    prenom: '',
    nom: '',
    telephone: '',
  }

  console.log("Très bien ! Ajoutons un nouveau contact !");
  rl.question("Quel est le prénom de votre nouveau contact ? ", (reponse) => {
    nouveauContact.prenom = reponse;
  
    rl.question("Quel est le nom de votre nouveau contact ? ", (reponse) => {
      nouveauContact.nom = reponse;
  
      rl.question("Quel est le numéro de votre nouveau contact ? ", (reponse) => {
        nouveauContact.telephone = reponse;
        nouveauContact.id = compteur;
        compteur++;
        listeContacts.push(nouveauContact);
        console.log("Votre contact " + nouveauContact.prenom + " " + nouveauContact.nom + " a bien été ajouté au repertoire !");
        demanderCommande();
      })
    })
  });
}

function listerContacts() {
  console.log("Voici la liste de vos contacts dans le repertoire :")
  if (listeContacts.length <= 0) {
    console.log("----------------");
    console.log("Vous n'avez aucun contact enregistré dans le repertoire !");
  } else {
    listeContacts.map( element => {
      console.log("----------------");
      console.log("ID : " + Object.values(element)[0] + " ===> " + Object.values(element)[1] + " " + Object.values(element)[2]);
      console.log("Téléphone : " + Object.values(element)[3]);
    });
  }
 demanderCommande();
}

function supprimerContact() {
  console.log("Voici comment effacer un contact de votre repertoire :\nRécupérer l'ID de votre contact avec la commande /liste\nPuis utilisez la commande /effacer pour l'effacer de votre repertoire");
  if (listeContacts.length <= 0) {
    console.log("----------------");
    console.log("Vous n'avez aucun contact enregistré dans le repertoire !");
    demanderCommande();
  } else {
    let longueur: number = listeContacts.length;
    rl.question("Quel est l'ID du contact que vous voulez supprimer ? ", (reponse) => {
      listeContacts = listeContacts.filter( element => reponse != Object.values(element)[0] );
      if (listeContacts.length == longueur - 1)
        console.log("Votre contact a bien été supprimée !");
      else
        console.log("Désolé cette ID ne correspond à aucun contact !")
      demanderCommande();
    });
  }
}

accueil();