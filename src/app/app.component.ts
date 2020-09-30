import { Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  update: boolean = false;
  joke: any;

  constructor(updates: SwUpdate, private data: DataService, private swPush: SwPush) {
    updates.available.subscribe(event => {

      //this.update = true;
      updates.activateUpdate().then(() => document.location.reload());

    })
  }

  ngOnInit() {
    this.data.gimmeJokes().subscribe(res => {
      this.joke = res;
    })

    this.swPush.messages.subscribe(message => {
      console.log(message);
    })
    
  }

}
