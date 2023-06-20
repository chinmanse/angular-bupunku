import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type UserType = {
  nombre_completo: string;
  fecha_nacimiento: string;
  celular: string;
  telefono_fijo: string;
  direccion: string;
};

@Component({
  selector: 'app-colores',
  templateUrl: './index.component.html',
  // styleUrls: ['./create.component.scss']
})
export class IndexComponent implements OnInit {
  public user: UserType = null;
  public usersData: any = [];
  public formData: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let users: string = this.getData();
    console.log('Estos son los usuarios en session-->', JSON.parse(users));
    if (users) {
      this.usersData = JSON.parse(users);
    } else {
      this.usersData = [];
    }
    this.usersData = this.usersData.map((user) => {
      const actual_date = new Date();
      const actual_year = actual_date.getFullYear();
      const actual_month = actual_date.getMonth();
      const actual_day = actual_date.getDay();

      const birthdate = new Date(user.fecha_nacimiento);
      const birth_year = birthdate.getFullYear();
      const birth_month = birthdate.getMonth();
      const birth_day = birthdate.getDay();

      let yearDifference = actual_year - birth_year;
      if (yearDifference > 1) {
        if (birth_month > actual_month) {
          yearDifference -= 1;
        } else if (actual_month == birth_month && birth_day > actual_day) {
          yearDifference -= 1;
        }
      }
      user.edad = yearDifference;
      return user;
    });
  }

  public create() {
    this.router.navigate(['./users/creation']);
  }

  public edit(nombre) {
    this.router.navigate(['./users/edit/' + nombre]);
  }
  public show(nombre) {
    this.router.navigate(['./users/' + nombre]);
  }

  public dataSave(users) {
    console.log('Guardando estoo', users);
    sessionStorage.setItem('users', users);
  }

  public getData() {
    return sessionStorage.getItem('users');
  }
}
