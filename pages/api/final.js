import prisma from "../../lib/prisma"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

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
        
        //if this is first round creation, then roundId will be null!
        console.log(req.body.roundId);
        console.log(req.body.sectionId);
        
        let newRoundNum = 1;
        
        if (req.body.setting=='lock'){
            const latestRound = await prisma.round.update({
                where:{
                    id: req.body.roundId,
                },
                data:{
                    locked: true
                }
            })
            const results = await prisma.match.findMany({
                where:{
                    roundId: req.body.roundId
                }
            });
            for(const result of results){
                console.log(result,'resulttt')
                if(result.whiteId){
                    //Update the white players score.
                    await prisma.player.update({
                        where:{
                            id: result.whiteId
                        },
                        data:{
                            record: {increment: result.result}
                        }
                    });
                }

                //Update the black players score.
                if(result.blackId){
                    await prisma.player.update({
                        where:{
                            id: result.blackId
                        },
                        data:{
                            record: {increment: (10-(result.result))}
                        }
                    })
                }
                
            }
            res.status(200).json({message:'success'})
        }
        else {
        //If previous rounds exist!
        if(!(typeof req.body.roundId == 'undefined')){

            //Lock the previous round.
            
            //Updating player records

            //First, obtain what actually happened in the round.
            
            /*const results = await prisma.match.findMany({
                where:{
                    roundId: req.body.roundId
                }
            });*/
            /*for(const result of results){

                if(result.whiteId){
                    //Update the white players score.
                    await prisma.player.update({
                        where:{
                            id: result.whiteId
                        },
                        data:{
                            record: {increment: result.result}
                        }
                    });
                }

                //Update the black players score.
                if(result.blackId){
                    await prisma.player.update({
                        where:{
                            id: result.blackId
                        },
                        data:{
                            record: {increment: (10-(result.result))}
                        }
                    })
                }
                
            }*/
            console.log(req.body.rounds,'roundsss')
            newRoundNum = req.body.rounds+1

        }

        //Now, functions occur regardless of whether this is the first round or not.

        //Creating the New Round in Round DB.
        const newRound = await prisma.round.create({
            data:{
                sectionId: req.body.sectionId,
                locked: false,
                num: newRoundNum
            }
        });
        
        //Genearte the sample data
        await generateSampleData(newRound.id, req.body.sectionId);

        console.log("hello! function done!")

        res.status(200).json({message: newRound.id});
    }
    }
    else{
        res.status(200).json({ message: "This doesn't do anything!"});
    }
}


//Generate the sample data.
async function generateSampleData(newRoundId, sectionId){
    
    const players = await prisma.player.findMany({
        where:{
            sectionId: sectionId
    }})

    const matchNum = Math.ceil(players.length / 2)

    let temp = []

    for (let i = 0; i < matchNum; i++) {
        temp.push({roundId: newRoundId, board: i})
    }

    await prisma.match.createMany({
        data: temp 
    })
}