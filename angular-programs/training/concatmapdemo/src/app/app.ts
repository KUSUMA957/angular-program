import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from, of } from 'rxjs';
import { concatMap, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('concatmapdemo');
  
  // Files with their content
  files = [
    { name: 'file1.txt', content: 'This is the first file containing user data.' },
    { name: 'file2.txt', content: 'This is the second file with application logs.' },
    { name: 'file3.txt', content: 'This is the third file storing configuration settings.' }
  ];
  
  uploadLogs = signal<string[]>([]);
  isUploading = signal(false);

  startUpload() {
    this.isUploading.set(true);
    this.uploadLogs.set([]);
    
    from(this.files)
      .pipe(
        concatMap(file => this.uploadFile(file.name, file.content))
      )
      .subscribe({
        next: (result) => {
          this.addLog(result);
        },
        complete: () => {
          this.addLog('All files uploaded successfully! ✅');
          this.isUploading.set(false);
        },
        error: (err) => {
          this.addLog(`Error: ${err}`);
          this.isUploading.set(false);
        }
      });
  }

  private uploadFile(fileName: string, content: string) {
    const uploadTime = Math.floor(Math.random() * 1000) + 1000; // Random 1-2 seconds
    const fileSize = new Blob([content]).size;
    
    this.addLog(`Starting upload: ${fileName} (${fileSize} bytes)...`);
    console.log(`Starting upload: ${fileName}`);
    console.log(`Content: "${content}"`);
    console.log(`Size: ${fileSize} bytes`);
    
    return of({ fileName, content, fileSize }).pipe(
      delay(uploadTime),
      tap(() => {
        const message = `✓ Completed: ${fileName} - ${fileSize} bytes (${uploadTime}ms)`;
        console.log(message);
        console.log('---');
      })
    );
  }

  private addLog(message: string) {
    this.uploadLogs.update(logs => [...logs, message]);
  }
}
