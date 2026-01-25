import { Routes } from '@angular/router';
import {
  SecretMessageDisplayPageComponent
} from "./containers/secret-message-display-page/secret-message-display-page.component";
import {
  SecretMessageConfigPageComponent
} from "./containers/secret-message-config-page/secret-message-config-page.component";
import {TokenResolverService} from "./services/token-resolver.service";
import { TdQuotesOverviewComponent } from './containers/td/td-quotes-overview/td-quotes-overview.component';

export const routes: Routes = [
  {
    path:'you/should/not/look/here',
    component: SecretMessageDisplayPageComponent
  },
  {
    path: 'you/should/not',
    component: SecretMessageConfigPageComponent,
    resolve: { isWindowReloadedWhenLoggedIn: TokenResolverService }
  },
  {
    path: 'td/quotes',
    component: TdQuotesOverviewComponent
  },
  {
    path: '**',
    redirectTo: 'you/should/not/look/here',
  }
];
