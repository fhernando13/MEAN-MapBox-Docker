import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//service
import { UsersService } from '../../services/users.service';

//export excel
import { VERSION } from '@angular/core';
import * as XLSX from 'xlsx';

//alerts
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];

  constructor(public usersService: UsersService,
              private router: Router){}
  
  ngOnInit(){ 
    this.listUsers()
  }

  listUsers(){
    this.usersService.getUsers().subscribe({
      next: res =>{
        this.users = res;
      },
      error: err =>{console.log(err)}}
    );
  }
  
  askDeleteUser(id: string){
    Swal.fire({
      title: 'Do you want to delete the user?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteUser(id)
        Swal.fire('Deleted!')      
      } else if (result.isDenied) {
        Swal.fire('User will not be deleted')
      }
      console.log("redirect index");
      return this.listUsers();
    })
  }

  deleteUser(id: string){
    this.usersService.deleteUser(id).subscribe(
      {
        next: res =>{ this.users = res },
        error: err =>{console.log(err)}
      }
    )
  }

  editUser(id:string){
    this.router.navigate(['/users/edit/'+id])
    //alert(id);
  }
  
  detailUser(id:string){
    this.router.navigate(['/users/detail/'+id])
  }

  exportToExcel(): void {
    let element = document.getElementById('tableUser');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, 'ExcelSheet.xlsx');
  }

}
