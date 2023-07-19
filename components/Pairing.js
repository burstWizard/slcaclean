import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { BoltIcon, CloudArrowUpIcon, HandRaisedIcon, ArrowRightCircleIcon, LockClosedIcon, TrashIcon } from "@heroicons/react/20/solid";
import Select from "react-select";
import Modal from "./modal";
export let matchSaved = true;
export function checkMatchSaved() {
    matchSaved = false;
}
export default function Pairing({ section, generatedRounds, setGeneratedRounds }) {

    const [roundInfo, setRoundInfo] = useState()
    const [activeRound, setActiveRound] = useState()
    const [matchData, setMatchData] = useState([])
    const [activeRoundLocked, setActiveRoundLocked] = useState()
    const [sync, setSync] = useState([])
    const [matchesSaved, setMatchesSaved] = useState(false);
    const router = useRouter();

    //Fetch Rounds from the "Rounds" table.
    async function fetchRounds() {
        await fetch("/api/rounds?sectionId=" + section)
            .then((res) => res.json())
            .then((data) => {
                setRoundInfo(data.rounds)

                console.log(data.rounds)

                if (data.rounds.length > 0) {
                    console.log("data.round", data.rounds)
                    console.log(data.rounds.length - 2);
                    setGeneratedRounds(data.rounds.length - 2)
                    if (!activeRound) {
                        setActiveRound(data.rounds[data.rounds.length - 1].id)
                        setActiveRoundLocked(data.rounds[data.rounds.length - 1].locked)
                    }
                }
            })
    }

    //Will get the current active round match data.
    async function fetchMatchData() {
        const res = await fetch("/api/match?roundId=" + activeRound)
        const data = await res.json()
        setMatchData(data.matches)
        setSync(true)
    }

    //Initial Setup, get the rounds
    useEffect(() => {
        fetchRounds()
    })

    useEffect(() => {
        console.log(sync)
    }, [sync])

    //Whenever activeRound, fetch new Match Data.
    useEffect(() => {
        if (activeRound) fetchMatchData()
    }, [activeRound])

    //Whenever you hit this, it will hands-down fully create a new round.
    async function createNextRound() {
        matchSaved = false;
        const res = await fetch("/api/final", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sectionId: section, roundId: activeRound, rounds: roundInfo.length }),
        });
        const data = await res.json();
        fetchRounds();
        setActiveRound(data.message)
        fetchMatchData();
        console.log(roundInfo)
        //setGeneratedRounds(roundInfo + 1);

    }

    async function lockRound() {
        if (matchSaved) {
            const res = await fetch('/api/final', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sectionId: section, roundId: activeRound, setting: 'lock' })
            })
            fetchRounds()
        }
        else {
            alert('Oh no! You haven\' saved your matches!')
        }

    }

    //Update the match data for current round in the db.
    async function save() {
        console.log(matchData);

        let unfinished = false;

        for (let match of matchData) {
            if (match.result == null) {
                //console.log(match.result, match.result != 10 || match.result != 0 || match.result != 5)
                unfinished = true;
            }
        }

        if (unfinished) {
            alert("Oh no! It looks like all your matches don't have results! Unable to save matches :(")
        } else {

            setMatchesSaved(true);
            matchSaved = true;
            //console.log('match data' + matchData)
            await fetch("/api/update", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matchData: matchData }),
            })
        }
    }

    //delete the current round

    async function deleteRound() {
        if (roundInfo.length == 1) {
            matchSaved = true;
        }
        const res = await fetch('/api/update', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matchData: matchData })
        })

        const deletedMatches = await fetch('api/match', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matchData: matchData })
        });


        const data = await res.json()
        setGeneratedRounds(generatedRounds - 1);
        console.log("Deleted round", data)
        fetchMatchData()
        router.reload(window.location.pathname)
    }

    async function autoPair(target) {
        console.log("Starting to autopair")
        document.getElementById("autopairLabel").innerText = "Loading..."
        try {
            const res = await fetch("/api/auto?sectionId=" + section + "&roundId=" + activeRound);
            const data = await res.json();
            console.log(data)
            fetchMatchData()
            //alert("Successfully paired!")
        } catch {
            alert("There was an error...")
        }
        document.getElementById("autopairLabel").innerText = "Auto-Pair Round"

    }
    useEffect(() => console.log(activeRound + " " + activeRoundLocked), [activeRoundLocked])


    return (
        <div>
            {roundInfo && roundInfo.length == 0 &&
                <div>
                    <p className="pb-2">There are no rounds created for this section. Create the first one by clicking below.</p>
                    <button onClick={createNextRound} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Create Round!</button>
                </div>
            }
            {(roundInfo && activeRound) &&
                <div>

                    {/* Display the Rounds with Seperate Squares */}

                    <div className="flex space-x-2 items-center">
                        <p>Rounds: </p>
                        {roundInfo.map((item, index) => {
                            const bg = activeRound == item.id ? "bg-purple-600" : "bg-purple-400 hover:bg-purple-600"
                            return (
                                <div key={index} onClick={() => {
                                    setActiveRound(item.id)
                                    setActiveRoundLocked(roundInfo[item.num - 1].locked)
                                }}
                                    className={"p-1 w-10 text-white text-center items-center rounded font-bold text-xl " + bg}>
                                    {item.num}
                                </div>
                            )
                        })}
                    </div>

                    {/* Manual Pairing Table */}
                    {(matchData.length > 0 && !activeRoundLocked) && <ManualPairingTable activeRound={activeRound} matches={matchData} setMatches={setMatchData} section={section} round={activeRound} setSync={setSync} />}
                    {(matchData.length > 0 && activeRoundLocked) && <LockedDisplayTable matches={matchData} section={section} />}

                    {/* Controls for pairing, including auto, save, and finalize. */}
                    {(!activeRoundLocked && matchData.length > 0) &&
                        <div className="flex items-center space-x-2">
                            <button onClick={e => autoPair(e.target)} className="flex space-x-2 items-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
                                <BoltIcon className='h-5 w-5' />
                                <p id="autopairLabel">Auto-Pair Round</p>
                            </button>
                            <button onClick={save} className="flex items-center space-x-2 disabled items-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded max-w-fit cursor-pointer">
                                <CloudArrowUpIcon className="h-5 w-5" />
                                <p>Save Matches</p>
                            </button>
                            <button onClick={deleteRound} className="flex space-x-2 items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                <TrashIcon className="h-5 w-5" />
                                <p>Delete Current Round</p>
                            </button>

                            {matchSaved && <button onClick={lockRound} className="flex space-x-2 items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                <LockClosedIcon className="h-5 w-5" />
                                <p>Lock Current Round</p>
                            </button>}

                        </div>
                    }
                    {(activeRoundLocked && matchData.length > 0) &&
                        <div>
                            {generatedRounds < roundInfo.indexOf(roundInfo.find(e => e.id == activeRound)) && (
                                <Modal createNextRound={createNextRound} disabled={!sync} saved={true} text={'Generate Next Round'} />
                            )}
                            <br></br>
                            <p className="italic" onLoad={console.log("Latest round", roundInfo.indexOf(roundInfo.find(e => e.id == activeRound)))}>Results are final & cannot be modified.</p>
                        </div>
                    }

                </div>
            }
        </div>
    )
}


function LockedDisplayTable({ matches, section }) {

    const [playerDict, setPlayerDict] = useState();

    async function fetchPlayerNames() {
        const res = await fetch("/api/roster?sectionId=" + section)
        const data = await res.json();
        let temp = {}

        //Build dictionary of student names.
        for (const school of data.roster) {
            for (const player of school[1]) {
                const label = player.name + " (" + player.record / 10 + ") - " + school[0].name
                temp[player.id] = label
            }
        }


        setPlayerDict(temp)

    }

    useEffect(() => {
        fetchPlayerNames()
    }, [])

    return (
        <div className="my-2">
            <table className=" border-2 p-2 border-black table-auto">
                <thead>
                    <tr>
                        <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Board</th>
                        <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>White</th>
                        <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Black</th>
                        <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {playerDict && matches.map((element, index) => {
                        return (
                            <LockedTableRow key={index} white={playerDict[element.whiteId]} black={playerDict[element.blackId]} element={element} index={index} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

function LockedTableRow({ element, white, black, index }) {
    return (
        <tr>
            <td className='border border-r border-2 border-black text-center font-bold'>
                {element.board + 1}
            </td>

            <td className='border border-r border-2 border-black text-center w-1/3 p-2'>
                <p>{white}</p>
            </td>
            <td className="border border-r border-2 border-black text-center w-1/3 p-2">
                <p>{black}</p>
            </td>
            <LockedResultBox result={element.result} />
        </tr>
    )
}

function LockedResultBox({ result }) {
    return (
        <td className='border border-r border-2 border-black text-center '>
            <div className="flex items-center space-x-2 p-2 justify-center w-full">
                <div className={`font-bold text-white p-2 rounded-lg border-black border-1 cursor-default ${result == 10 ? "bg-purple-500 " : "bg-purple-300"}`}>White</div>
                <div className={`font-bold text-white p-2 rounded-lg border-black border-1 cursor-default ${result == 5 ? "bg-purple-500 " : "bg-purple-300"}`}>Draw</div>
                <div className={`font-bold text-white p-2 rounded-lg border-black border-1 cursor-default ${result == 0 ? "bg-purple-500 " : "bg-purple-300"}`}>Black</div>
            </div>
        </td>
    )
}

function ManualPairingTable({ activeRound, matches, setMatches, section, setSync }) {
    const [playerOptions, setPlayerOptions] = useState([])

    async function fetchData() {
        const res = await fetch("/api/roster?sectionId=" + section)
        const data = await res.json();
        let temp = [];

        for (const school of data.roster) {
            for (const player of school[1]) {
                const label = player.name + " (" + player.record / 10 + ") - " + school[0].name
                temp.push({ label: label, value: player.id })
            }
        }

        setPlayerOptions(temp)
    }

    useEffect(() => {
        fetchData()
    }, [activeRound])

    return (
        <div className="my-2">
            <table className=" border-2 p-2 border-black table-auto">
                <thead>
                    <tr>
                        <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Board</th>
                        <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>White</th>
                        <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Black</th>
                        <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((element, index) => {
                        return (
                            <TableRow key={index} element={element} index={index} matches={matches} setMatches={setMatches} players={playerOptions} setSync={setSync} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


function TableRow({ element, index, matches, setMatches, players, setSync }) {

    const [whiteOption, setWhiteOption] = useState(null)
    const [blackOption, setBlackOption] = useState(null)

    //Initialize whiteOption & BlackOption
    useEffect(() => {
        // console.log("Row: " + index)
        // console.log(element)

        let whiteFill = null;
        let blackFill = null;

        //Search the list and see if they match, set it as the correct player.
        for (const player of players) {
            //See if any intersect
            if (element.whiteId == player.value) whiteFill = player
            if (element.blackId == player.value) blackFill = player
        }

        setWhiteOption(whiteFill);
        setBlackOption(blackFill)

    }, [players, element])



    //Whenever whiteOption or blackOption Change, then change the corresponding match value
    //always keep them in sync
    useEffect(() => {
        if (whiteOption) {
            let temp = matches
            temp[index].whiteId = whiteOption.value
            setMatches(temp)
            console.log("mfer")
        }
    }, [whiteOption])

    useEffect(() => {
        if (blackOption) {
            let temp = matches
            temp[index].blackId = blackOption.value
            setMatches(temp)
        }
    }, [blackOption])

    return (
        <tr>
            <td className='border border-r border-2 border-black text-center font-bold'>
                {element.board + 1}
            </td>

            <td className='border border-r border-2 border-black text-center w-1/3 p-2'>
                <Select options={players} value={whiteOption} onChange={setWhiteOption} />
            </td>
            <td className="border border-r border-2 border-black text-center w-1/3 p-2">
                <Select options={players} value={blackOption} onChange={setBlackOption} />
            </td>
            <NewResultBox index={index} roundData={matches} setRoundData={setMatches} />
        </tr>
    )
}

function NewResultBox({ index, roundData, setRoundData }) {

    const [counter, setCounter] = useState(0);

    function updateScore(score) {
        let temp = roundData
        temp[index].result = score;
        setRoundData(temp)
        //shit update logic
        setCounter(counter + 1)

    }
    return (
        <td className='border border-r border-2 border-black text-center '>
            <div className="flex items-center space-x-2 p-2 justify-center w-full">
                <div onClick={() => updateScore(10)} className={`font-bold text-white p-2 rounded-lg border-black border-1 cursor-pointer ${roundData[index].result == 10 ? "bg-purple-500 " : "bg-purple-300 hover:bg-purple-500"}`}>White</div>
                <div onClick={() => updateScore(5)} className={`font-bold text-white p-2 rounded-lg border-black border-1 cursor-pointer ${roundData[index].result == 5 ? "bg-purple-500 " : "bg-purple-300 hover:bg-purple-500"}`}>Draw</div>
                <div onClick={() => updateScore(0)} className={`font-bold text-white p-2 rounded-lg border-black border-1 cursor-pointer ${roundData[index].result == 0 ? "bg-purple-500 " : "bg-purple-300 hover:bg-purple-500"}`}>Black</div>
            </div>
        </td>
    )
}