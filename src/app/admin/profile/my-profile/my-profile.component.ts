import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit{

  // breadscrums = [
  //   {
  //     title: 'Admin',
  //     items: ['Öğrenci'],
  //     active: 'Profil Detay',
  //   },
  // ];

  detayVeri?:any;

  constructor(private route: ActivatedRoute,private profileService:ProfileService) { }

  ngOnInit(): any {
    this.getDetayData();
  }


  getDetayData(): void {
    this.profileService.getMyProfile()
      .subscribe(data => {
          console.log("data",data);
          
        this.detayVeri = data;
      });
  }


}
