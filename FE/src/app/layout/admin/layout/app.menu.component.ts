import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Trang chủ',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/dashboard'] }
                ]
            },
            {
                label: 'Quản lý',
                items: [
                    { label: 'Sản phẩm', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/managementProduct'] },
                    { label: 'Phân loại', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/managementCategories'] },
                    { label: 'Đánh giá', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/managementFeedbacks'] },
                    { label: 'Người dùng', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/managementUsers'] },
                ]
            },
        ];
    }
}
