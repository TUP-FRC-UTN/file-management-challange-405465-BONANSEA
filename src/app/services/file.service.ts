import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FILE_LIST, OWNERS } from '../../data/file.storage';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private lstFiles = FILE_LIST;
  private lstFileTypes = FileType;
  private lstOwners = OWNERS;

  private fileSource = new BehaviorSubject<FileItem[]>(this.lstFiles);

  //esto es un observable, sirve para que los componentes que esten suscritos a el se actualicen cuando cambie
  //es como el onChange pero de angular, se usa para que los componentes se actualicen cuando cambie la lista de archivos
  //entonces cuando se agrega un archivo se llama a fileSource.next(this.lstFiles); y todos los componentes que esten suscritos a el se actualizan
  files = this.fileSource.asObservable();

  getFiles() {
    return this.files;
  }

  getFileTypes() {
    return this.lstFileTypes;
  }

  getOwners() {
    return this.lstOwners;
  }

  addFile(file: FileItem) {
    this.lstFiles.push(file);
    this.fileSource.next(this.lstFiles);
  }

  addOwner(owner: FileOwner) {
    this.lstOwners.push(owner);
  }

  deleteFile(file: FileItem) {
    this.lstFiles = this.lstFiles.filter(f => f.id !== file.id);
    this.fileSource.next(this.lstFiles);
  }
}