import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../all-students/students.service';

@Component({
  selector: 'app-about-student',
  templateUrl: './about-student.component.html',
  styleUrls: ['./about-student.component.scss'],
})
export class AboutStudentComponent implements OnInit{

  // breadscrums = [
  //   {
  //     title: 'Admin',
  //     items: ['Öğrenci'],
  //     active: 'Profil Detay',
  //   },
  // ];

  studentId?: any;
  detayVeri?:any;

  constructor(private route: ActivatedRoute,private studentService:StudentsService) { }

  ngOnInit(): any {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.getDetayData();
  }


  getDetayData(): void {
    this.studentService.getStudentInfoById(this.studentId)
      .subscribe(data => {
        this.detayVeri = data.StudentInfo;
        console.log("this.detayVeri",this.detayVeri);
      });
  }


}
