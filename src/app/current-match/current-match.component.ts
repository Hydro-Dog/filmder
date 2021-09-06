import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  templateUrl: 'current-match.component.html',
  styleUrls: ['current-match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentMatchComponent implements OnInit {
  ngOnInit(): void {}
}
