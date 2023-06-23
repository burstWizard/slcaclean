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
        const section = await prisma.section.create({
            data:{
                name: req.body.name,
                tournamentId: req.body.tournamentId
            }
        })
        res.status(200).json({message: "Success!"});
    }
    if (req.method=='DELETE'){
        console.log('idddddddd',req.body.name)
        const section = await prisma.section.delete({
            where: {
                id:req.body.name,
            },
        })
        res.status(200).json({message: "Success!"});
    }
    else{
        //Get list of sections

        const sections = await prisma.section.findMany({
            where:{
                tournamentId: req.query.tournamentId
            }
        });
        console.log(sections)
        
        res.status(200).json({sectionList: sections});
    }
}