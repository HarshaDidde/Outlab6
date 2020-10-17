import { Component, OnInit } from '@angular/core';
import { FormService, Form_Data } from '../form.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  profileForm = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    feedback: new FormControl('', Validators.required),
    Comments: new FormControl('', Validators.required),
  });

  constructor(private formService: FormService) {
    this.showFormData();
    //console.log('hi');
    //console.log(this.initialFormData);
    // this.profileForm.patchValue({
    //   Name: 'Rajesh Burudi',
    //   Email: this.initialFormData.email,
    //   feedback: this.initialFormData.feedback,
    //   Comments: this.initialFormData.comment,
    // });
  }
  ngOnInit(): void {}

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    //console.log(this.profileForm.value);
    this.sendFormData();
  }

  showFormData() {
    this.formService.getFormData().subscribe((data: Form_Data) =>
      this.profileForm.patchValue({
        Name: data.name,
        Email: data.email,
        feedback: data.feedback,
        Comments: data.comment,
      })
    );
  }

  sendFormData() {
    // console.log('hi');
    // var jsonData = {
    //   name: this.profileForm.controls.Name,
    //   email: this.profileForm.controls.Email,
    //   feedback: this.profileForm.controls.feedback,
    //   comment: this.profileForm.controls.Comments,
    // };
    // var formData: any = new FormData();
    // Object.keys(jsonData).forEach((key) => {
    //   formData.append(key, jsonData[key]);
    // });
    const contactdetails: JSON = <JSON>(<unknown>{
      name: this.profileForm.value.Name,
      email: this.profileForm.value.Email,
      feedback: this.profileForm.value.feedback,
      comment: this.profileForm.value.Comment,
    });
    this.formService.postFormData(contactdetails).subscribe(
      (data) => {
        console.log('Form submitted successfully');
        alert('Form Submitted Successfully');
        this.profileForm.patchValue({
          Name: '',
          Email: '',
          feedback: '',
          Comments: '',
        });
      },
      (error: HttpErrorResponse) => {
        alert('Form Submission Failed');
        console.log(error);
      }
    );
  }
}
