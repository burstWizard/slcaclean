// pairing.js

/* Weighting */
/*
import pkg from 'prompt-sync';
const prompt = pkg({ sigint: true });

console.log("Penalty for giving players high scores on byes  (Currently 2)  (Multiplies based on the player's score)")
const BYE_SCORE_PENALTY = Number.parseInt(prompt("> ")); // Multiplies based on player's score

console.log("Penalty for score differences  (Currently 2)  (Multiplies based on the score difference)")
const POINT_DIFFERENCE_PENALTY = Number.parseInt(prompt("> ")); // Multiplies by the score difference between players

console.log("Penalty for making matches between players of the same school  (Currently 8)")
const SAME_SCHOOL_PENALTY = Number.parseInt(prompt("> "));

console.log("Penalty for making repeat matches  (Currently 12)");
const REPEAT_MATCH_PENALTY = Number.parseInt(prompt("> "));

console.log("Penalty for giving a person a bye twice  (Currently 20)");
const REPEAT_BYE_PENALTY = Number.parseInt(prompt("> "));

console.log('\n\n\n\n\n\n')
*/

const BYE_SCORE_PENALTY = 8; // Multiplies based on player's score
const POINT_DIFFERENCE_PENALTY = 20; // Multiplies by the score difference between players
const SAME_SCHOOL_PENALTY = 32; // 32
const REPEAT_MATCH_PENALTY = Infinity; // 150
const REPEAT_BYE_PENALTY = 100;

/**/

/* start of db-calls.py*/

/* tables */
export let tournament_register = {};
export let match_register = {};
export let school_register = {};
export let player_register = {};

export let tournament_register_id = 0;
export let match_register_id = 0;
export let school_register_id = 0;
export let player_register_id = 0;

/* access functions */
export function insert_school(school_name, school_state, school_district) {
    // Insert school object
    // Update current school_register id
    school_register[school_register_id] = {
        school_name: school_name,
        school_state: school_state,
        school_district: school_district,
    };

    return school_register_id++;
}

/* Allows us to hash strings for unique match making!!!! */
/* https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript */
String.prototype.hashCode = function () {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function insert_player(
    player_firstname,
    player_lastname,
    school_index,
    rating
) {
    // Insert player object
    // Update current player_register id

    // TODO: Check if Jared's code does this as well?
    // Account for inserting with rating
    // Defaults to 0
    let r = rating;
    if (!r) {
        r = 0;
    }

    player_register[player_register_id] = {
        first_name: player_firstname,
        last_name: player_lastname,
        rating: r,
        status: PLAYER_ACTIVE,
        school_index: school_index,
    };

    return player_register_id++;
}

export function remove_player(player_index) {
    // Remove the index and its key from the player_register
    delete player_register[player_index];
}

export function pause_player(player_index) {
    // Set player status to the player paused flag
    player_register[player_index].player_status = PLAYER_PAUSED;
}

export function unpause_player(player_index) {
    // Set player status to the player actve flag
    player_register[player_index].player_status = PLAYER_ACTIVE;
}

export function insert_tournament(
    tournament_code,
    tournament_location,
    tournament_name,
    tournament_date,
    round_total
) {
    // Insert tournament object
    // Update current tournament register id
    tournament_register[tournament_register_id] = {
        tournament_code: tournament_code,
        tournament_location: tournament_location,
        tournament_name: tournament_name,
        tournament_date: tournament_date,
        tournament_players: [],
        round_total: round_total,
        round_completed: 0,
    };

    return tournament_register_id++;
}

/* constants */
const PLAYER_PAUSED = 0;
const PLAYER_ACTIVE = 1;

// Note: slight change from Jared's code, renamed white_index to white_player_index and black_index to black_player_index for better readability
export function insert_match(
    tournament_index,
    round_value,
    white_player_index,
    black_player_index
) {
    // Insert match object
    // Update current match register id
    match_register[match_register_id] = {
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

    return match_register_id++;
}

// TODO: rename
export function update_tournament_players(tournament_index, player_index) {
    // Get the list of players in a tournament and add a player
    tournament_register[tournament_index].tournament_players.push(player_index);
}

export function update_match(match_index, win_index, loss_index) {
    if (win_index === -1 && loss_index === -1) {
        // If both indexes are not given, then the match is a tie
        match_register[match_index].tie_match = true;
        match_register[match_index].match_complete = true;
    } else if (win_index !== -1 && loss_index !== -1) {
        // If both indexes are given, then update like normal
        match_register[match_index].win_index = win_index;
        match_register[match_index].loss_index = loss_index;
        match_register[match_index].match_complete = true;
    }
}

export function update_match_bye(match_index) {
    // Set a match to be a bye
    match_register[match_index].bye_match = true;
    match_register[match_index].match_complete = true;
}

export function update_tournament_round(tournament_index, current_round) {
    tournament_register[tournament_index].round_completed = current_round;
}

export function get_unfinished_matches(tournament_index) {
    let unfinished_matches = [];

    // Loop over the entire match_register
    for (let match_index of Object.keys(match_register)) {
        // Add the index, white player and black player if the match is not complete
        if (
            !match_register[match_index].match_complete &&
            match_register[match_index].tournament_index == tournament_index
        ) {
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

export function get_school_index(school_name) {
    // Find the school with the matching name
    for (let school_index of Object.keys(school_register)) {
        if (school_register[school_index].school_name === school_name) {
            return school_index;
        }
    }

    throw new Error('Could not find school: "' + school_name + '"');
}

export function get_school_name(school_index) {
    return school_register[school_index].school_name;
}

export function get_tournament_index(tournament_name) {
    // Find the tournament with the matching name
    for (let tournament_index of Object.keys(tournament_register)) {
        if (
            tournament_register[tournament_index].tournament_name === tournament_name
        ) {
            return tournament_index;
        }
    }

    throw new Error('Could not find tournament: "' + tournament_name + '"');
}

export function get_player_index(first_name, last_name) {
    // Find the player with the matching first name and last name
    // Player names MUST be unique
    for (let player_index of Object.keys(player_register)) {
        if (
            player_register[player_index].first_name === first_name &&
            player_register[player_index].last_name === last_name
        ) {
            return player_index;
        }
    }

    throw new Error(
        'Could not find player: "' + first_name + " " + last_name + '"'
    );
}

export function get_player_info(player_index) {
    // Return the entire player object
    return player_register[player_index];
}

export function get_round_info(tournament_index) {
    // Return tournament round data
    // TODO: Maybe return entiere tournament object?

    let tournament = tournament_register[tournament_index];
    return {
        round_total: tournament.round_total,
        round_completed: tournament.round_completed,
    };
}

export function get_round_matches(tournament_index, round_value) {
    // Return all matches in one tournament round
    // Rewritten to make more sense with js object based structure

    let matches = [];

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (
            match.tournament_index === tournament_index &&
            match.round_value === round_value
        ) {
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
        let white_str =
            white_player.first_name +
            " " +
            white_player.last_name +
            ", " +
            white_school_name;
        let black_player = get_player_info(match.match_data.black_player_index);
        let black_school_name = get_school_name(black_player.school_index);
        let black_str =
            black_player.first_name +
            " " +
            black_player.last_name +
            ", " +
            black_school_name;

        if (match.match_data.win_index == match.match_data.white_player_index) {
            // White player won
            white_str += " (win)";
            black_str += " (loss)";
        } else if (
            match.match_data.win_index == match.match_data.black_player_index
        ) {
            // Black player won
            white_str += " (loss)";
            black_str += " (win)";
        } else if (match.match_data.tie_match) {
            white_str += " (tie)";
            black_str += " (tie)";
        } else if (match.match_data.bye_match) {
            white_str += " (bye)";
            black_str += " (bye)";
        }

        round_matches[match.match_index] = {
            index: match.match_index,
            white: white_str,
            black: black_str,
            white_pn: match.match_data.white_player_index,
            black_pn: match.match_data.black_player_index,
        };
    }

    return round_matches;
}

export function get_player_black(tournament_index, player_index) {
    // The number of times a player has played black
    let black = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.bye_match) continue;

        if (
            match.tournament_index == tournament_index &&
            match.black_player_index == player_index
        ) {
            black++;
        }
    }

    return black;
}

export function get_player_white(tournament_index, player_index) {
    // The number of times a player has played white
    let white = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (match.bye_match) continue;

        if (
            match.tournament_index == tournament_index &&
            match.white_player_index == player_index
        ) {
            white++;
        }
    }

    return white;
}

export function get_player_wins(tournament_index, player_index) {
    // The number of times a player has won in a tournament
    let wins = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (
            match.tournament_index == tournament_index &&
            match.win_index == player_index
        ) {
            wins++;
        } else if (
            match.tournament_index == tournament_index &&
            match.white_player_index == player_index &&
            match.bye_match
        ) {
            wins++;
        }
    }

    return wins;
}

export function get_player_loss(tournament_index, player_index) {
    // The number of times a player has lost in a tournament
    let losses = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (
            match.tournament_index == tournament_index &&
            match.loss_index == player_index
        ) {
            losses++;
        }
    }

    return losses;
}

// TODO: refactor asap
export function get_player_ties(tournament_index, player_index) {
    // The number of times a player has tied in a tournament
    let ties = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (
            match.tournament_index == tournament_index &&
            (match.black_player_index == player_index ||
                match.white_player_index == player_index) &&
            match.tie_match
        ) {
            ties++;
        }
    }

    return ties;
}

export function get_player_byes(tournament_index, player_index) {
    // The number of times a player has gotten a bye in a tournament
    let byes = 0;

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (
            match.tournament_index == tournament_index &&
            (match.black_player_index == player_index ||
                match.white_player_index == player_index) &&
            match.bye_match
        ) {
            byes++;
        }
    }

    return byes;
}

// TODO: why is this defined after?
export function get_player_matches(tournament_index, player_index) {
    // All matches a player has played in a tournament
    let matches = [];

    for (let match_index of Object.keys(match_register)) {
        let match = match_register[match_index];
        if (
            match.tournament_index == tournament_index &&
            (match.black_player_index == player_index ||
                match.white_player_index == player_index)
        ) {
            matches.push({
                match_index: match_index,
                match_data: match,
            });
        }
    }

    return matches;
}

export function get_tournament_players(tournament_index) {
    // All players in a tournament
    return tournament_register[tournament_index].tournament_players;
}

export function get_players() {
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
        };
    }

    return players;
}

export function get_schools() {
    // Return all schools in the school register
    let schools = {};

    for (let school_index of Object.keys(school_register)) {
        schools[school_index] = school_name;
    }

    return schools;
}

export function db_calls_test_populate() {
    let ss = [
        ["AVHS", "CO", "DCSD"],
        ["BVHS", "CO", "DCSD"],
    ];

    for (let xx of ss) {
        insert_school(xx[0], xx[1], xx[2]);
    }

    let pps = [
        ["Bob", "Smith1", 1],
        ["Bob", "Smith2", 1],
        ["Jane", "Doe1", 2],
        ["Jane", "Doe2", 2],
    ];

    for (let pp of pps) {
        insert_player(pp[0], pp[1], pp[2] - 1);
    }

    let tt = ["1234", "RVHS", "state", "2022-05-04", 5];

    insert_tournament(tt[0], tt[1], tt[2], tt[3], tt[4]);

    update_tournament_players(0, 2); // should add Bob Smi1th
}

/* end of db_calls.py */

/* start of chess_ui.py */

export function read_players_db(tournament_index) {
    let players = {};
    let players_list = get_players();

    // Loop over all players
    for (let player_index of Object.keys(players_list)) {
        let player = players_list[player_index];

        if (player.status !== PLAYER_ACTIVE) {
            continue;
        }

        // TODO: change draw to ties or ties to draw for consistency

        // TODO: Make all functions consistent with this format
        let player_dict = {
            index: player_index,
            first: player.first_name,
            last: player.last_name,
            school: player.school_name,
            rank: 0,
            matches: [],
            score: get_player_wins(tournament_index, player_index) + get_player_ties(tournament_index, player_index) * 0.5,
            record: {
                win: get_player_wins(tournament_index, player_index),
                loss: get_player_loss(tournament_index, player_index),
                bye: get_player_byes(tournament_index, player_index),
                draw: get_player_ties(tournament_index, player_index),
                black: get_player_black(tournament_index, player_index),
                white: get_player_white(tournament_index, player_index),
            },
        };

        // Get every single match the player has played
        let matches = get_player_matches(tournament_index, player_index);

        for (let match of matches) {
            let opponent = null;
            let color = null;
            let result = null;

            if (player_index == match.match_data.white_player_index) {
                color = "white";
                opponent = match.match_data.black_player_index;
            } else {
                color = "black";
                opponent = match.match_data.white_player_index;
            }

            if (player_index == match.match_data.win_index) {
                result = "win";
            } else {
                result = "loss";
            }

            // Simplify the match data into a more elegant dictionary
            // TODO: Make all field names consistent with this naming

            let match_dict = {
                round: match.match_data.round,
                match: match.match_index,
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

// TODO: Draws should be half!
export function sort_wins(current_round, players) {
    let win_list = [];

    // Append a seperate list for each possible score

    for (let xx = 0; xx <= current_round * 2 + 4; xx++) {
        win_list.push([]);
    }

    // Place players in based on their record in the tournament;
    for (let player_index of Object.keys(players)) {
        let player = players[player_index];
        let total_wins = player.record.win * 2 + player.record.draw;
        win_list[total_wins].push(player_index);
    }

    return win_list;
}

export function make_matches(
    players,
    players_nums,
    leftover,
    round_total,
    score_crit,
    color_crit
) {
    /*for (let l of leftover) {
          // console.log(players_nums, l, players_nums.indexOf(l))
          if (players_nums.indexOf(l)) {
              leftover.splice(leftover.indexOf(leftover), 1);
          }
      }*/

    // console.log(players_nums, leftover);
    let full_tries = 0;
    let failed = false;

    const isObject = (value) => typeof value == "object";

    if (isObject(players_nums[players_nums.length - 1])) {
        players_nums.pop();
    }

    //console.log(players_nums, players_nums.length, Math.floor(players_nums.length / 2), leftover);

    while (true) {
        //console.log("Match attempt: ", full_tries);
        full_tries += 1;

        // Deep copy just in case we need to try again
        let ww = [...players_nums];
        let new_matches = [];
        let repeat_match = false;
        let same_school = false;
        let ll = [...leftover];
        let l = ww.length; // Need to initialize because ww.length changes over time

        if (ww.length > 0 && isObject(ww[ww.length - 1])) {
            //console.log(ww);
            ww.pop();
        }

        if (full_tries < 100) {
            //console.log(l);

            // Try to make the most matches as possible
            // Floor division by 2 gives the most possible matches for a set of players
            for (let ii = 0; ii < Math.floor(l / 2); ii++) {
                // Account for final round edge case
                if (!score_crit && ww.length == 2 && ll.length == 0) {
                    let repeat_match = false;
                    let same_school = false;

                    for (let m of players[ww[0]].matches) {
                        if (m.opponent == players[ww[1]]) {
                            repeat_match = true;
                        }
                    }

                    if (players[ww[0]].school == players[ww[1]].school) {
                        same_school = true;
                    }

                    if (same_school || repeat_match) {
                        return "score_error";
                        //ll.push(ww.pop());
                        //ll.push(ww.pop());
                        //break;
                    }
                }

                let p1_ww_index;

                // If there is a leftover player from a previous bracket, try to minimize this by rolling over
                // For example, if there is a player with a score of 2, but there are 5 people with the score of 2, they get rolled over
                // Rather than giving someone who has a higher chance of winning a bye, try to match that person with a score of 1
                // This eventually cascades down if all other groups have an even amoutn of players
                if (ll.length > 0 && ww.indexOf(String(ll[0])) >= 0) {
                    // Get Key By Value
                    p1_ww_index = ww.indexOf(String(ll.shift()));
                } else {
                    if (!color_crit && !score_crit) {
                        //console.log("random")
                        //console.log(ww)
                    }
                    p1_ww_index = Math.floor(Math.random() * ww.length);
                }

                let p1 = players[ww[p1_ww_index]];

                if (!p1) {
                    //console.log("p1 ww index", p1_ww_index);
                }

                // Remove p1 from the ww list (ew that looks dumb)
                ww.splice(ww.indexOf(String(p1.index)), 1);

                // Assume p2 goes to the same school as p1 so the loop acts like a do {...} while (...)
                let p2_school = p1.school;
                let p2_ww_index = null;
                let p2 = null;

                // Keep track
                // If it takes to many tries, we break out and retry the pairing with anothe randomization
                let tries = 0;

                // P1 and P2 are NOT allowed to be from the same school unles ABSOLUTELY NECESSARY
                while (p1.school == p2_school) {
                    //console.log("inner tries", tries, new_matches)
                    //console.log(p2_school, p1.school, p1.school == p2_school);
                    // Keep trying
                    tries += 1;

                    // Random select p2 and initialize all of the numbers
                    p2_ww_index = Math.floor(Math.random() * ww.length);
                    p2 = players[ww[p2_ww_index]];

                    while (!p2) {
                        //console.log("finding p2", ww.length)
                        p2_ww_index = Math.floor(Math.random() * ww.length);
                        p2 = players[ww[p2_ww_index]];
                    }
                    p2_school = p2.school;

                    // Ensure p1 hasn't played p2 before
                    for (let m of p1.matches) {
                        if (m.opponent == p2_ww_index) {
                            repeat_match = true;
                        }
                    }

                    if (p1.school == p2_school) {
                        same_school = true;
                    }

                    // Too many tries, break
                    if (tries > 50) {
                        break;
                    }

                    // 1 player leftover, no more matches can be made

                    if (ww.length == 2) {
                        if (isObject(ww[1])) {
                            ww.pop();
                        }
                    }

                    if (ww.length == 1) {
                        ll = ww[0];
                        break;
                    }
                }

                if (p1.school == p2_school) {
                    same_school = true;
                }

                if (full_tries < 100) {
                    if ((tries > 50 && full_tries < 50) || same_school || repeat_match) {
                        //
                        failed = true;
                        repeat_match = false;
                        same_school = false;

                        if (full_tries > 100) {
                            failed = true;
                        }

                        break;
                    }
                }

                if (color_crit) {
                    if (
                        (p1.matches.length > 1 &&
                            p1.record.white / (p1.record.white + p1.record.black + 1) >
                            0.75) ||
                        p1.record.black / (p1.record.white + p1.record.black + 1) > 0.75 ||
                        p2.record.white / (p2.record.white + p2.record.black + 1) > 0.75 ||
                        p2.record.black / (p2.record.white + p2.record.black + 1) > 0.75
                    ) {
                        console.log("Color error");
                        failed = true;
                        break;
                    }
                }

                // Remove p2 from ww because the decision is final
                ww.splice(ww.indexOf(String(p2.index)), 1);

                // If player 1 has played white more than player 2, make player 2 play white
                let n1 = p1.index;
                let n2 = p2.index;

                if (p1.record.white > p2.record.white) {
                    let tmp = n1;
                    n1 = n2;
                    n2 = tmp;
                }

                if (color_crit) {
                    if (
                        (Math.floor(p1.record.white / round_total) > 0.5 &&
                            n1 == p1.index) ||
                        (Math.floor(p1.record.black / round_total) > 0.5 &&
                            n2 == p1.index) ||
                        (Math.floor(p2.record.white / round_total) > 0.5 &&
                            n1 == p2.index) ||
                        (Math.floor(p2.record.black / round_total) > 0.5 && n2 == p2.index)
                    ) {
                        failed = true;
                        break;
                    }
                }

                // No point in returning index1, index2, color1 and color2
                // TODO: Inconsistent naming with white_player_index and black_player_index
                new_matches.push({
                    white_index: n1,
                    black_index: n2,
                });
            }

            // If we've failed, reset and restart
            if (failed && full_tries < 100) {
                failed = false;
                continue;
            }

            // Somehow nothing failed and nothing broke
            ll = null;

            // If we have a leftover player, try to make a bye match
            if (ww.length != 0 && ww[0] != [] && players[ww[0]]) {
                ll = ww[0];

                // The player has already had a bye, and two byes in one tournament is sad :(
                // There is a chance this could break if the tournament has 5 people and 6 rounds... But then again, swiss matching would break either way
                // TODO: Maybe check if they don't have the least amount of byes?
                if (players[ww[0]].record.bye != 0) {
                    //console.log("Another bye?")
                    //full_tries -= 1;
                    continue;
                }
            }

            if (ww.length == 1 && (!players[ww[0]] || ww[0] == [])) {
                ww.shift();
                ll = null;
                continue;
            }
        }

        // We've successfully finished the matching
        // Return a dictionary containing the new matches and the leftover
        // TODO: This looks dumb and is inconvenient.

        if (ll != null && ll != []) {
            ll = [ll];
        }

        return {
            new_matches: new_matches,
            ll: ll,
        };
    }
}

function original_make_matches(players, players_nums, leftover) {
    let full_tries = 0;
    let failed = false;
    //let potential_fail = false;

    while (true) {
        //console.log("Match attempt: ", full_tries);
        full_tries += 1;
        // Deep copy just in case we need to try again
        let ww = [...players_nums];
        let new_matches = [];
        let repeat_match = false;
        let same_school = false;
        let ll = leftover;
        let l = ww.length; // Need to initialize because ww.length changes over time

        // Try to make the most matches as possible 
        // Floor division by 2 gives the most possible matches for a set of players
        for (let ii = 0; ii < Math.floor(l / 2); ii++) {
            let p1_ww_index;

            // If there is a leftover player from a previous bracket, try to minimize this by rolling over
            // For example, if there is a player with a score of 2, but there are 5 people with the score of 2, they get rolled over
            // Rather than giving someone who has a higher chance of winning a bye, try to match that person with a score of 1
            // This eventually cascades down if all other groups have an even amoutn of players
            if (ll != null && ww.indexOf(String(ll)) != -1) {
                // Get Key By Value
                p1_ww_index = ww.indexOf(String(ll));
            } else {
                // Randomly choose player
                p1_ww_index = Math.floor(Math.random() * (ww.length));
            }

            let p1 = players[ww[p1_ww_index]];

            // Remove p1 from the ww list (ew that looks dumb)
            ww.splice(ww.indexOf(String(p1.index)), 1);

            // Assume p2 goes to the same school as p1 so the loop acts like a do {...} while (...)
            let p2_school = p1.school;
            let p2_ww_index = null;
            let p2 = null;

            // Keep track
            // If it takes to many tries, we break out and retry the pairing with anothe randomization
            let tries = 0;

            // P1 and P2 are NOT allowed to be from the same school unles ABSOLUTELY NECESSARY
            while (p1.school == p2_school) {
                //console.log(p2_school, p1.school, p1.school == p2_school);
                // Keep trying
                tries += 1;

                // Random select p2 and initialize all of the numbers
                p2_ww_index = Math.floor(Math.random() * (ww.length));
                p2 = players[ww[p2_ww_index]];
                p2_school = p2.school;

                // Ensure p1 hasn't played p2 before
                for (let m of p1.matches) {
                    if (m.opponent == p2_ww_index) {

                        repeat_match = true;
                    }
                }

                if (p1.school == p2_school) {
                    same_school = true;
                }

                // Too many tries, break
                if (tries > 50) {
                    break;
                }

                // 1 player leftover, no more matches can be made
                if (ww.length == 1) {
                    break;
                }
            }

            if (p1.school == p2_school) {
                if (ww.length == 2) {
                }
                same_school = true;
            }

            if (full_tries < 100) {
                if ((players_nums.length > 2 && ((tries > 50 && full_tries < 50) || same_school || (repeat_match && (tries < 50 && full_tries < 50))))) { //
                    failed = true;
                    repeat_match = false;
                    same_school = false;

                    if (full_tries > 100) {
                        failed = true;
                    }

                    break;
                }
            }

            // Remove p2 from ww because the decision is final
            ww.splice(ww.indexOf(String(p2.index)), 1);

            // If player 1 has played white more than player 2, make player 2 play white
            let n1 = p1.index;
            let n2 = p2.index;

            if (p1.record.white > p2.record.white) {
                let tmp = n1;
                n1 = n2;
                n2 = tmp;
            }

            // No point in returning index1, index2, color1 and color2
            // TODO: Inconsistent naming with white_player_index and black_player_index
            new_matches.push({
                white_index: n1,
                black_index: n2,
            });
        }

        // If we've failed, reset and restart
        if (failed && full_tries < 100) {
            failed = false;
            continue;
        }

        // Somehow nothing failed and nothing broke
        ll = null;

        // If we have a leftover player, try to make a bye match
        if (ww.length != 0) {
            ll = ww[0];

            // The player has already had a bye, and two byes in one tournament is sad :(
            // There is a chance this could break if the tournament has 5 people and 6 rounds... But then again, swiss matching would break either way
            // TODO: Maybe check if they don't have the least amount of byes? 
            if (players[ww[0]].record.bye != 0) {
                full_tries -= 1;
                continue;
            }
        }

        // We've successfully finished the matching
        // Return a dictionary containing the new matches and the leftover
        // TODO: This looks dumb and is inconvenient.

        return { new_matches: new_matches, ll: ll };
    }
}

function old_make_matches(players, players_nums, leftover) {

    let full_tries = 0;
    let failed = false;
    //let potential_fail = false;

    while (true) {
        //console.log("Match attempt: ", full_tries);
        // Deep copy just in case we need to try again
        let ww = [...players_nums];
        let new_matches = [];
        let ll = leftover;
        let l = ww.length; // Need to initialize because ww.length changes over time

        // Try to make the most matches as possible 
        // Floor division by 2 gives the most possible matches for a set of players
        for (let ii = 0; ii < Math.floor(l / 2); ii++) {
            let p1_ww_index;

            // If there is a leftover player from a previous bracket, try to minimize this by rolling over
            // For example, if there is a player with a score of 2, but there are 5 people with the score of 2, they get rolled over
            // Rather than giving someone who has a higher chance of winning a bye, try to match that person with a score of 1
            // This eventually cascades down if all other groups have an even amoutn of players
            if (ll != null && ww.indexOf(String(ll)) != -1) {
                // Get Key By Value
                p1_ww_index = ww.indexOf(String(ll));
            } else {
                // Randomly choose player
                p1_ww_index = Math.floor(Math.random() * (ww.length));
            }

            let p1 = players[ww[p1_ww_index]];

            // Remove p1 from the ww list (ew that looks dumb)
            ww.splice(ww.indexOf(String(p1.index)), 1);

            // Assume p2 goes to the same school as p1 so the loop acts like a do {...} while (...)
            let p2_school = p1.school;
            let p2_ww_index = null;
            let p2 = null;

            // Keep track
            // If it takes to many tries, we break out and retry the pairing with anothe randomization
            let tries = 0;

            p2_ww_index = Math.floor(Math.random() * (ww.length));
            p2 = players[ww[p2_ww_index]];
            p2_school = p2.school;

            if (tries > 50) {
                break;
            }

            // 1 player leftover, no more matches can be made
            if (ww.length == 1) {
                break;
            }


            // Remove p2 from ww because the decision is final
            ww.splice(ww.indexOf(String(p2.index)), 1);

            // If player 1 has played white more than player 2, make player 2 play white
            let n1 = p1.index;
            let n2 = p2.index;

            if (p1.record.white > p2.record.white) {
                let tmp = n1;
                n1 = n2;
                n2 = tmp;
            }

            // No point in returning index1, index2, color1 and color2
            // TODO: Inconsistent naming with white_player_index and black_player_index
            new_matches.push({
                white_index: n1,
                black_index: n2,
            });
        }

        // Somehow nothing failed and nothing broke
        ll = null;

        // If we have a leftover player, try to make a bye match
        if (ww.length != 0) {
            ll = ww[0];
        }

        // We've successfully finished the matching
        // Return a dictionary containing the new matches and the leftover
        // TODO: This looks dumb and is inconvenient.

        return { new_matches: new_matches, ll: ll };
    }
}

function smart_color_switch(tournament_index, matches) {
    let players = read_players_db(tournament_index);
    let round_total = get_round_info(tournament_index).round_total;

    for (let match of matches) {
        let score_white = players[match.white_index].score;
        let score_black = players[match.black_index].score;

        let white_percentage_white = players[match.white_index].record.white / round_total;
        let white_percentage_black = players[match.black_index].record.white / round_total;

        // If white has played white more times than black, switch them around
        if (white_percentage_white > white_percentage_black) {
            let temp = match.white_index;
            match.white_index = match.black_index;
            match.black_index = temp;
            continue;
        }
    }

    // Find all matches where both players have the same score
    let equal_score_matches = [];
    let unequal_score_matches = [];

    for (let match of matches) {
        let score_white = players[match.white_index].score;
        let score_black = players[match.black_index].score;

        if (score_white != score_black) {
            equal_score_matches.push(match);
        } else {
            unequal_score_matches.push(match);
        }
    }

    // Color switch matches with equal scores
    for (let m1 of equal_score_matches) {
        for (let m2 of equal_score_matches) {
            // If both matches have the same players, skip
            if (m1.white_index == m2.white_index) {
                continue;
            }

            // If both matches do not have equal scores, skip
            if (players[m1.white_index].score != players[m2.white_index].score) {
                continue;
            }

            // If the player playing white in match 1 has played white for 1/2 the tournament already
            // and the player playing black in match 2 has played black for 1/2 the tournament already 
            // attempt a switch
            if (players[m1.white_index].record.white + 1 >= Math.floor(round_total / 2) &&
                players[m2.black_index].record.black + 1 >= Math.floor(round_total / 2)) {

                let p1 = players[m1.white_index];
                let p2 = players[m2.black_index];

                // Check that they are from different schools
                let same_school = p1.school == p2.school;

                // Check if they have played each other before
                let repeat_match = false;

                for (let m of p1.matches) {
                    if (m.white_index == m2.black_index || m.black_index == m2.black_index) {
                        repeat_match = true;
                    }
                }

                // If this is a valid match, switch the players
                if (!same_school && !repeat_match) {
                    let temp = m1.white_index;
                    m1.white_index = m2.black_index;
                    m2.black_index = temp;
                    // Switched!
                }
            }

            // Basically the same thing but for the other two players
            if (players[m1.black_index].record.white + 1 >= Math.floor(round_total / 2) &&
                players[m2.white_index].record.black + 1 >= Math.floor(round_total / 2)) {

                let p1 = players[m1.black_index];
                let p2 = players[m2.white_index];

                // Check that they are from different schools
                let same_school = p1.school == p2.school;

                // Check if they have played each other before
                let repeat_match = false;

                for (let m of p1.matches) {
                    if (m.white_index == m2.white_index || m.black_index == m2.white_index) {
                        repeat_match = true;
                    }
                }

                // If this is a valid match, switch the players
                if (!same_school && !repeat_match) {
                    let temp = m1.black_index;
                    m1.black_index = m2.white_index;
                    m2.white_index = temp;
                    // Switched!
                }
            }
        }
    }

    // Combine all matches together
    matches = equal_score_matches.concat(unequal_score_matches);

    return matches;
}


export function run_round(tournament_index) {
    // Read players and reformat
    let players = read_players_db(tournament_index); // console.log("All Players : \n", players);
    let temp = get_round_info(tournament_index);
    let round_total = temp.round_total,
        current_round = temp.round_completed;
    let unfinished = get_unfinished_matches(tournament_index);

    // Make sure all the matches are finished
    if (Object.keys(unfinished).length != 0) {
        //console.log("Unfinished matches, round not complete");
        return "Unfinished matches, round not complete";
    }

    //ATTEMPT_AMOUNT = Math.round(Object.keys(players).length / 6) * ATTEMPT_AMOUNT;

    // Increment current round
    current_round++;

    let tries = 0;
    let new_matches;
    let leftover;

    console.log("Player scores : ", sort_wins(current_round, players));

    let failed;

    console.log("Starting matching process");
    console.log(sort_wins(current_round, players));

    while (tries < 1000) {
        //console.log("Full pairing attempt:", tries);
        tries++;

        // Sort the players based on wins
        let win_list = sort_wins(current_round, players);

        // Initialize the rolling left over player and list to store matches
        let _leftover = null;
        let matches = [];

        // TODO: Make it not be xx
        for (let xx = 0; xx < win_list.length; xx++) {
            // Select each score bracket, in reverse
            let ww = win_list[win_list.length - xx - 1];

            // If we have a leftover, add it to the current section so it rolls over
            if (_leftover != null) {
                ww.push(_leftover);
            }

            // Try making matches
            let n_matches;
            let temp = original_make_matches(players, ww, _leftover);
            n_matches = temp.new_matches;
            _leftover = temp.ll;

            // If we have a leftover, update
            if (_leftover && _leftover.length == 0) {
                _leftover = null;
            }

            // Update new matches
            matches.push(...n_matches);
        }

        let failed = false;

        for (let i = 0; i < matches.length; i++) {
            let match = matches[i];
            for (let m of players[match.white_index].matches) {
                if (m.opponent == match.black_index) {
                    failed = true;
                }
            }

            if (
                players[match.white_index].school == players[match.black_index].school
            ) {
                failed = true;
            }
        }

        new_matches = matches;
        leftover = _leftover;

        if (!failed) {
            break;
        }
    }


    while ((failed || new_matches.length < Math.floor(Object.keys(players).length / 2)) && tries < 1000) {
        //console.log("Full pairing attempt:", tries);
        tries++;

        // Sort the players based on wins
        let win_list = sort_wins(current_round, players);

        // Initialize the rolling left over player and list to store matches
        let _leftover = [];
        let matches = [];

        // TODO: Make it not be xx
        for (let xx = 0; xx < win_list.length; xx++) {
            //console.log(xx);
            // Select each score bracket, in reverse
            let ww = win_list[win_list.length - xx - 1];

            if (ww.indexOf([]) != -1) {
                ww.splice(ww.indexOf([]), 1);
            }

            // If we have a leftover, add it to the current section so it rolls over
            while (_leftover.length > 1) {
                if (ww.indexOf(_leftover[_leftover.length - 1]) == -1) {
                    ww.push(_leftover.pop());
                } else {
                    _leftover.pop();
                }
            }

            if (ww.indexOf([]) != -1) {
                ww.splice(ww.indexOf([]), 1);
            }

            // Try making matches
            let n_matches;
            let temp = make_matches(players, ww, _leftover, round_total, true, true);
            n_matches = temp.new_matches;
            _leftover = temp.ll;

            if (_leftover == null) {
                _leftover = [];
            }

            // Update new matches
            matches.push(...n_matches);
        }

        failed = false;

        for (let i = 0; i < matches.length; i++) {
            let match = matches[i];
            for (let m of players[match.white_index].matches) {
                if (m.opponent == match.black_index) {
                    failed = true;
                }
            }

            if (
                players[match.white_index].school == players[match.black_index].school
            ) {
                failed = true;
            }
        }

        new_matches = matches;
        leftover = _leftover;

        if (!failed) {
            break;
        }
    }

    /*
    console.log("Attempts:", tries);

    if (
        new_matches.length < Math.floor(Object.keys(players).length / 2) ||
        failed
    ) {
        failed = false;
        console.log("Not accounting for color now");
        let tries = 0;
        while (true) {
            //console.log("Full pairing attempt:", tries);
            tries++;

            // Sort the players based on wins
            let win_list = sort_wins(current_round, players);

            // Initialize the rolling left over player and list to store matches
            let _leftover = [];
            let matches = [];

            // TODO: Make it not be xx
            for (let xx = 0; xx < win_list.length; xx++) {
                // Select each score bracket, in reverse
                let ww = win_list[win_list.length - xx - 1];

                if (ww.indexOf([]) != -1) {
                    ww.splice(ww.indexOf([]), 1);
                }

                // If we have a leftover, add it to the current section so it rolls over
                while (_leftover.length > 1) {
                    if (ww.indexOf(_leftover[_leftover.length - 1]) == -1) {
                        ww.push(_leftover.pop());
                    } else {
                        _leftover.pop();
                    }
                }

                if (ww.indexOf([]) != -1) {
                    ww.splice(ww.indexOf([]), 1);
                }

                // Try making matches
                let n_matches;
                let temp = make_matches(
                    players,
                    ww,
                    leftover,
                    round_total,
                    true,
                    false
                );
                n_matches = temp.new_matches;
                _leftover = temp.ll;

                if (_leftover == null) {
                    _leftover = [];
                }

                // Update new matches
                matches.push(...n_matches);
            }

            let _failed = false;

            for (let i = 0; i < matches.length; i++) {
                let match = matches[i];
                for (let m of players[match.white_index].matches) {
                    if (m.opponent == match.black_index) {
                        _failed = true;
                    }
                }

                if (
                    players[match.white_index].school == players[match.black_index].school
                ) {
                    _failed = true;
                }
            }

            if (
                matches.length >= Math.floor(Object.keys(players).length / 2) &&
                !_failed
            ) {
                new_matches = matches;
                leftover = _leftover;
                failed = false;
                break;
            }

            if (tries > 10000) {
                new_matches = matches;
                leftover = _leftover;
                failed = true;
                break;
            }
        }
    }

    console.log("Score disregard pairing?", failed);

    if (
        new_matches.length < Math.floor(Object.keys(players).length / 2) ||
        failed
    ) {
        failed = false;
        console.log("Not accounting for score now");
        let tries = 0;
        let optimal_matches = [];
        let error = Infinity;

        while (tries < 10000) {
            //console.log("Full pairing attempt:", tries);
            tries++;

            // Sort the players based on wins
            let win_list = sort_wins(current_round, players);

            // Initialize the rolling left over player and list to store matches
            let _leftover = [];
            let matches = [];

            // TODO: Make it not be xx
            for (let xx = 0; xx < win_list.length; xx++) {
                // Select each score bracket, in reverse
                let ww = win_list[win_list.length - xx - 1];

                if (ww.indexOf([]) != -1) {
                    ww.splice(ww.indexOf([]), 1);
                }

                while (_leftover.length > 1) {
                    if (ww.indexOf(_leftover[_leftover.length - 1]) == -1) {
                        ww.push(_leftover.pop());
                    } else {
                        _leftover.pop();
                    }
                }

                if (ww.indexOf([]) != -1) {
                    ww.splice(ww.indexOf([]), 1);
                }

                // Try making matches
                let n_matches;
                let temp = make_matches(
                    players,
                    ww,
                    leftover,
                    round_total, false, true
                );

                if (temp == "score_error") {
                    //console.log("score error");
                    //console.log(xx);
                    win_list[Math.max(win_list.length - xx - 2, 0)].concat(
                        win_list[win_list.length - xx - 1]
                    );
                    continue;
                }

                n_matches = temp.new_matches;
                _leftover = temp.ll;

                if (_leftover == null) {
                    _leftover = [];
                }

                // Update new matches
                matches.push(...n_matches);
            }

            let _failed = false;

            for (let i = 0; i < matches.length; i++) {
                let match = matches[i];
                for (let m of players[match.white_index].matches) {
                    if (m.opponent == match.black_index) {
                        _failed = true;
                    }
                }

                if (
                    players[match.white_index].school == players[match.black_index].school
                ) {
                    _failed = true;
                }
            }

            if (
                matches.length >= Math.floor(Object.keys(players).length / 2) &&
                !_failed
            ) {
                new_matches = matches;
                leftover = _leftover;
                break;
            }

            if (tries > ATTEMPT_AMOUNT) {
                new_matches = matches;
                leftover = _leftover;
                failed = true;
                break;
            }
        }
    }

    */

    if (
        new_matches.length < Math.floor(Object.keys(players).length / 2) ||
        failed
    ) {
        console.log("Break Out At ", 5 * ATTEMPT_AMOUNT)
        let tries = 0;
        let min_errors = Infinity;
        let best_matches = [];
        let best_leftover = null;
        let match_hashes = []; // List of all premade match_hashes
        let start = Date.now();

        while (true) {
            if (tries % ATTEMPT_AMOUNT == 0) console.log("Full pairing attempt:", tries);
            tries++;

            // Sort the players based on wins
            let temp_win_list = sort_wins(current_round, players);
            let win_list = [];

            for (let l of temp_win_list) {
                win_list.push(...l);
            }

            // Initialize the rolling left over player and list to store matches
            let _leftover = [];
            let matches = [];

            // Select each score bracket, in reverse
            let ww = win_list;

            if (ww.indexOf([]) != -1) {
                ww.splice(ww.indexOf([]), 1);
            }

            // If we have a leftover, add it to the current section so it rolls over
            while (_leftover.length > 1) {
                if (ww.indexOf(_leftover[_leftover.length - 1]) == -1) {
                    ww.push(_leftover.pop());
                } else {
                    _leftover.pop();
                }
            }

            if (ww.indexOf([]) != -1) {
                ww.splice(ww.indexOf([]), 1);
            }

            // Try making matches
            let n_matches;
            let temp = make_matches(players, ww, leftover, round_total, false, false);

            if (tries > ATTEMPT_AMOUNT * 2) {
                //console.log("old matching")
                temp = old_make_matches(players, ww, leftover)
            }

            if (temp == "score_error") {
                tries -= 1;
                continue;
            }

            n_matches = temp.new_matches;
            _leftover = temp.ll;

            if (_leftover == null) {
                _leftover = [];
            }

            // Update new matches
            matches.push(...n_matches);

            let match_str = "";

            for (let match of matches) {
                //console.log(match)
                match_str += String(match.white_index) + String(match.black_index);
            }

            let match_hash = match_str.hashCode();

            let _failed = false;
            let _errors = 0;

            //console.log(match_hashes, match_str, match_hash);

            if (match_hashes.includes(match_hash) && tries < 10 * ATTEMPT_AMOUNT || matches.length < Math.floor((Object.keys(player_register).length) / 2)) {
                //tries -= 0.25;
                _errors = Infinity;
                _failed = true;
            } else {
                for (let i = 0; i < matches.length; i++) {
                    let match = matches[i];
                    for (let m of players[match.white_index].matches) {
                        if (m.opponent == match.black_index) {
                            //console.log("repeat")
                            _failed = true;
                            _errors += REPEAT_MATCH_PENALTY; // 12
                            _errors = Infinity;
                        }
                    }

                    if (Math.abs(players[match.white_index].score - players[match.black_index].score) >= 0.5) {
                        //console.log("point diff")
                        //_failed = true;
                        _errors += Math.pow(POINT_DIFFERENCE_PENALTY, Math.abs(players[match.white_index].score - players[match.black_index].score) * 2.2); // 2
                        //console.log("Point Diff Error AMOUNT", Math.abs(players[match.white_index].score - players[match.black_index].score), POINT_DIFFERENCE_PENALTY, Math.pow(POINT_DIFFERENCE_PENALTY, Math.abs(players[match.white_index].score - players[match.black_index].score) * 2))
                    }

                    //console.log(players[match.white_index].school, players[match.black_index].school)
                    if (
                        players[match.white_index].school == players[match.black_index].school
                    ) {
                        //console.log("school")
                        _failed = true;
                        _errors += SAME_SCHOOL_PENALTY; // 8
                    }

                    if (!players[match.white_index].school || !players[match.black_index].school) {
                        //console.log("school")
                        _failed = true;
                        _errors += SAME_SCHOOL_PENALTY; // 8
                    }
                }

                if (typeof _leftover == "string" || _leftover.length != 0) {
                    if (_leftover.length != 0) {
                        _leftover = _leftover[0];
                    }
                    //console.log(_leftover, players);
                    _errors += players[_leftover].score * BYE_SCORE_PENALTY; // 2

                    if (players[_leftover].record.bye > 0) {
                        _errors += REPEAT_BYE_PENALTY * players[_leftover].record.bye; // 20
                    }
                }

                match_hashes.push(match_hash)
            }


            if (_errors < min_errors) {
                console.log(tries, match_hash, matches.length, Math.floor(Object.keys(players).length / 2), _failed, _errors, min_errors, best_leftover)
                console.log(match_str);
                min_errors = _errors;
                best_matches = matches;
                best_leftover = _leftover;
            }

            //console.log(tries, ATTEMPT_AMOUNT)

            if ((Date.now() - start >= 6000) || (tries > 5 * ATTEMPT_AMOUNT) || (min_errors <= 0.16 && !_failed && tries > (2.5 * ATTEMPT_AMOUNT))) {
                //if ((tries > 5 * ATTEMPT_AMOUNT) || (min_errors <= 0.16 && !_failed && tries > (2.5 * ATTEMPT_AMOUNT))) {
                console.log(Date.now() - start)
                if (Date.now() - start >= 6000) {
                    console.log("Broke out because of time")
                }

                console.log("BREAKING OUT AT");
                //console.log(best_matches);
                new_matches = best_matches;
                leftover = best_leftover;
                // Returning best_matches
                let match_str = "";

                for (let match of best_matches) {
                    //console.log(match)
                    match_str += String(match.white_index) + String(match.black_index);
                }

                let match_hash = match_str.hashCode();

                console.log(match_hash)
                break;
            }


            /*
            if (
                matches.length >= Math.floor(Object.keys(players).length / 2) &&
                !_failed
            ) {
                new_matches = matches;
                leftover = _leftover;
                break;
            }
            */
        }
    }

    console.log("Made matches");
    //console.log("Matches before color switching:", new_matches)

    //new_matches = smart_color_switch(0, new_matches);

    console.log("New matches for round", current_round, ":", new_matches);

    for (let i = 0; i < new_matches.length; i++) {
        let match = new_matches[i];
        let repeat_match = false;
        for (let m of players[match.white_index].matches) {
            if (m.opponent == match.black_index) {
                repeat_match = true;
            }
        }
        console.log(
            "Players schools for match",
            i,
            ":",
            players[match.white_index].school,
            "-",
            players[match.black_index].school,
            players[match.white_index].score,
            "-",
            players[match.black_index].score,
            "( Same school? ",
            players[match.white_index].school == players[match.black_index].school,
            " ) ",
            "( Repeat match? ",
            repeat_match,
            ")",
            "( ",
            players[match.white_index].record.white,
            " - ",
            players[match.white_index].record.black,
            ")",
            "( ",
            players[match.black_index].record.white,
            " - ",
            players[match.black_index].record.black,
            ")"
        );
    }

    // Insert matches!
    for (let match of new_matches) {
        let index = insert_match(
            tournament_index,
            current_round,
            parseInt(match.white_index),
            parseInt(match.black_index)
        );
    }


    if (leftover && typeof leftover == "string" || typeof leftover == "number") {
        leftover = [leftover];
    }

    if (
        Math.floor(Object.keys(players).length / 2) <
        Object.keys(players).length / 2 &&
        leftover.length < 1
    ) {
        let missing_player = null;

        for (let i = 0; i < player_register_id; i++) {
            for (let match of new_matches) {
                if (match.white_index == i || match.black_index == i) {
                    continue;
                }
                missing_player = i;
                break;
            }
        }

        //console.log(missing_player);

        leftover.push(missing_player);
    }

    if (leftover && leftover.length > 0) {
        console.log("Leftover points: ", players[leftover[0]].score);
        console.log("Leftover player byes:", players[leftover[0]].record.bye);
    }

    if (typeof leftover != "object" && leftover) {
        console.log(leftover);
        let index = insert_match(
            tournament_index,
            current_round,
            Number(leftover),
            Number(leftover)
        );
        update_match_bye(index);
    } else if (leftover && leftover.length > 0) {
        let index = insert_match(
            tournament_index,
            current_round,
            Number(leftover[0]),
            Number(leftover[0])
        );
        update_match_bye(index);
    }

    // Update tournament round
    update_tournament_round(tournament_index, current_round);

    // Return only used for test cases
    // TODO: Change this two work for something else
    return [new_matches, leftover];
}

export function clearAll() {
    tournament_register = {};
    match_register = {};
    school_register = {};
    player_register = {};

    tournament_register_id = 0;
    match_register_id = 0;
    school_register_id = 0;
    player_register_id = 0;
}

/* end of chess_ui.py */

/* start of testing */

// TODO: Make a more comprehensive testing suite that is automated
// TODO: Maybe make it a little cleaner?

function random_match_result(match_index) {
    if (match_register[match_index].bye_match) {
        return;
    }

    if (Math.random() >= 0.47) {
        update_match(
            match_index,
            match_register[match_index].white_player_index,
            match_register[match_index].black_player_index
        );
    } else if (Math.random <= 0.43) {
        update_match(
            match_index,
            match_register[match_index].black_player_index,
            match_register[match_index].white_player_index
        );
    } else {
        update_match(match_index, -1, -1);
    }
}

function one_school_wins_result(match_index, x) {
    let players = read_players_db(0);

    if (match_register[match_index].bye_match) {
        return;
    }

    if (players[match_register[match_index].white_player_index].school == x) {
        update_match(
            match_index,
            match_register[match_index].white_player_index,
            match_register[match_index].black_player_index
        );
    } else {
        update_match(
            match_index,
            match_register[match_index].black_player_index,
            match_register[match_index].white_player_index
        );
    }
}

function test_case_1() {
    tournament_register = {};
    match_register = {};
    school_register = {};
    player_register = {};

    tournament_register_id = 0;
    match_register_id = 0;
    school_register_id = 0;
    player_register_id = 0;

    insert_school("Mountain Vista", "Colorado", "idk");

    insert_player("Josiah", "Jex", 0, 1000);
    insert_player("Logan", "Seader", 0, 1000);

    insert_school("Rock Canyon", "Colorado", "idk");

    insert_player("Rohan", "Kotwal", 1, 1000);
    insert_player("Anirudh", "Sura", 1, 1000);

    insert_school("Thunderridge", "Colorado", "idk");

    insert_player("Gabriel", "Wardall", 2, 1000);
    insert_player("Jake", "Fredericks", 2, 1000);

    insert_school("Castle View", "Colorado", "idk");

    insert_player("Braydon", "Cortez", 3, 1000);
    insert_player("Logan", "Hill", 3, 1000);

    insert_tournament(0, "Colorado", "State Tournament Colorado", "idk", 4);

    for (let i = 0; i < player_register_id; i++) {
        update_tournament_players(0, i);
    }

    run_round(0);

    let x = Math.round(Object.keys(player_register).length / 2);

    for (let i = 0; i < x; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 2 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 3 + i);
    }

    //console.log("Final scores", sort_wins(4, read_players_db(0)));
}

function test_case_2() {
    tournament_register = {};
    match_register = {};
    school_register = {};
    player_register = {};

    tournament_register_id = 0;
    match_register_id = 0;
    school_register_id = 0;
    player_register_id = 0;

    insert_school("Mountain Vista", "Colorado", "idk");

    insert_player("Josiah", "Jex", 0, 1000);
    insert_player("Logan", "Seader", 0, 1000);
    insert_player("Lacey", "Rael", 0, 1000);
    insert_player("Lucy", "Mock", 0, 1000);
    insert_player("Tyler", "Simmons", 0, 1000);
    insert_player("Eric", "Perez", 0, 1000);
    insert_player("William", "Hoffman", 0, 1000);
    insert_player("Kendall", "Rael", 0, 1000);
    insert_player("Matthew", "Stangeland", 0, 1000);
    insert_player("Nathan", "Falkbury", 0, 1000);

    insert_school("Rock Canyon", "Colorado", "idk");

    insert_player("Rohan", "Kotwal", 1, 1000);
    insert_player("Anirudh", "Sura", 1, 1000);
    insert_player("Alex", "Hoover", 1, 1000);
    insert_player("Tyler", "Chu", 1, 1000);

    insert_school("Thunderridge", "Colorado", "idk");

    insert_player("Gabriel", "Wardall", 2, 1000);
    insert_player("Jake", "Fredericks", 2, 1000);
    insert_player("Royal", "Harness", 2, 1000);

    insert_school("Castle View", "Colorado", "idk");

    insert_player("Braydon", "Cortez", 3, 1000);
    insert_player("Logan", "Hill", 3, 1000);

    insert_school("Legend", "Colorado", "idk");

    insert_player("Dawson", "Kern", 4, 1000);

    insert_tournament(0, "Colorado", "State Tournament Colorado", "idk", 4);

    for (let i = 0; i < player_register_id; i++) {
        update_tournament_players(0, i);
    }

    run_round(0);

    let x = Math.round(Object.keys(player_register).length / 2);

    for (let i = 0; i < x; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 2 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 3 + i);
    }

    //console.log("Final scores", sort_wins(4, read_players_db(0)));

    let players = read_players_db(0);
}

function test_case_3() {
    tournament_register = {};
    match_register = {};
    school_register = {};
    player_register = {};

    tournament_register_id = 0;
    match_register_id = 0;
    school_register_id = 0;
    player_register_id = 0;

    insert_school("Mountain Vista", "Colorado", "idk");

    insert_player("Josiah", "Jex", 0, 1000);
    insert_player("Logan", "Seader", 0, 1000);
    insert_player("Lacey", "Rael", 0, 1000);
    insert_player("Lucy", "Mock", 0, 1000);
    insert_player("Tyler", "Simmons", 0, 1000);
    insert_player("Eric", "Perez", 0, 1000);
    insert_player("William", "Hoffman", 0, 1000);
    insert_player("Kendall", "Rael", 0, 1000);
    insert_player("Matthew", "Stangeland", 0, 1000);
    insert_player("Nathan", "Falkbury", 0, 1000);

    insert_school("Rock Canyon", "Colorado", "idk");

    insert_player("Rohan", "Kotwal", 1, 1000);
    insert_player("Anirudh", "Sura", 1, 1000);
    insert_player("Alex", "Hoover", 1, 1000);
    insert_player("Tyler", "Chu", 1, 1000);
    insert_player("AJ", "Parasuraman", 1, 1000);
    insert_player("Emma", "Trotter", 1, 1000);
    insert_player("Advait", "Vihan", 1, 1000);
    insert_player("Patrick", "Zalewski", 1, 1000);
    insert_player("Max", "Wright", 1, 1000);
    insert_player("Dharmik", "Rasineni", 1, 1000);

    insert_school("Thunderridge", "Colorado", "idk");

    insert_player("Gabriel", "Wardall", 2, 1000);
    insert_player("Jake", "Fredericks", 2, 1000);
    insert_player("Royal", "Harness", 2, 1000);
    insert_player("Caden", "Davis", 2, 1000);
    insert_player("Dyan", "Sandusky", 2, 1000);
    insert_player("Wyatt", "Sandusky", 2, 1000);
    insert_player("Marcin", "Gorat", 2, 1000);

    insert_school("Castle View", "Colorado", "idk");

    insert_player("Braydon", "Cortez", 3, 1000);
    insert_player("Logan", "Hill", 3, 1000);
    insert_player("Xavier", "Graves", 3, 1000);
    insert_player("Jake", "Jekelis", 3, 1000);
    insert_player("Karl", "Baipsys", 3, 1000);
    insert_player("James", "Holub", 3, 1000);
    insert_player("William", "Stewart", 3, 1000);
    insert_player("Gianni", "Piscitella", 3, 1000);

    insert_school("Legend", "Colorado", "idk");

    insert_player("Dawson", "Kern", 4, 1000);
    insert_player("Mark", "Roberts", 4, 1000);
    insert_player("Nicholas", "Carboni", 4, 1000);
    insert_player("Nicholas", "Guadalupe", 4, 1000);
    insert_player("Victor", "Appat", 4, 1000);
    insert_player("Jacob", "Sadler", 4, 1000);

    insert_school("Conservatory Green", "Colorado", "idk");

    insert_player("Fabrizio", "Parada", 5, 1000);
    insert_player("Eduardo", "Garibay", 5, 1000);
    insert_player("Raymond", "Chatman", 5, 1000);
    insert_player("Christian", "Basurto", 5, 1000);

    insert_tournament(0, "Colorado", "State Tournament Colorado", "idk", 4);

    for (let i = 0; i < player_register_id; i++) {
        update_tournament_players(0, i);
    }

    run_round(0);

    let x = Math.round(Object.keys(player_register).length / 2);

    for (let i = 0; i < x; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 2 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 3 + i);
    }

    //console.log("Final scores", sort_wins(4, read_players_db(0)));
}

function test_case_4() {
    tournament_register = {};
    match_register = {};
    school_register = {};
    player_register = {};

    tournament_register_id = 0;
    match_register_id = 0;
    school_register_id = 0;
    player_register_id = 0;

    insert_school("Mountain Vista", "Colorado", "idk");

    insert_player("Josiah", "Jex", 0, 1000);
    insert_player("Logan", "Seader", 0, 1000);
    insert_player("Lacey", "Rael", 0, 1000);
    insert_player("Lucy", "Mock", 0, 1000);

    insert_school("Rock Canyon", "Colorado", "idk");

    insert_player("Rohan", "Kotwal", 1, 1000);
    insert_player("Anirudh", "Sura", 1, 1000);
    insert_player("Alex", "Hoover", 1, 1000);

    insert_tournament(0, "Colorado", "State Tournament Colorado", "idk", 4);

    for (let i = 0; i < player_register_id; i++) {
        update_tournament_players(0, i);
    }

    run_round(0);

    let x = Math.round(Object.keys(player_register).length / 2);

    for (let i = 0; i < x; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 2 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 3 + i);
    }

    //console.log("Final scores", sort_wins(4, read_players_db(0)));
}

function test_case_5() {
    tournament_register = {};
    match_register = {};
    school_register = {};
    player_register = {};

    tournament_register_id = 0;
    match_register_id = 0;
    school_register_id = 0;
    player_register_id = 0;

    insert_school("Mountain Vista", "Colorado", "idk");

    insert_player("Josiah", "Jex", 0, 1000);
    insert_player("Logan", "Seader", 0, 1000);
    insert_player("Lacey", "Rael", 0, 1000);
    insert_player("Lucy", "Mock", 0, 1000);
    insert_player("Tyler", "Simmons", 0, 1000);
    insert_player("Eric", "Perez", 0, 1000);
    insert_player("William", "Hoffman", 0, 1000);
    insert_player("Kendall", "Rael", 0, 1000);
    insert_player("Matthew", "Stangeland", 0, 1000);

    insert_tournament(0, "Colorado", "State Tournament Colorado", "idk", 4);

    for (let i = 0; i < player_register_id; i++) {
        update_tournament_players(0, i);
    }

    run_round(0);

    let x = Math.round(Object.keys(player_register).length / 2);


    for (let i = 0; i < x; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 2 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 3 + i);
    }

    //console.log("Final scores", sort_wins(4, read_players_db(0)));
}

function test_case_6() {
    tournament_register = {};
    match_register = {};
    school_register = {};
    player_register = {};

    tournament_register_id = 0;
    match_register_id = 0;
    school_register_id = 0;
    player_register_id = 0;

    insert_school("Mountain Vista", "Colorado", "idk");

    insert_player("Josiah", "Jex", 0, 1000);
    insert_player("Logan", "Seader", 0, 1000);
    insert_player("Lacey", "Rael", 0, 1000);
    insert_player("Lucy", "Mock", 0, 1000);
    insert_player("Logan", "Seader", 0, 1000);
    insert_player("Lacey", "Rael", 0, 1000);
    insert_player("Lucy", "Mock", 0, 1000);
    insert_player("Logan", "Seader", 0, 1000);
    insert_player("Lacey", "Rael", 0, 1000);

    insert_school("Rock Canyon", "Colorado", "idk");

    insert_player("Rohan", "Kotwal", 1, 1000);
    insert_player("Anirudh", "Sura", 1, 1000);
    insert_player("Alex", "Hoover", 1, 1000);
    insert_player("Rohan", "Kotwal", 1, 1000);
    insert_player("Anirudh", "Sura", 1, 1000);
    insert_player("Alex", "Hoover", 1, 1000);

    insert_tournament(0, "Colorado", "State Tournament Colorado", "idk", 4);

    for (let i = 0; i < player_register_id; i++) {
        update_tournament_players(0, i);
    }

    run_round(0);

    let x = Math.round(Object.keys(player_register).length / 2);


    for (let i = 0; i < x; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 2 + i);
    }

    run_round(0);
    for (let i = 0; i < x; i++) {
        random_match_result(x * 3 + i);
    }

    //console.log("Final scores", sort_wins(4, read_players_db(0)));
}

let ATTEMPT_AMOUNT = 10000;

if (process.argv[1].includes("pairing.mjs")) {
    test_case_1();
    console.log('\n\n\n\n')
    test_case_2();
    console.log('\n\n\n\n')
    test_case_3();
    //test_case_4();
    //test_case_5();
    //test_case_6();
}


/* end of testing */
