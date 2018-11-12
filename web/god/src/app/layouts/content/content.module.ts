import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [
        CommonModule,
        ContentRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [ContentComponent, SidebarComponent, HeaderComponent]
})
export class ContentModule {}
