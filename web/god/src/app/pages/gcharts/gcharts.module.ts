import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { GchartsRoutingModule } from './gcharts-routing.module';
import { GchartsComponent } from './gcharts.component';
import { PageHeaderModule } from '@shared/index';
import { WebsocketService } from '@shared/services/websocket.service';
import CountryStatFactory from './services/CountryStatFactory'

@NgModule({
    imports: [CommonModule, Ng2GoogleChartsModule, GchartsRoutingModule, PageHeaderModule],
    declarations: [GchartsComponent],
    providers: [WebsocketService],
})
export class GchartsModule {}
