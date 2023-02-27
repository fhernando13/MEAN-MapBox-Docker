import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    states = [
      'JALISCO',
      'GUANAJUATO',
      'MICHOACAN',
    ]

  createFormGroup() {
    return new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      fathers_lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      mothers_lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      age: new FormControl(0, [
        Validators.required,
        Validators.min(18),
        Validators.max(99),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.emailPattern),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      state: new FormControl(this.states.at(0)),
      town: new FormControl('', Validators.required),
      code_postal: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      suburb: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      no_street: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
    });
  }


  userForm: FormGroup | any;
  constructor(private usersService: UsersService, 
              private router: Router,
              private mapService: MapService) {
    this.userForm = this.createFormGroup();
  }

  get name() {
    return this.userForm.get('name');
  }
  get fathers_lastname() {
    return this.userForm.get('fathers_lastname');
  }
  get mothers_lastname() {
    return this.userForm.get('mothers_lastname');
  }
  get age() {
    return this.userForm.get('age');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  // get state() {
  //   return this.userForm.get('state');
  // }
  get town() {
    return this.userForm.get('town');
  }
  get code_postal() {
    return this.userForm.get('code_postal');
  }
  get suburb() {
    return this.userForm.get('suburb');
  }
  get street() {
    return this.userForm.get('street');
  }
  get no_street() {
    return this.userForm.get('no_street');
  }

  ngOnInit() {
    this.mapService.myMap();
  }

  onReset() {
    this.userForm.reset();
  }

  addUser() {
    console.log('Saved');
    if (this.userForm) {
      this.usersService.saveUser(this.userForm.value).subscribe({
        next: (res) => (this.userForm = res),
        error: (err) => console.log(err),
      });
      console.log(this.userForm.state);
      this.router.navigate(['/users']);
      Swal.fire('Good job!', 'User saved!', 'success');
    } else {
      console.log('error');
    }
  }

}


