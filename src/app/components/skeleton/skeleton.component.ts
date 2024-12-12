import {Component, input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-skeleton',
  imports: [
    NgStyle
  ],
  standalone: true,
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {
  width = input<number>();
  height = input<number>();
  borderRadius = input<number>();
}
