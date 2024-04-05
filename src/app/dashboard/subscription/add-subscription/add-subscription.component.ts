import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "../../../models/subscription.models";
import {SubscriptionService} from "../../../services/subscription/subscription.service";
import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit {

  newSubscriptionFormGroup!: FormGroup;
  constructor(private userService: AppUserService, private fb: FormBuilder, private subscriptionService: SubscriptionService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {

    this.newSubscriptionFormGroup = this.fb.group({
      username : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      period : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      type: this.fb.control(null, [Validators.required, Validators.minLength(4)])

    });

  }

  handleSaveSubscription() {
    let subscription: Subscription = this.newSubscriptionFormGroup.value;
    this.subscriptionService.saveSubscription(subscription).subscribe({
      next: value => {
        console.log(value);
        alert("Subscription has been successfully saved");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/listSubscription");
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return fieldName + "  "+ " is required";
    }else if (error['minlength']){
      return fieldName + "  "+ "should have at least" + " "+ error['minlength']['requiredLength'] + "  "+ "characters";
    }else if (error['maxlength']){
      return fieldName + "  "+ "should have at the most" + "  " + error['maxlength']['requiredLength'] + "  " + "characters";
    }else if (error['pattern']) {
      return fieldName + "  "+ "required this pattern" + error['pattern']['requiredPattern'] ;
    }else if (error['email']) {
      return fieldName + "  " + "address is not valid "+ "  "+ error['email']['requiredEmail'];
    }else return "";

  }
}
