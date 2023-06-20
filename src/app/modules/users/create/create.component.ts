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
  templateUrl: './create.component.html',
  // styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public user: UserType = null;
  public usersData: any = [];
  public formData: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    let users: string = this.getData();
    console.log('Estos son los usuarios en session-->', JSON.parse(users));
    if (users) {
      this.usersData = JSON.parse(users);
    } else {
      this.usersData = [];
    }

    this.formData = this.fb.group({
      full_name: [null, [Validators.required]],
      bithdate: [null, [Validators.required]],
      cellphone: [null, [Validators.required]],
      phonenumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  public store() {
    if (!this.formData.invalid) {
      this.usersData.push({
        nombre_completo: this.formData.value.full_name,
        fecha_nacimiento: this.formData.value.bithdate,
        celular: this.formData.value.cellphone,
        telefono_fijo: this.formData.value.phonenumber,
        direccion: this.formData.value.address,
      });
      this.dataSave(JSON.stringify(this.usersData));
      this.router.navigate(['./users']);
    }
  }

  public dataSave(users) {
    console.log('Guardando estoo', users);
    sessionStorage.setItem('users', users);
  }

  public getData() {
    return sessionStorage.getItem('users');
  }
}
