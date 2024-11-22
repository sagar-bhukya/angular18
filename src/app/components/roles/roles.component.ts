import { HttpClient } from '@angular/common/http';
import { Component,inject,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRole } from '../../model/class/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {


  
  // roleList:any [] =[];
  roleList:IRole [] =[];
  http=inject(HttpClient)

  ngOnInit(): void {
    this.getAllRoles()
  }


  getAllRoles(){
    this.http.get("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res:any)=>{
      this.roleList=res.data;
    })
  }
























  // /////data types
  // //string,number,boolean,date,object,array,null,undefined
  // firstNmae:string ="Angular Tutorial";
  // angularVersion="version 18";

  // version:number = 10;
  // isActive:boolean = false;

  // currentDate : Date=new Date();// current date

  // inputType:string ="button"; // you can which tag do you want here check,radio,button 
  // selectedState:string='';

  // //create function in typescript 
  // showWelcomeAlert(){
  //   alert("Welcome to Angular Tutorial");
  // }

  // showMessage(message:string){
  //   alert(message)
  // }
}
