var competition = require( "./competitionAPI" );
var permissions = require( "../permissions" );
var passport = require( "passport" );


exports.assignRoutes = function ( app ) {
	app.get( "/competitions/:competitionID/teams/:teamID/players/:playerID/stats", competition.getCompetitionPlayerStatsByCompetitionTeamAndPlayer );
	app.get( "/competitions/:competitionID/teams/:teamID/stats", competition.getCompetitionTeamStatsByCompetitionAndTeam );
	app.get( "/competitions/:competitionID/teams/:teamID/next-games", competition.getNextTeamGamesInCompetition );
	app.get( "/competitions/:competitionID/teams/:teamID/prev-games", competition.getPrevTeamGamesInCompetition );
	app.get( "/competitions/:competitionID/fixture/:fixtureNumber", competition.getGamesByCompetitionAndFixture );
	app.post( "/competitions/:competitionID/games/:gameID/start", competition.startGame );
	app.post( "/competitions/:competitionID/games/:gameID/event", competition.createGameEvent );
	app.get( "/competitions/:competitionID/games/:gameID", competition.getFullGameById );
	app.put( "/competitions/:competitionID/games/:gameID", passport.authenticate( 'jwt' ), competition.updateGameTimeAndLocation );
	app.get( "/competitions/:competitionID/all-playoffs/", competition.getAllAvailablePlayoffsRoundsByCompetition );
	app.get( "/competitions/:competitionID/current-fixture", competition.getCurrentFixture );
	app.get( "/competitions/:competitionID/league-table", competition.getCompetitionLeagueTable );
	app.get( "/competitions/:competitionID/unplayed-games", competition.getUnplayedGamesByCompetitionForScheduling );
	app.get( "/competitions/:competitionID", competition.getCompetitionByID );
	app.post( "/competitions", passport.authenticate( 'jwt' ), competition.createCompetition );
	app.get( "/competitions", competition.getCompetitionListByName );
	// app.put( "/competitions/:competitionID", competition.updateCompetition );
	// app.purge( "/competitions/:competitionID", competition.purgeCompetition );
}
