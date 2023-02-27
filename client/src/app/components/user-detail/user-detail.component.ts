import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { MapService } from '../../services/map.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit  {

  
  
  userForm: User | any = {
    id: 0,
    name: '',
    fathers_lastname: '',
    mothers_lastname: '',
    age: 0,
    email: '',
    phone: '',
    state: '',
    town: '',
    code_postal: '',
    suburb: '',
    street: '',
    no_street: '',
  };
  

  constructor(public usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private mapService: MapService ){

  }

  ngOnInit(){
    this.detailUser();
    this.mapService.myMap()
  }

  detailUser(){
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params["id"]) {
      this.usersService.getUser(params["id"])
        .subscribe(
          {
            next: res=>(
              this.userForm = <any>res[0]
            ),
            error: err=>(alert(err))
          }
        )
    }
  }

  
  

}
