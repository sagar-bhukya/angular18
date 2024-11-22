import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, Employee } from '../../model/class/interface/role';
import { Client } from '../../model/class/Client';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {

  //creating reactive forms
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("", [Validators.required,Validators.minLength(4)]),
    startDate: new FormControl("", [Validators.required]),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl("", [Validators.required]),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl("", [Validators.pattern(/^\d{10}$/)]),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl("", [Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl("", [Validators.email]),
    clientId: new FormControl("", [Validators.required]),
  });
  // this need to bind it on html


  clientService=inject(ClientService);// from this we are calling apis

  employeeList: Employee []=[];
  clientList:Client[]=[];
  ngOnInit(): void {
    this.getAllClient();
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.clientService.GetAllEmployee().subscribe((res:APIResponseModel)=>{
      this.employeeList=res.data;
    })
  }
  getAllClient(){
    this.clientService.GetAllClients().subscribe((res:APIResponseModel)=>{
      this.clientList=res.data;
    })
  }

  onSaveProject(){
    const formValue=this.projectForm.value;// Extract values from the FormGroup
    debugger;
    this.clientService.addClientProjectUpdate(formValue).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert('project created successfully')
      }
      else{
        alert(res.message)
      }
    })

  }

}
