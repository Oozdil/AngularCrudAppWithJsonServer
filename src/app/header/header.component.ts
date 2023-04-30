import { Component, EventEmitter, Output } from '@angular/core';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() eventChange = new EventEmitter<Event>();

  onClick(event: Event) {
    this.eventChange.emit(event);
  }
}
