import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { StoreGuard } from './store.guard';

@NgModule({
  imports: [SharedModule],
  declarations: [AuthComponent],
  providers: [AuthService, StoreGuard]
})
export class AuthenticationModule { }
