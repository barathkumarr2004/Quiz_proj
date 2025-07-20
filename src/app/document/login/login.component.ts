import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const newUser = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/api/register', newUser)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/home']);
      }, error => {
        console.error(error);
      });   
  }
}
