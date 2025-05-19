import { Injectable, signal } from '@angular/core';

export interface FileInfo {
  fileName: string;
  fileExtension: string;
  size: number; // em KB
  base64: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  singleFileBase64 = signal<FileInfo | null>(null);
  multipleFilesBase64 = signal<FileInfo[]>([]);

  get fileValues() {
    return {
      single: this.singleFileBase64(),
      multiple: this.multipleFilesBase64(),
    };
  }

  /**
   * Converte um arquivo para base64
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove o prefixo data:...;base64,
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Upload de arquivo único
   */
  async uploadSingle(file: File) {
    const base64 = await this.fileToBase64(file);
    const fileInfo = this.getFileInfo(file, base64);
    this.singleFileBase64.set(fileInfo);
  }

  /**
   * Upload de múltiplos arquivos
   */
  async uploadMultiple(files: FileList | File[]) {
    const filesArray = Array.from(files);
    const fileInfos: FileInfo[] = [];

    for (const file of filesArray) {
      const base64 = await this.fileToBase64(file);
      fileInfos.push(this.getFileInfo(file, base64));
    }

    this.multipleFilesBase64.set(fileInfos);
  }

  /**
   * Limpa todos os arquivos armazenados
   */
  clear() {
    this.singleFileBase64.set(null);
    this.multipleFilesBase64.set([]);
  }

  /**
   * Extrai nome, extensão e tamanho (em KB)
   */
  private getFileInfo(file: File, base64: string): FileInfo {
    const lastDot = file.name.lastIndexOf('.');
    const fileName = file.name.substring(0, lastDot);
    const fileExtension = file.name.substring(lastDot + 1);
    const size = +(file.size / 1024).toFixed(2); // KB

    return { fileName, fileExtension, size, base64 };
  }
}
