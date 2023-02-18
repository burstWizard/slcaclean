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
        //Create a new round in this section
        const rounds = await prisma.round.findMany({
            where:{
                sectionId: req.body.sectionId
            }
        })

        //First round creation
        if(rounds.length ==0){
            console.log("Giiig")
            const round = await prisma.round.create({
                data:{
                    sectionId: req.body.sectionId,
                    locked: false,
                    num: 1
                }
            })
        }
        //Rounds exist
        else{

            const lastRound = rounds[rounds.length-1]
            if(!lastRound.locked){
                console.log("Last round has to be locked!")
            }
            else{
                console.log("Hello!")
                const round = await prisma.round.create({

                    data:{
                        sectionId: req.body.sectionId,
                        locked: false,
                        num: lastRound.num+1
                    }
                })
            }

        }
        
        res.status(200).json({message: "Hello"});
    }
    else{
        const rounds = await prisma.round.findMany({
            where:{
                sectionId: req.query.sectionId
            },
            orderBy:{
                num: 'asc'
            }
        })
        
        res.status(200).json({ rounds: rounds });
    }
}