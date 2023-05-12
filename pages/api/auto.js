import prisma from "../../lib/prisma"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"

const hello = require('swiss-pairing')();

const pairing = require('./pairing');

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

    console.log("auto pairing");

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })

    if (req.method == "POST") {
        res.status(200).json({ message: "This doesn't do anything!" });
    }
    else {

        //get the active round
        const round = await prisma.round.findUnique({
            where: {
                id: req.query.roundId
            }
        })

        const schools = await prisma.school.findMany({
            where: {
                id: req.query.id,
                name: req.query.name,
                sectionId: req.query.sectionId,
            }
        })

        //build the list of participants
        const players = await prisma.player.findMany({
            where: {
                sectionId: req.query.sectionId,
                schoolId: req.query.schoolId,
            },
        });

        //Get all the PREVIOUS matches.
        const matchData = await prisma.match.findMany({
            where: {
                round: {
                    sectionId: req.query.sectionId,
                    num: {
                        lt: round.num
                    }
                },
            },
            select: {
                whiteId: true,
                blackId: true,
                result: true,
                round: {
                    select: {
                        num: true
                    }
                }
            }
        })

        console.log(matchData);

        pairing.clearAll();

        // Turn matches into form acceptable by pairing.js
        pairing.insert_tournament(null, null, null, null, Infinity);

        let player_to_school_temp = {};

        for (const school of schools) {
            player_to_school_temp[school.id] = pairing.school_register_id;
            pairing.insert_school(school.name, null, null, school.id);
        }

        let pairing_to_player = {};

        for (const player of players) {
            pairing_to_player[pairing.player_register_id] = player.id;
            pairing.insert_player(null, null, player_to_school_temp[player.schoolId], player.id);
        }

        for (const match of matchData) {
            pairing.insert_match(0, match.round.num, match.whiteId, match.blackId);
            if (match.result == 0) {
                pairing.update_match(pairing.match_register_id - 1, match.blackId, match.whiteId);
            }
            if (match.result == 5) {
                pairing.update_match(pairing.match_register_id - 1, -1, -1);
            }
            if (match.result == 10) {
                pairing.update_match(pairing.match_register_id - 1, match.whiteId, match.blackId);
            }
        }

        for (let i = 0; i < pairing.player_register_id; i++) {
            pairing.update_tournament_players(0, i);
        }


        let temp2 = pairing.run_round(0);
        let new_matches = temp2[0], bye_player = temp2[1];

        let currMatches = await prisma.match.findMany({
            where: {
                roundId: req.query.roundId
            }
        })

        let temp = []
        for (let i = 0; i < new_matches.length; i++) {
            temp.push({
                id: currMatches[i].id,
                whiteId: pairing_to_player[new_matches[i].white_index],
                blackId: pairing_to_player[new_matches[i].black_index],
            })
        }

        for (const item of temp) {
            await prisma.match.update({
                where: {
                    id: item.id,
                },
                data: {
                    whiteId: item.whiteId,
                    blackId: item.blackId,
                    result: null
                },
            })
        }

        if (bye_player) {
            await prisma.match.update({
                where: {
                    id: currMatches[currMatches.length - 1].id,
                },
                data: {
                    whiteId: pairing_to_player[bye_player],
                    blackId: null,
                    result: 10,
                },
            });
        }


        /*
        let participants = []
        for (const player of players) {
            participants.push(
                {
                    'id': player.id
                }
            )
        }

        let realMatches = []

        for (const match of matchData) {
            realMatches.push({
                'round': match.round.num,
                'home': {
                    'id': match.whiteId,
                    'points': match.result / 10
                },
                'away': {
                    'id': match.blackId,
                    'points': (10 - match.result) / 10
                }
            })
        }

        console.log(realMatches)

        const excellentRes = hello.getMatchups(2, participants, realMatches)
        console.log(excellentRes)

        //acquire the current matches.
        let currMatches = await prisma.match.findMany({
            where: {
                roundId: req.query.roundId
            }
        })

        //now to update the match pairings.
        let temp = []
        for (let i = 0; i < excellentRes.length; i++) {
            temp.push({
                id: currMatches[i].id,
                whiteId: excellentRes[i].home,
                blackId: excellentRes[i].away
            })
        }

        for (const item of temp) {
            await prisma.match.update({
                where: {
                    id: item.id,
                },
                data: {
                    whiteId: item.whiteId,
                    blackId: item.blackId,
                    result: null
                },
            })
        }
        */

        res.status(200).json({ message: "Pairing Success! Please Refresh Round Data." });
    }
}


