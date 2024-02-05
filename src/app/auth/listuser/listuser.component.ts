import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements AfterViewInit {

  constructor(private builder: FormBuilder,
    private service: AuthService,
    private dialog: MatDialog,
    private router: Router) {
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void { }

  LoadUser() {
    this.service.getAll().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];

  deleteUser(userId: string): void {
    this.service.deleteAccount(userId).subscribe(
      response => {
        console.log('User deleted successfully');
        this.LoadUser();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  proceedAddNewAccount(){
    this.router.navigate(['/register']); 
  }

  proceedEditAccount(userId: string) {
    this.router.navigate(['/edit-account', userId]); 
  }
}
