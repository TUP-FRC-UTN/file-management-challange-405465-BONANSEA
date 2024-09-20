import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';
import { FileService } from '../services/file.service';
 
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';

@Component({
  selector: 'app-new-file',
  standalone: true,
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.css'],
  imports: [FormsModule],
})
export class NewFileComponent {
  
  private fileService = inject(FileService);

   fileTypes = FileType;
   owners = this.fileService.getOwners();
  file: FileItem = {
    id: (Math.floor(Math.random() * 100) + 1).toString(),
    name: '',
    creation: new Date(),
    type: FileType.FILE,
    owners: [],
  };
 
 addOwner(owner: FileOwner) {
    if (!this.file.owners.includes(owner)) {
     this.fileService.addOwner(owner);
    }
  }
 
  addFile(form:NgForm)
  {
    const file = {...this.file};
    this.fileService.addFile(file);
    console.log(file);
    form.resetForm();
  }





}