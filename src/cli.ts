import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AbstractListTeamsPort } from './applications/ports/in/list-teams.port.js';
import { AbstractListMatchsPort } from './applications/ports/in/list-matchs.port.js';
import { AbstractListMatchByTeamPort } from './applications/ports/in/list-match-by-team.port.js';
import { ListMatchByTeamQuery } from './applications/usecases/list-match-by-team/list-match-by-team.query.js';
import { Match } from './domains/match.entity.js';
import { Team } from './domains/team.entity.js';
// @ts-ignore
import { select } from '@inquirer/prompts';

function displayTeams(teams: Team[]): void {
  teams.map((team) => {
    console.log(team.label);
  });
}

function displayMatches(matches: Match[]): void {
  matches.map((match) => {
    console.log(match);
  });
}

async function main(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const listTeamsHandler = app.get(AbstractListTeamsPort);
  const listMatchsHandler = app.get(AbstractListMatchsPort);
  const listMatchsByTeamHandler = app.get(AbstractListMatchByTeamPort);

  let running = true;

  while (running) {
    const choice = await select({
      message: 'Que souhaitez-vous consulter ?',
      choices: [
        { name: 'Equipes', value: 'teams' },
        {
          name: 'Equipe',
          value: 'matchByTeam',
        },
        { name: 'Matchs', value: 'matchs' },
        { name: 'Quitter', value: 'quit' },
      ],
    });

    switch (choice) {
      case 'matchs': {
        const matchs = await listMatchsHandler.execute();
        displayMatches(matchs);
        break;
      }

      case 'teams': {
        const teams = await listTeamsHandler.execute();
        displayTeams(teams);
        break;
      }

      case 'matchByTeam': {
        const teams = await listTeamsHandler.execute();
        const teamName = await select({
          message: 'Sélectionnez une équipe :',
          choices: teams.map((t) => ({ name: t.label, value: t.label })),
        });

        const query = new ListMatchByTeamQuery(teamName);
        const matchs = await listMatchsByTeamHandler.execute(query);
        displayMatches(matchs);
        break;
      }

      case 'quit': {
        running = false;
        console.log('Au revoir !');
        break;
      }
    }
  }

  await app.close();
}

main().catch(console.error);
