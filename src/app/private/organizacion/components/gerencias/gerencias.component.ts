import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gerencias',
  templateUrl: './gerencias.component.html',
  styleUrls: ['./gerencias.component.scss'],
})
export class GerenciasComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      gerente: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const result = await this.http
      .post('api/gerencias', this.form.value)
      .toPromise();
    console.log('result', result);
  }
}
