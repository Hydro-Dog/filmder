import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
  });

  constructor(private navController: NavController, private fb: FormBuilder) {}

  ngOnInit() {
    // this.registrationForm = this.fb.group({
    //   userName: ['', Validators.required],
    // });
  }

  navigateBack() {
    this.navController.navigateBack('/auth');
  }
}
