import { Component, OnInit } from '@angular/core';
import { LocaStoreService } from 'src/app/services/localStore/loca-store.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any; // Đảm bảo bạn có dữ liệu người dùng từ service hoặc nơi khác

  constructor(private LocaStoreService: LocaStoreService) { }

  ngOnInit(): void {
    this.LocaStoreService.getStore("userInfor").subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
