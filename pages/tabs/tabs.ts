import { Component } from '@angular/core';

import { Monitoring } from '../monitoring/monitoring';
import { Controlling } from '../controlling/controlling';
import { Blindspot } from '../blindspot/blindspot';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Controlling;
  tab2Root = Monitoring;
  tab3Root = Blindspot;
  constructor() {

  }
}
