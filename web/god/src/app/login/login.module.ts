import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { AuthService } from './service/auth.service';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [AuthService],
    declarations: [LoginComponent]
})
export class LoginModule {}
