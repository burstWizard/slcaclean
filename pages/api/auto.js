import prisma from "../../lib/prisma"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"
import {Swiss} from 'tournament-pairings'; 

const hello = require('swiss-pairing')()

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)
    let swiss_pairings = []
    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
    })
    
    if(req.method == "POST"){
        res.status(200).json({ message: "This doesn't do anything!"});
    }
    else{

        //get the active round
        const round = await prisma.round.findUnique({
            where:{
                id: req.query.roundId
            }
        })

        console.log(round.num)

        //build the list of participants
        const players = await prisma.player.findMany({
            where: {
                sectionId: req.query.sectionId,
            },
        });
        let participants = []
        for(const player of players){
            let teamList = []
            for (const restOfPlayers of players){
                if (restOfPlayers.schoolId == player.schoolId && restOfPlayers.id != player.id) {
                    teamList.push(restOfPlayers.id)
                }
            }
            participants.push(
                {
                    'id': player.id,
                    'score':player.record,
                    'avoid':teamList,
                }
            )
        }

        console.log(participants)

        //Get all the PREVIOUS matches.
        const matchData = await prisma.match.findMany({
            where:{
                round:{
                    sectionId: req.query.sectionId,
                    num: {
                        lt: round.num
                    }
                },  
            },
            select:{
                whiteId:true,
                blackId:true,
                result: true,
                round:{
                    select:{
                        num:true
                    }
                }
            }
        })
        console.log(matchData,'match dataaaaa')

        let realMatches = []

        for(const match of matchData){
            realMatches.push({
                'round': match.round.num,
                'home':{
                    'id': match.whiteId,
                    'points': match.result/10
                },
                'away':{
                    'id': match.blackId,
                    'points': (10-match.result)/10
                }
            })

        }

        console.log(realMatches,'matchesss')
        

        const newPairings = Swiss(participants,round.num,false,true)
        console.log(newPairings,"new pairingsssssssssss")
        const excellentRes = hello.getMatchups(2, participants, realMatches)
        console.log(excellentRes)

        //acquire the current matches.
        let currMatches = await prisma.match.findMany({
            where:{
                roundId: req.query.roundId
            }
        })
        console.log(currMatches,'current matches')
        //now to update the match pairings.
        
        let temp = []
        for (let i = 0; i < newPairings.length; i++) {
            temp.push({
                id: currMatches[i].id,
                whiteId: newPairings[i].player1,
                blackId: newPairings[i].player2
            })
        }
        console.log(temp,'tempppppp')
        for(const item of temp){
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
        

        res.status(200).json({ message: "Pairing Success! Please Refresh Round Data."});
    }
}


