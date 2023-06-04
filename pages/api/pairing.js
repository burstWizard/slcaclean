// pairing.js
// An almost line-to-line translation of Jared's code :)

/* start of db-calls.py*/
/* constants */
const PLAYER_PAUSED = 0;
const PLAYER_ACTIVE = 1;

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
            score: get_player_wins(tournament_index, player_index),
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

    for (let xx = 0; xx <= current_round + 2; xx++) {
        win_list.push([]);
    }

    // Place players in based on their record in the tournament;
    for (let player_index of Object.keys(players)) {
        let player = players[player_index];
        let total_wins = player.record.win + player.record.draw;
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

function old_make_matches(players, players_nums, leftover) {

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

    // Increment current round
    current_round++;

    let tries = 0;
    let new_matches;
    let leftover;

    console.log("Player scores : ", sort_wins(current_round, players));

    let failed;

    console.log("Starting matching process");
    console.log(sort_wins(current_round, players));

    while (tries < ATTEMPT_AMOUNT) {
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

        for (let match of matches) {
            if (
                players[match.white_index].school == players[match.black_index].school
            ) {
                failed = true;
            }
        }

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
                _failed = true;
            }
        }

        new_matches = matches;
        leftover = _leftover;

        if (!failed) {
            break;
        }
    }

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

    console.log("Color disregard pairing?", failed);

    if (
        new_matches.length < Math.floor(Object.keys(players).length / 2) ||
        failed
    ) {
        failed = false;
        console.log("Not accounting for score now");
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

    console.log("Score disregard pairing?", failed);

    if (
        new_matches.length < Math.floor(Object.keys(players).length / 2) ||
        failed
    ) {
        failed = false;
        console.log("Not accounting for score now");
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

    if (
        new_matches.length < Math.floor(Object.keys(players).length / 2) ||
        failed
    ) {
        console.log("Disregarding score all the way");
        let tries = 0;
        let min_errors = Infinity;
        while (true) {
            if (tries % 100000 == 0) console.log("Full pairing attempt:", tries);
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

            if (tries > 800000) {
                //console.log("old matching")
                temp = old_make_matches(players, ww, leftover)
            }

            if (temp == "score_error") {
                continue;
            }

            n_matches = temp.new_matches;
            _leftover = temp.ll;

            if (_leftover == null) {
                _leftover = [];
            }

            // Update new matches
            matches.push(...n_matches);

            let _failed = false;
            let _errors = 0;

            for (let i = 0; i < matches.length; i++) {
                let match = matches[i];
                for (let m of players[match.white_index].matches) {
                    if (m.opponent == match.black_index) {
                        //console.log("repeat")
                        _failed = true;
                        _errors++;
                    }
                }

                if (Math.abs(players[match.white_index].score - players[match.black_index].score) > 1) {
                    //console.log("point diff")
                    _failed = true;
                    _errors++;
                }

                if (
                    players[match.white_index].school == players[match.black_index].school
                ) {
                    //console.log("school")
                    _failed = true;
                    _errors++;
                }
            }

            if (_errors < min_errors) {
                min_errors = _errors;
            }

            //console.log(matches.length, Math.floor(Object.keys(players).length / 2), failed, _errors)

            if (tries > 400000) {
                if (_errors <= 1) {
                    _failed = false;
                }
            }

            if (tries > 700000) {
                if (_errors <= 2) {
                    _failed = false;
                }
            }

            if (tries > 1000000) {
                if (_errors <= min_errors) {
                    _failed = false;
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
        }
    }

    console.log("Made matches");
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

    console.log(leftover);

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

        console.log(missing_player);

        leftover.push(missing_player);
    }

    // Insert the bye match, if there is one
    if (leftover.length > 0) {
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

    if (Math.random() > 0.5) {
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

    for (let i = 0; i < 4; i++) {
        random_match_result(0 + i);
    }

    run_round(0);

    for (let i = 0; i < 4; i++) {
        random_match_result(4 + i);
    }

    run_round(0);

    for (let i = 0; i < 4; i++) {
        random_match_result(8 + i);
    }
    run_round(0);

    for (let i = 0; i < 4; i++) {
        random_match_result(12 + i);
    }

    console.log("Final scores", sort_wins(4, read_players_db(0)));
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

    for (let i = 0; i < 10; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < 10; i++) {
        random_match_result(10 + i);
    }

    run_round(0);
    for (let i = 0; i < 10; i++) {
        random_match_result(20 + i);
    }
    run_round(0);
    for (let i = 0; i < 10; i++) {
        random_match_result(30 + i);
    }

    console.log("Final scores", sort_wins(4, read_players_db(0)));

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

    for (let i = 0; i < 23; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < 23; i++) {
        random_match_result(23 + i);
    }

    run_round(0);
    for (let i = 0; i < 23; i++) {
        random_match_result(46 + i);
    }

    run_round(0);
    for (let i = 0; i < 23; i++) {
        random_match_result(69 + i);
    }

    console.log("Final scores", sort_wins(4, read_players_db(0)));
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

    for (let i = 0; i < 4; i++) {
        random_match_result(0 + i);
    }

    run_round(0);
    for (let i = 0; i < 4; i++) {
        random_match_result(4 + i);
    }

    run_round(0);
    for (let i = 0; i < 4; i++) {
        random_match_result(8 + i);
    }

    run_round(0);
    for (let i = 0; i < 4; i++) {
        random_match_result(12 + i);
    }

    console.log("Final scores", sort_wins(4, read_players_db(0)));
}

const ATTEMPT_AMOUNT = 100000;


//test_case_1();
//console.log("\n");
//test_case_2();
//console.log("\n");
//test_case_3();
//console.log("\n");
//test_case_4();

/* end of testing */
