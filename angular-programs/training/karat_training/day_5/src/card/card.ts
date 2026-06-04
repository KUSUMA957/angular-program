import { Component } from '@angular/core';
import {
 AfterContentChecked,
 AfterContentInit,
  DoCheck,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, DoCheck, OnDestroy{
  contentcheck_count = 0;
  viewcheck_count = 0;
  changeDetectionCount = 0;
  @ViewChild('inputBox') input!: ElementRef;
  constructor() {
    console.log('Constructor');
  }
  ngOnInit(): void {
    console.log('ngOnInit');
  }
  ngDoCheck(): void {
    this.changeDetectionCount++;
    console.log('ngDoCheck:', this.changeDetectionCount);
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');

  }
  ngAfterContentChecked(): void {
    //this.contentcheck_count++;
     //console.log('ngAfterContentInit check: ', this.contentcheck_count);
     console.log('ngAfterContentInit check: ');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.input.nativeElement.focus();
  }
  ngAfterViewChecked(): void {
    //this.viewcheck_count++;
    //console.log('ngAfterViewChecked: ', this.viewcheck_count);
    console.log('ngAfterViewChecked: ');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

}
