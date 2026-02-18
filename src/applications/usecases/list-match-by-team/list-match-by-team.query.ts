export class ListMatchByTeamQuery {
  teamName: string;

  constructor(public readonly _teamName: string) {
    this.teamName = _teamName;
  }
}
