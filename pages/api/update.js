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

        //Create default pairings with no data

        //first, figure out how many people are here!
        console.log(req.body.matchData)
        for(const match of req.body.matchData){
          console.log(match.whiteId,match.blackId+'match')
            await prisma.match.update({
                where: {
                  id: match.id,
                },
                data: {
                  whiteId: match.whiteId != null ? match.whiteId : undefined,
                  blackId: match.blackId != null ? match.blackId : undefined,
                  result: match.result != null ? match.result : undefined
                },
              })
        }


        
        
        res.status(200).json({message: "hello"});
    }
    else{
        
        res.status(200).json({ message: "hello" });
    }
}