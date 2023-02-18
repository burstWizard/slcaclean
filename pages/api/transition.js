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

        
        console.log(req.body.roundId);
        console.log(req.body.sectionId)

        //the pairings are done, so let's lock it.
        const hello = await prisma.round.update({
            where:{
                id: req.body.roundId,
            },
            data:{
                locked: true
            }
        })

        //let's update everyone's record!

        //load up all the match results
        const results = await prisma.match.findMany({
            where:{
                roundId: req.body.roundId
            }
        })

        //actually update
        for(const result of results){
            console.log("hello")
            //get the white players score
            const otherThing = await prisma.player.update({
                where:{
                    id: result.whiteId
                },
                data:{
                    record: {increment: result.result}
                }
            })
            console.log(otherThing)
            //get the black players score
            const thing = await prisma.player.update({
                where:{
                    id: result.blackId
                },
                data:{
                    record: {increment: (10-(result.result))}
                }
            })
            console.log(thing)
        }
        

        //let's create the next round
         await prisma.round.create({
             data:{
                 num: hello.num+1,
                 sectionId: req.body.sectionId,
                 locked: false
             }
         })
        

        console.log(hello)

        res.status(200).json({message: "hello how are you!"});
    }
    else{
        
        
        res.status(200).json({ message: "hi, hello!"});
    }
}