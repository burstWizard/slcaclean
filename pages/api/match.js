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
    if (req.method == "POST") {

        //Create default pairings with no data

        //first, figure out how many people are here!

        const players = await prisma.player.findMany({
            where: {
                sectionId: req.body.section
            }
        })

        const matchNum = Math.ceil(players.length / 2)

        let temp = []

        for (let i = 0; i < matchNum; i++) {
            temp.push({ roundId: req.body.round, board: i })
        }

        console.log(temp)

        const createMany = await prisma.match.createMany({
            data: temp
        })

        console.log(matchNum)

        res.status(200).json({ message: createMany });
    } else if (req.method == "DELETE") {
        await prisma.user.deleteMany({
            where: {
                roundId: req.body.matchData[0].roundId
            },
        })
    } else {
        const matches = await prisma.match.findMany({
            where: {
                roundId: req.query.roundId
            },
            orderBy: {
                board: "asc"
            }
        })

        res.status(200).json({ matches: matches });
    }
}