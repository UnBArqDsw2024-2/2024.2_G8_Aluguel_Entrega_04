import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ToastComponent {
  message: string = '';
  isVisible: boolean = false;
  type: 'success' | 'error' = 'success';

  show(message: string, type: 'success' | 'error', duration: number = 3000) {
    this.message = message;
    this.type = type;
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, duration);
  }
}
