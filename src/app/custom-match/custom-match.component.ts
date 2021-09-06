import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  templateUrl: 'custom-match.component.html',
  styleUrls: ['custom-match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMatchComponent implements OnInit {
  ngOnInit(): void {}
}
