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

        
        
        res.status(200).json({message: createMany});
    }
    else{
        //handle getting standings
        console.log(req.query.sectionId)

        const standings = await prisma.player.findMany({
            where:{
                sectionId: req.query.sectionId
            },
            orderBy:{
                record: "desc"
            },
            select:{
                name: true,
                record: true,
                school:{
                    select:{
                        name: true
                    }
                }
            }
        })
        
        res.status(200).json({ standings: standings });
    }
}