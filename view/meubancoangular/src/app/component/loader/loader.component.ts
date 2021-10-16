import { Component, Injectable, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
@Injectable({
  providedIn: 'root'
})
export class LoaderComponent implements OnInit {

  count = 0;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
  }

  show() {
    this.count++;
    this.spinner.show();
  }

  hide() {
    this.count--;
    if (this.count === 0) {
      this.spinner.hide();
    }
  }

}
