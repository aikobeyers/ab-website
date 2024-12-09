import { Routes } from '@angular/router';
import {
  SecretMessageDisplayPageComponent
} from "./containers/secret-message-display-page/secret-message-display-page.component";
import {
  SecretMessageConfigPageComponent
} from "./containers/secret-message-config-page/secret-message-config-page.component";

export const routes: Routes = [
  {
    path:'you/should/not/look/here',
    component: SecretMessageDisplayPageComponent
  },
  {
    path: 'you/should/not',
    component: SecretMessageConfigPageComponent
  }
];
