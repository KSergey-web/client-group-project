import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    login: '',
    password: ''
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.login(this.checkoutForm.value).subscribe(res=>{
      this.router.navigate(['rooms']);
    }, err=>{ console.log(err); alert('Неверный логин или пароль');});
  }

  onRegistr(): void {
    this.authService.registr(this.checkoutForm.value).subscribe(()=>{this.onLogin()},err=>{ this.errRegistr(err.status) });;
  }

  errRegistr(status: number){
    switch (status) {
      case 400:
        alert('Введены некорректные данные');
        break;
      case 409:
        alert('Такой логин уже занят');
        break;
      default:
        alert(`Error ${status}`);
    }
    return;
  }
}
