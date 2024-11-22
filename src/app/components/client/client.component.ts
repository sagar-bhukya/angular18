// import { Component,inject,OnInit } from '@angular/core';
// import { Client } from '../../model/class/Client';
// import { FormsModule } from '@angular/forms';
// import { ClientService } from '../../services/client.service';
// import { APIResponseModel } from '../../model/class/interface/role';

// @Component({
//   selector: 'app-client',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './client.component.html',
//   styleUrl: './client.component.css'
// })
// export class ClientComponent implements OnInit {

//   clientObj: Client =new Client(); // create new object then only our constructor excuted
//   // clientObj bind to the html of client
//   clientList: Client[]=[];

//   clientService=inject(ClientService);
//   ngOnInit(): void {
//     this.loadClient();
//   }

//   loadClient(){
//     this.clientService.GetAllClients().subscribe((res:APIResponseModel)=>{
//       this.clientList= res.data;
//     })
//   }
//   onSaveClient(){
//     this.clientService.addUpdate(this.clientObj).subscribe((res:APIResponseModel)=>{
//       if (res.result) {
//         alert("client create success");
//         this.loadClient();
//         this.clientObj=new Client(); // it will call the constrictor and it will re initialise all the fields
//       } else {
//         alert(res.message);
//       }

//     })
//   }

//   onDelete(id:number){

//     const isDelete =confirm("Are you sure want delete")
//     if(isDelete){
//       this.clientService.deleteClientById(id).subscribe((res:APIResponseModel)=>{
//         if (res.result) {
//           alert("client Delete success");
//           this.loadClient();
//         } else {
//           alert(res.message);
//         }
  
//       })
//     }

//   }
// }







import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/class/interface/role';
import { DatePipe, JsonPipe, UpperCasePipe,AsyncPipe} from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule,UpperCasePipe,DatePipe,JsonPipe,AsyncPipe],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'] // Fixed typo
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client(); // Initialize a new client object
  clientList: Client[] = [];

  clientService = inject(ClientService);
  curDate:Date = new Date();
  

  userList$:Observable<any> = new Observable();            //observable creation $
  ngOnInit(): void {
    this.loadClients();
    this.userList$ =this.clientService.getAllUsers(); // this observable can directly subscribe to the html
  }

  loadClients() {
    this.clientService.GetAllClients().subscribe((res: APIResponseModel) => {
      if (res.result) {
        this.clientList = res.data;
      } else {
        alert('Failed to fetch clients: ' + res.message);
      }
    });
  }

  onSaveClient() {
    if (this.validateClient()) {
      this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Client saved successfully');
          this.loadClients();
          this.resetClient();
        } else {
          alert('Error: ' + res.message);
        }
      });
    }
  }

  onEdit(data:Client){
    this.clientObj=data;
  }

  onDelete(id: number) {
    if (!id) {
      alert("Invalid client ID.");
      return;
    }
  
    const isDelete = confirm("Are you sure you want to delete this client?");
    if (isDelete) {
      this.clientService.deleteClientById(id).subscribe(
        (res: APIResponseModel) => {
          if (res.result) {
            alert("Client deleted successfully");
            this.loadClients();
          } else {
            alert(`Failed to delete client: ${res.message}`);
          }
        },
        (error) => {
          alert("An error occurred while deleting the client. Please try again.");
          console.error(error);
        }
      );
    }
  }
  

  resetClient() {
    this.clientObj = new Client(); // Reset to a new Client object
  }

  validateClient(): boolean {
    if (!this.clientObj.contactPersonName || !this.clientObj.contactNo) {
      alert('Contact Person Name and Contact Number are mandatory!');
      return false;
    }
    if (!/^\d{10}$/.test(this.clientObj.contactNo)) {
      alert('Contact Number must be 10 digits');
      return false;
    }
    return true;
  }
}
