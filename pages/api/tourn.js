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
    if (req.method == 'DELETE') {
        console.log(Object.values(req.body)+'tournid')
        const tournament = await prisma.tournament.delete({
            where:{
                id:req.body.tournId,
            },
        })
    }
    if(req.method == "POST"){
        const tournament = await prisma.tournament.create({
            data:{
                name: req.body.name,
                userId: user.id
            }
        })
        res.status(200).json({message: "Hello"});
    }
    else{
        //Get list of tourneys
        console.log(user)
        const tournaments = await prisma.tournament.findMany({
            where:{
                userId: user.id}
            }
        );
        
        res.status(200).json({tournamentList: tournaments});
    }

}