import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

type UserType = {
  nombre_completo: string;
  fecha_nacimiento: string;
  celular: string;
  telefono_fijo: string;
  direccion: string;
};

@Component({
  selector: 'app-colores',
  templateUrl: './show.component.html',
  // styleUrls: ['./create.component.scss']
})
export class ShowComponent implements OnInit {
  public user: UserType = null;
  public usersData: any = [];
  public formData: FormGroup;
  public nombre: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.nombre = this.activeRouter.snapshot.params.nombre;
  }

  ngOnInit(): void {
    let users: string = this.getData();
    console.log('Estos son los usuarios en session-->', JSON.parse(users));
    if (users) {
      this.usersData = JSON.parse(users);
      console.log('Nombre que se envia-->', this.nombre);
      this.user = this.usersData.find((user) => {
        console.log('Comparacion', user.nombre_completo, this.nombre);
        return user.nombre_completo == this.nombre;
      });
      console.log(this.user);
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
      this.usersData = this.usersData.map((user) => {
        if (user.nombre_completo == this.nombre) {
          user.nombre_completo = this.formData.value.full_name;
          user.fecha_nacimiento = this.formData.value.bithdate;
          user.celular = this.formData.value.cellphone;
          user.telefono_fijo = this.formData.value.phonenumber;
          user.direccion = this.formData.value.address;
        }
        return user;
      });
      this.dataSave(JSON.stringify(this.usersData));
      this.router.navigate(['./users']);
    }
  }

  public back() {
    this.router.navigate(['./users']);
  }

  public dataSave(users) {
    console.log('Guardando estoo', users);
    sessionStorage.setItem('users', users);
  }

  public getData() {
    return sessionStorage.getItem('users');
  }
}
