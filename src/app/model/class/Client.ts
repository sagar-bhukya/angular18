export class Client {

    clientId: number;
    contactPersonName: string;
    companyName: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    EmployeeStrength: number;
    gstNo: string;
    contactNo: string;
    regNo: string;

    constructor(){
        this.clientId=0;
        this.contactPersonName='';
        this.address='';
        this.city='';
        this.companyName='';
        this.gstNo='';
        this.pincode='';
        this.contactNo='';
        this.state='';
        this.EmployeeStrength=0;
        this.regNo='';
    }
}