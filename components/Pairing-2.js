// pairing.js
// An almost line-to-line translation of Jared's code :)

/* start of db-calls.py*/
/* constants */
const PLAYER_PAUSED = 0;
const PLAYER_ACTIVE = 1;

/* tables */
let tournament_register = {};
let match_register = {};
let school_register = {};
let player_register = {};

let tournament_register_id = 0;
let match_register_id = 0;
let school_register_id = 0;
let player_register_id = 0;

/* access functions */
function insert_school(school_name, school_state, school_district) {
    // Insert school object
    // Update current school_register id
    school_register[school_register_id++] = {
        school_name: school_name,
        school_state: school_state,
        school_district: school_district,
    };
}

function insert_player(player_firstname, player_lastname, school_index, rating) {
    // Insert player object
    // Update current player_register id

    // TODO: Check if Jared's code does this as well?
    // Account for inserting with rating
    // Defaults to 0
    let r = rating;
    if (!r) { r = 0; }

    player_register[player_register_id++] = {
        first_name: player_firstname,
        last_name: player_lastname,
        rating: r,
        status: PLAYER_ACTIVE,
        school_index: school_index,
    };
}

function remove_player(player_index) {
    // Remove the index and its key from the player_register
    delete player_register[player_index];
}

function pause_player(player_index) {
    // Set player status to the player paused flag
    player_register[player_index].player_status = PLAYER_PAUSED;
}

function unpause_player(player_index) {
    // Set player status to the player actve flag
    player_register[player_index].player_status = PLAYER_ACTIVE;
}

function insert_tournament(tournament_code, tournament_location, tournament_name, tournament_date, round_total) {
    // Insert tournament object
    // Update current tournament register id
    tournament_register[tournament_register_id++] = {
        tournament_code: tournament_code,
        tournament_location: tournament_location,
        tournament_name: tournament_name,
        tournament_date: tournament_date,
        tournament_players: [],
        round_total: round_total,
        round_completed: 0,
    };
}

// Note: slight change from Jared's code, renamed white_index to white_player_index and black_index to black_player_index for better readability 
function insert_match(tournament_index, round_value, white_player_index, black_player_index) {
    // Insert match object
    // Update current match register id
    match_register[match_register_id++] = {
        tournament_index: tournament_index,
        round_value: round_value,
        white_player_index: white_player_index,
        black_player_index: black_player_index,
        win_index: null, // Index to player who won the match
        loss_index: null, // Index to player who lost the match
        tie_match: false,
        bye_match: false,
        match_complete: false,
    };
}

// TODO: rename
function update_tournament_players(tournament_index, player_index) {
    // Get the list of players in a tournament and add a player
    tournament_register[tournament_index].tournament_players.push(player_index);
}

function update_match(match_index, win_index, loss_index) {
    if (win_index === -1 && loss_index === -1) {
        // If both indexes are not given, then the match is a tie
        match_register[match_index].tie_match = true;
        match_register[match_index].match_complete = true;
    } else if (win_index !== -1 && loss - index !== -1) {
        // If both indexes are given, then update like normal
        match_register[match_index].win_index = win_index;
        match_register[match_index].loss_index = loss_index;
    }
}

function update_match_bye(match_index) {
    // Set a match to be a bye
    match_register[match_index].bye_match = true;
    match_register[match_index].match_complete = true;
}

function update_tournament_round(tournament_index, current_round) {
    tournament_register[tournament_index].round_completed = current_round;
}

function get_unfinished_matches() {
    let unfinished_matches = [];

    // Loop over the entire match_register
    for (let match_index of Object.keys(match_register)) {
        // Add the index, white player and black player if the match is not complete
        if (!(match_register[match_index].match_complete)) {
            let match = match_register[match_index];

            unfinished_matches.push({
                index: match_index,
                white: match.white_player_index,
                black: match.black_player_index,
            });
        }
    }

    return unfinished_matches;
}

function get_school_index(school_name) {
    // Find the school with the matching name
    for (let school_index of Object.keys(school_register)) {
        if (school_register[school_index].school_name === school_name) {
            return school_index;
        }
    }

    throw new Error('Could not find school: "' + school_name + '"');
}

function get_school_name(school_index) {
    return school_register[school_index].school_name;
}

function get_tournament_index(tournament_name) {
    // Find the tournament with the matching name
    for (let tournament_index of Object.keys(tournament_register)) {
        if (tournament_register[tournament_index].tournament_name === tournament_name) {
            return tournament_index;
        }
    }

    throw new Error('Could not find tournament: "' + tournament_name + '"');
}

function get_player_index(first_name, last_name) {
    // Find the player with the matching first name and last name
    // Player names MUST be unique
    for (let player_index of Object.keys(player_register)) {
        if (player_register[player_index].first_name === first_name && player_register[player_index].last_name === last_name) {
            return player_index;
        }
    }

    throw new Error('Could not find player: "' + first_name + ' ' + last_name + '"');
}

function get_player_info(player_index) {
    // Return the entire player object
    return player_register[player_index];
}

function get_round_info(tournament_index) {
    // Return tournament round data
    // TODO: Maybe return entiere tournament object?

    let tournament = tournament_register[tournament_index];
    return {
        round_total: tournament.round_total,
        round_completed: tournament.round_completed,
    }
}

function get_round_matches(tournament_index, round_value) {
    // Return all matches in one tournament round
    // Rewritten to make more sense with js object based structure

    let matches = [];

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.tournament_index === tournament_index && match.round_value === round_value) {
            matches.push({
                match_index: match_index,
                match_data: match,
            });
        }
    }

    let round_matches = {};

    for (let match of matches) {
        let white_player = get_player_info(match.match_data.white_player_index);
        let white_school_name = get_school_name(white_player.school_index);
        let white_str = white_player.first_name + ' ' + white_player.last_name + ', ' + white_school_name;
        let black_player = get_player_info(match.match_data.black_player_index);
        let black_school_name = get_school_name(black_player.school_index);
        let black_str = black_player.first_name + ' ' + black_player.last_name + ', ' + black_school_name;

        if (match.match_data.win_index == match.match_data.white_player_index) {
            // White player won
            white_str += ' (win)';
            black_str += ' (loss)';
        } else if (match.match_data.win_index == match.match_data.black_player_index) {
            // Black player won
            white_str += ' (loss)';
            black_str += ' (win)';
        } else if (match.match_data.tie_match) {
            white_str += ' (tie)';
            black_str += ' (tie)';
        } else if (match.match_data.bye_match) {
            white_str += ' (bye)';
            black_str += ' (bye)';
        }

        round_matches[match.match_index] = {
            index: match.match_index,
            white: white_str,
            black: black_str,
            white_pn: match.match_data.white_player_index,
            black_pn: match.match_data.black_player_index,
        }
    }

    return round_matches;
}

function get_player_black(tournament_index, player_index) {
    // The number of times a player has played black
    let black = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.tournament_index === tournament_index && match.black_player_index === player_index) {
            black++;
        }
    }

    return black;
}

function get_player_white(tournament_index, player_index) {
    // The number of times a player has played white
    let white = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.tournament_index === tournament_index && match.white_player_index === player_index) {
            white++;
        }
    }

    return white;
}

function get_player_wins(tournament_index, player_index) {
    // The number of times a player has won in a tournament
    let wins = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.tournament_index === tournament_index && match.win_index === player_index) {
            wins++;
        }
    }

    return wins;
}

function get_player_loss(tournament_index, player_index) {
    // The number of times a player has lost in a tournament
    let losses = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.tournament_index === tournament_index && match.loss_index === player_index) {
            losses++;
        }
    }

    return losses;
}

// TODO: refactor asap
function get_player_ties(tournament_index, player_index) {
    // The number of times a player has tied in a tournament
    let ties = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.tournament_index === tournament_index && (match.black_player_index === player_index || match.white_player_index === player_index) && match.tie_match) {
            ties++;
        }
    }

    return ties;
}

function get_player_byes(tournament_index, player_index) {
    // The number of times a player has gotten a bye in a tournament
    let byes = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.tournament_index === tournament_index && (match.black_player_index === player_index || match.white_player_index === player_index) && match.bye_match) {
            byes++;
        }
    }

    return byes;
}

// TODO: why is this defined after?
function get_player_matches(tournament_index, player_index) {
    // All matches a player has played in a tournament
    let matches = [];

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.tournament_index === tournament_index && (match.black_player_index === player_index || match.white_player_index === player_index)) {
            matches.push({
                match_index: match_index,
                match_data: match,
            });
        }
    }

    return matches;
}

function get_tournament_players(tournament_index) {
    // All players in a tournament
    return tournament_register[tournament_index].tournament_players;
}

function get_players() {
    // All players
    let players = {};

    for (let player_index of Object.keys(player_register)) {
        let player = player_register[player_index];
        // Reorganized list into object for better readability
        players[player_index] = {
            first_name: player.first_name,
            last_name: player.last_name,
            school_name: get_school_name(player.school_index),
            status: player.status,
        }
    }

    return players;
}

function get_schools() {
    // Return all schools in the school register
    let schools = {};

    for (let school_index of Object.keys(school_register)) {
        schools[school_index] = school_name;
    }

    return schools;
}

function db_calls_test_populate() {
    let ss = [
        ['AVHS', 'CO', 'DCSD'],
        ['BVHS', 'CO', 'DCSD'],
        ['CVHS', 'CO', 'DCSD'],
        ['DVHS', 'CO', 'DCSD'],
        ['EVHS', 'CO', 'DCSD'],
        ['FVHS', 'CO', 'DCSD']
    ];

    for (let xx of ss) {
        insert_school(xx[0], xx[1], xx[2]);
    }

    let pps = [
        ['Bob', 'Smith1', 1], ['Bob', 'Smit1h', 1], ['Bob', 'Smi1th', 1],
        ['Bob', 'Smith2', 2], ['Bob', 'Smit2h', 2], ['Bob', 'Smi2th', 2],
        ['Bob', 'Smith3', 3], ['Bob', 'Smit3h', 3], ['Bob', 'Smi3th', 3],
        ['Bob', 'Smith4', 4], ['Bob', 'Smit4h', 4], ['Bob', 'Smi4th', 4],
        ['Bob', 'Smith5', 5], ['Bob', 'Smit5h', 5], ['Bob', 'Smi5th', 5],
        ['Bob', 'Smith6', 6], ['Bob', 'Smit6h', 6], ['Bob', 'Smi6th', 6]
    ]

    for (let pp of pps) {
        insert_player(pp[0], pp[1], pp[2] - 1);
    }

    let tt = ['1234', 'RVHS', 'state', '2022-05-04', 5];

    insert_tournament(tt[0], tt[1], tt[2], tt[3], tt[4]);

    //console.log(player_register);
    //console.log(school_register);
    //console.log(tournament_register);

    update_tournament_players(0, 2); // should add Bob Smi1th
    //console.log(get_tournament_players(0));
    //console.log(get_player_info(get_tournament_players(0)[0]));
}

/* end of db_calls.py */

/* start of chess_ui.py */
// This is not a direct translation
// chess_ui.py was directed towards a terminal based approach towards user input
// Significant changes have been made...

function read_players_db(tournament_index) {
    let players = {};
    let schools = {};
    let players_list = get_players();

    for (let player_index of Object.keys(players_list)) {
        let player = players_list[player_index];

        if (player.status !== PLAYER_ACTIVE) {
            continue;
        }

        // TODO: change draw to ties or ties to draw for consistency

        player_dict = {
            index: player_index,
            first: player.first_name,
            last: player.last_name,
            school: player.school_name,
            rank: 0,
            matches: [],
            record: {
                win: get_player_wins(tournament_index, player_index),
                loss: get_player_loss(tournament_index, player_index),
                bye: get_player_byes(tournament_index, player_index),
                draw: get_player_ties(tournament_index, player_index),
                black: get_player_black(tournament_index, player_index),
                white: get_player_white(tournament_index, player_index),
            },
        };

        let matches = get_player_matches(tournament_index, player_index);

        for (let match of matches) {
            let opponent = null;
            let color = null;
            let result = null;

            if (player_index == match.match_data.white_player_index) {
                color = 'white';
                opponent = match.match_data.black_player_index;
            } else {
                color = 'black';
                opponent = match.match_data.white_player_index;
            }

            if (player_index == match.match_data.win_index) {
                result = 'win';
            } else {
                result = 'loss';
            }

            let match_dict = {
                round: match.match_data.round,
                match: match_index,
                player: player_index,
                opponent: opponent,
                color: color,
                result: result,
            };

            player_dict.matches.push(match_dict);
        }

        players[player_index] = player_dict;
    }

    return players;
}

/* end of chess_ui.py */

db_calls_test_populate();
console.log(read_players_db(0));