import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ModalErrorComponent} from "../../../shares/modal-error/modal-error.component";
import {OfferService} from "../../../../services/offer/offer.service";
import {Router} from "@angular/router";

declare let $: any;

@Component({
  selector: 'app-besoin-entreprise',
  templateUrl: './besoin-entreprise.component.html',
  styleUrls: ['./besoin-entreprise.component.css']
})
export class BesoinEntrepriseComponent implements OnInit {

  errorMessage!:string;
  formGroup!: FormGroup;
  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;

  // texte: string = '';
  // italic: boolean = false;
  // bold: boolean = false;


  constructor(private fb: FormBuilder, private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      title: this.fb.control('', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      domain: this.fb.control('', [Validators.minLength(6),Validators.maxLength(30)]),
      mission: this.fb.control("", [Validators.required]),
      skills: this.fb.control("", [Validators.required]),
      profile: this.fb.control("", [Validators.required]),
      experience: this.fb.control('', [Validators.required]),
      workMode: this.fb.control('Sur site', [Validators.required])
    });

  }

  get r(){
    return this.formGroup.controls;
  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }


  // toggleItalic() {
  //   this.italic = !this.italic;
  //   this.applyFormatting();
  // }
  //
  // toggleBold() {
  //   this.bold = !this.bold;
  //   this.applyFormatting();
  // }
  //
  // applyFormatting() {
  //   let formattedText = this.texte;
  //   if (this.italic) {
  //     formattedText = '<em>' + formattedText + '</em>';
  //   }
  //   if (this.bold) {
  //     formattedText = '<strong>' + formattedText + '</strong>';
  //   }
  //   this.texte = formattedText;
  // }



  // transformer un texte en gras
  handleBold(){
    //$('#textarea, #textarea-show').toggleClass('bold');
    document.execCommand('bold');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);
  }

  // transformer un texte en italic
  handleItalic(){
    //$('#textarea, #textarea-show').toggleClass('italic');
    document.execCommand('italic');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);
  }

  // transformer un texte en le soulignant
  handleUnderline() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('underline');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }

  // transformer un texte en titre (h1, h2,...)
  handleHeading() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('heading');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }

  // insérer une image
  handleInsertImage() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('insertImage');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }

  // insérer une liste ordoné
  handleInsertOrderedList() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('insertOrderedList');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }

  // insérer une liste non ordoné
  handleInsertUnOrderedList() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('insertUnorderedList');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }

  // insérer un paragraphe
  handleInsertParagraph() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('insertParagraph');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }

  // justifier le texte au centre
  handleJustifyCenter() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('justifyCenter');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }


  // justifier le texte à gauche
  handleJustifyLeft() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('justifyLeft');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }


  // justifier le texte à droite
  handleJustifyRight() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('justifyRight');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }


  // justifier le texte
  handleJustifyFull() {
    //$('#textarea, #textarea-show').toggleClass('underline');
    document.execCommand('justifyFull');
    let text = document.getElementById('textareaDiv')?.innerHTML;
    //$('#textarea-show').html(text);}
  }


// simulateur du contenu du textarea
  htmlContent = '';
  handleSimulateTextAreaContent(){
    let areatext = $('.skills').html();
    alert(areatext);
  }

}
