import { Component, OnInit } from '@angular/core';
import { NavigationManagerService } from '@app/core/navigation-manager.service';
import { Crumb } from '@app/model/crumb';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
