import { Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClientComponent } from './components/client/client.component';
import { DesignationComponent } from './components/designation/designation.component';
import { RolesComponent } from './components/roles/roles.component';
import { ClientProjectComponent } from './components/client-project/client-project.component';

export const routes: Routes = [

    {
        path:'',//if its empty 
        redirectTo:'master',//redirect to the master
        pathMatch:'full'//// Match only when the full URL path is empty
    },
    {
        path:'master',
        component:MasterComponent
    },
    {
        path:'employee',
        component:EmployeeComponent
    },
    {
        path:'client',
        component:ClientComponent
    },
    {
        path:'client-project',
        component:ClientProjectComponent
    },
    // {
    //     path:'designation',
    //     component:DesignationComponent
    // },
    // {
    //     path:'roles',
    //     component:RolesComponent
    // }
];
