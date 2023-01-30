import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisComponent } from './avis/avis.component';
import { CaminvComponent } from './caminv/caminv.component';
import { PubavisComponent } from './pubavis/pubavis.component';
import { ScaminvComponent } from './scaminv/scaminv.component';

const routes: Routes = [];

@NgModule({
  imports: [
       //RouterModule.forChild(routes)
       RouterModule.forRoot(
        [

        ]
      )
  ],
  exports: [RouterModule]
})
export class SelectionRoutingModule { }
