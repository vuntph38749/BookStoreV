import { Component } from '@angular/core';
import { InforUser } from 'src/common/inforUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obj:InforUser = {
    name: "Nguyen Turng Duc"
  }
  title=''
}
