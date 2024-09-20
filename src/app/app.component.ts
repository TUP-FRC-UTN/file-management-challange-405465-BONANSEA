import { Component } from '@angular/core';
import { NewFileComponent } from './new-file/new-file.component';
import { FileListComponent } from './file-list/file-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NewFileComponent, FileListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Aplicación';
}
