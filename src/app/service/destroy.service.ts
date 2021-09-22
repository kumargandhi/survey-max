/**
 * Created by Kumar on 22/09/2021
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
  public ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}

