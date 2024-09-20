import { Component, inject } from '@angular/core';
import { FileService } from '../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileItem, FileOwner } from '../../models/file.item.model';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-list',
  standalone: true,
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
  imports: [MatSnackBarModule, CommonModule], // Importar Angular Material Snackbar
})
export class FileListComponent {
  private fileService = inject(FileService);

  files = this.fileService.getFiles();
  selectedFiles: FileItem[] = [];

  constructor(private snackBar: MatSnackBar) {}

  toggleSelection(file: FileItem) {
    const index = this.selectedFiles.indexOf(file);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    } else {
      this.selectedFiles.push(file);
    }
  }

  deleteFile(file: FileItem) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este archivo?');
    if (confirmDelete) {
      this.fileService.deleteFile(file);
      this.snackBar.open('Archivo eliminado', 'Cerrar', {
        duration: 2000,
      });
    }
  }

  deleteSelectedFiles() {
    if (this.selectedFiles.length > 0) {
      const confirmDelete = confirm('¿Estás seguro de que deseas eliminar los archivos seleccionados?');
      if (confirmDelete) {
        this.selectedFiles.forEach(file => this.fileService.deleteFile(file));
        this.snackBar.open('Archivos eliminados', 'Cerrar', {
          duration: 2000,
        });
        this.selectedFiles = [];
      }
    } else {
      this.snackBar.open('No hay archivos seleccionados', 'Cerrar', {
        duration: 2000,
      });
    }
  }

  getOwnerAvatars(owners: FileOwner[]): string[] {
    return owners.map(owner => owner.avatarUrl);
  }
}