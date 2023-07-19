import { useState, useEffect } from "react";
import { ArrowDownIcon, PlusCircleIcon, CheckIcon, XMarkIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import Link from "next/link"
import { flushSync } from "react-dom";

export default function TournamentList({ active }) {

    const router = useRouter()

    //Hold List of Tournaments
    const [tournaments, setTournaments] = useState();

    const [addNew, setAddNew] = useState(false);
    const [tournamentToDelete, tournamentDelete] = useState(true)
    const [newTournamentName, setNewTournamentName] = useState("");

    //Get list of tournaments
    async function fetchTournaments() {
        // fetch tournament and give it to tournaments usingsetTournaments
        await fetch("/api/tourn")
            .then((res) => res.json())
            .then((data) => {
                setTournaments(data.tournamentList)
            })
    }

    //On inital render, run fetchTournaments
    useEffect(() => {
        fetchTournaments()
    })

    //Add new tournament
    async function addNewTournament() {

        await fetch("/api/tourn", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newTournamentName }),
        })

        fetchTournaments()
        setAddNew(false)
    }

    //delete tournament

    async function deleteTournament(id) {
        console.log(id)
        await fetch(`/api/tourn/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tournId: id })
        }
        ).then(() => fetchTournaments())
    }
    return (
        <div className='border-black border-r pr-4'>

            {/* Title */}
            <h1 className='font-bold text-2xl ml-2 '>Tournaments</h1>
            <hr className='mb-4 ml-2 mt-2' />

            {/* List of tournaments */}
            {tournaments && tournaments.map((item, index) => {

                const bg = item.id == active ? "bg-gray-300" : "hover:bg-gray-300"
                return (
                    <div>
                        <div style={{ display: "flex" }}>
                            <a href={"/tournaments/" + item.id} key={index}>
                                <h1 className={"font-bold text-xl rounded-lg py-2 px-2 pmb-4 transition ease-in-out cursor-pointer " + bg}> {item.name} </h1>

                            </a>
                            <TrashIcon style={{ width: 20, height: 20, marginTop: 12 }} onClick={() => { deleteTournament(item.id) }} />
                        </div>
                        <hr className='my-2' />

                    </div>
                )
            })}

            {/* No tournaments exist? */}
            {tournaments && tournaments.length == 0 &&
                <div className="flex justify-between items-center">
                    <ArrowDownIcon className="h-16 w-16 animate-bounce" />
                    <p className="font-bold text-purple-500 p-2">Looks like you have no tournaments! Click below to get started.</p>

                </div>
            }

            {/* Tournament Add UI */}
            {(tournaments && addNew) &&
                <div>
                    <div className='flex items-center space-x-2'>
                        <input value={newTournamentName} onChange={(e) => setNewTournamentName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="New Tournament Name" />
                        <button onClick={() => addNewTournament()} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                            <CheckIcon className='h-8 w-8' />
                        </button>
                        <button onClick={() => setAddNew(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded">
                            <XMarkIcon className='h-8 w-8' />
                        </button>
                    </div>
                    <hr className='my-2' />
                </div>
            }

            {/* Add New Tournament Button */}
            {(tournaments && !addNew) &&
                <div onClick={() => setAddNew(true)} className='flex  items-center space-x-2 font-bold text-xl rounded-lg py-2 px-2 pmb-4 hover:bg-gray-300 transition ease-in-out cursor-pointer'>
                    <PlusCircleIcon className='h-6 w-6 ' />
                    <h1>Create New Tournament</h1>
                </div>
            }
        </div>
    )
}