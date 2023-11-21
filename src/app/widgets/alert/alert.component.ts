import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
//import { cilCheck } from '@coreui/icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{

  @Input() message: string;
  @Output() onClose = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
