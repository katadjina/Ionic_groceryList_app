import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Article } from '../explore-container/models/article.models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  nomDeLArticle : string|null = null;

  articles: Article[] = [] ;


  constructor(
    private alertController : AlertController,
    private asController: ActionSheetController,
    private storage : Storage,
  )  { }



  ajouter() {
    if(!this.nomDeLArticle){
      return;
    }
    const nouvelArticle = {
      nom: this.nomDeLArticle,
      estCoche:false
      };
    this.articles.push(nouvelArticle);
     //this.articles = [...this.articles, nouvelArticle];
     this.nomDeLArticle = null;
  }

  
confirmer(){
  this.alertController.create({
    message: 'Are you sure to erase the list?',
    buttons: [{text: 'non'} , {text: 'oui', handler: () => this.effacerTout()  }]
  }).then(a => a.present());
}



afficherAction(article: Article){
  this.asController.create({ buttons: [
    {
      text: 'Supprimer', 
      icon: 'trash-bin' , 
      handler: () => this.supprimer(article)}, 
    {
      text: article.estCoche ?  'Décocher' : 'Valider',
      icon: article.estCoche ? 'close' : 'checkmark',
      handler: () => this.valider(article)
    }
  ] }).then(as => as.present());
}


private supprimer(article: Article){
  //const index = this.articles.indexOf(article);
  //this.articles.splice(index, 1);
  this.articles = this.articles.filter(a => a !== article)
}


private valider(article: Article){
  article.estCoche = !article.estCoche;
}


private effacerTout(){
  if(!this.articles.length){
    return;
  }
  //remove most recent
  //this.articles.pop();
  this.articles = [];
}

ionViewDidEnter(){
  //triggered each time app is entered
  this.load();
}


ionViewWillLeave(){
  //triggered each time u leave the app
  this.save();
}



private save() {
  this.storage.set('LIST_ARTICLES', this.articles);
}



private load() {
  this.storage.get('LIST_ARTICLES')
  .then(data => this.articles = data);
}





}