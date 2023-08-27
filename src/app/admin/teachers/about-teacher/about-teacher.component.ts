import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../all-teachers/teacher.service';

@Component({
  selector: 'app-about-teacher',
  templateUrl: './about-teacher.component.html',
  styleUrls: ['./about-teacher.component.scss'],
})
export class AboutTeacherComponent implements OnInit{

  // breadscrums = [
  //   {
  //     title: 'Admin',
  //     items: ['Öğrenci'],
  //     active: 'Profil Detay',
  //   },
  // ];

  expertId?: any;
  detayVeri?:any;

  constructor(private route: ActivatedRoute,private teacherService:TeacherService) { }

  ngOnInit(): any {
    this.expertId = this.route.snapshot.paramMap.get('id');
    this.getDetayData();
  }


  getDetayData(): void {
    this.teacherService.getTeacherInfoById(this.expertId)
      .subscribe(data => {
        this.detayVeri = data;
      });
  }


}
