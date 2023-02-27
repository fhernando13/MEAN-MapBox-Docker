import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MapService } from 'src/app/services/map.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

//mapbox
// import * as Mapboxgl  from 'mapbox-gl';
// import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  // mymap: Mapboxgl.Map | any;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  createFormGroup(){
    return new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      fathers_lastname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      mothers_lastname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      age: new FormControl(0, [Validators.required, Validators.min(18), Validators.max(99)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      state: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      code_postal: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      suburb: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      no_street: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    })
  }


  userForm: User|any;

  constructor(private usersService: UsersService,
              private activedRouted: ActivatedRoute,
              private router: Router,
              private mapService: MapService ){
    this.userForm = this.createFormGroup();
  }


  get name() { return this.userForm.get('name'); }
  get fathers_lastname() { return this.userForm.get('fathers_lastname'); }
  get mothers_lastname() { return this.userForm.get('mothers_lastname'); }
  get age() { return this.userForm.get('age'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }
  get state() { return this.userForm.get('state'); }
  get town() { return this.userForm.get('town'); }
  get code_postal() { return this.userForm.get('code_postal'); }
  get suburb() { return this.userForm.get('suburb'); }
  get street() { return this.userForm.get('street'); }
  get no_street() { return this.userForm.get('no_street'); }

  ngOnInit(){
    const id_user = <string>this.activedRouted.snapshot.params["id"];
    console.log('id user: '+id_user);
    if(id_user){
      this.usersService.getUser(id_user).subscribe(
        {
          next: res=>(
            this.userForm.setValue(res[0]),
            console.log(res[0])
            ),
          error: err=>(console.log('error is: '+err)),
        }
      )
    }
    this.mapService.myMap();
  }
  
  askUpdateUser(){
    Swal.fire({
      title: 'Are you sure to update the user information?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Update',
      denyButtonText: `Don't update`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.updateUser()
        Swal.fire('Updated!')      
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
      console.log("redirect index")
    })
  }


    updateUser(){
      const id_user = <string>this.activedRouted.snapshot.params["id"];
      if(this.userForm){
        this.usersService.updateUser(id_user, this.userForm.value).subscribe(
          {
            next: res=>(
              this.userForm = res
            ),
            error: err=>(console.log(err))
          }
        )
        this.router.navigate(['/users']);
        Swal.fire(
          'Good job!',
          'User updated!',
          'success'
        )
      }else{
        console.log("error");
      }
    }

  }



