import {Component, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {OfferService} from "../../../services/offer/offer.service";
import {Router} from "@angular/router";
import {Offer} from "../../../models/offer.models";
import {ModalErrorComponent} from "../../shares/modal-error/modal-error.component";


@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  errorMessage!:string;
  newOfferFormGroup!: FormGroup;
  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;
  _offer!: Offer;
  file!:File;


  constructor(private fb: FormBuilder, private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {

    this.newOfferFormGroup = this.fb.group({
      title: this.fb.control('', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      mission: this.fb.control("", [Validators.required]),
      domain: this.fb.control('', [Validators.minLength(6),Validators.maxLength(30)]),
      profile: this.fb.control("", [Validators.required]),
      address: this.fb.control("Bertoua, Est", [Validators.required]),
      tel: this.fb.control("620178549", [Validators.pattern("[0-9]+"),Validators.required]),
      experience: this.fb.control('2-5 ans', [Validators.required]),
      salary: this.fb.control("50000", [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control("", [Validators.required]),
      endOffer: this.fb.control(null, [Validators.required]),
      needPeople: this.fb.control(1, [Validators.required,Validators.pattern("[0-9]+")]),
      skills: this.fb.control("java, css, html", [Validators.required]),
      email:  this.fb.control("css@gmail.com", [Validators.required, Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      contract:  this.fb.control('CDI', [Validators.required]),
      workMode: this.fb.control('Sur site', [Validators.required])

    });

  }

  handleSetEnterpriseNeed(value: any) {
    this._offer = {
      title: value.title,
      domain: value.domain,
      mission: value.mission,
      skills: value.skills,
      profile: value.profile,
      workMode: value.workMode,
      experience: value.experience

    }

  }

    handleSetEnterpriseInfo(value: any) {
      this._offer = {
        web: value.web,
        linkedin: value.linkedin,
        name: value.name,
      }

  }

  handleSetOtherInfo(value: any) {
    this._offer = {
      contract: value.contract,
      endOffer: value.endOffer,
      salary: value.salary,
      needPeople: value.needPeople,
      address: value.address,
      email: value.email
    }

  }

  get r(){
    return this.newOfferFormGroup.controls;
  }

  handleSaveOffer() {
    //let offer: Offer = this.newOfferFormGroup.value;
    const {
      title,
      mission,
      domain,
      profile,
      address,
      tel,
      experience,
      salary,
      endOffer,
      needPeople,
      skills,
      email,
      contract,
      workMode

    } = this.newOfferFormGroup.value;

    const formdata: FormData = new FormData();
    formdata.append("title",title)
    formdata.append("mission",mission)
    formdata.append("domain",domain)
    formdata.append("profile",profile)
    formdata.append("address",address)
    formdata.append("tel",tel)
    formdata.append("experience",experience)
    formdata.append("salary",salary)
    formdata.append("endOffer",endOffer)
    formdata.append("needPeople",needPeople)
    formdata.append("skills",skills)
    formdata.append("email",email)
    formdata.append("contract",contract)
    formdata.append("workMode",workMode)
    formdata.append("logo",this.file)

    console.log('offer', formdata)

    this.offerService.saveOffer(formdata).subscribe({
      next: value => {
        console.log(value);
        alert("offre d\'emploi publié avec succès !");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/jobs");
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }

  /**
   *  cette fonction permet de récupérer le dernier fichier sélectionné
   */
  getFile(event: any): void {
    this.file = event.target.files[0];
  }

}
