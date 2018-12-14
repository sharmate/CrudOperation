import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../shared/student.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService, private toastr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.studentService.getStudentList();
  }

  resetForm(form?:NgForm){
    if(form != null)
    form.reset();
    this.studentService.selectedStudent={
      StudentId:null,
      FirstName:'',
      LastName: '',
      StudentCode:'',
      City:''
    }
  }

  onSubmit(form:NgForm){
    if(form.value.StudentId == null){
    this.studentService.postStudent(form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.studentService.getStudentList();
      this.toastr.success('New record Added Successfully','Student Register');
    })
  }else{
    this.studentService.putStudent(form.value.StudentId,form.value)
    .subscribe(data =>{
      this.resetForm(form);
      this.studentService.getStudentList();
      this.toastr.info('Record updated Successfully','Student Register');
    })
  }
  }

  editRecord(stud:Student){
    this.studentService.selectedStudent = Object.assign({}, stud);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?')==true)
     this.studentService.deleteStudent(id)
     .subscribe(x =>{
       this.studentService.getStudentList();
       this.toastr.warning('Record deleted Successfully','Student Register');
     })
  }
}
