import { useState, useEffect } from "react";
import { checkMatchSaved, matchSaved } from "./Pairing";
export default function TabBar({focus, setFocus}){

    return(
        <div className='flex space-x-4 cursor-pointer'>
            <h1 onClick = {()=>setFocus("roster")} className={focus=="roster" ? 'font-bold bg-purple-300 py-1 px-2 rounded-lg' : "font-bold hover:bg-purple-300 py-1 px-2 rounded-lg"}>Roster</h1>
            <h1 onClick = {()=>setFocus("pairing")} className={focus=="pairing" ? 'font-bold bg-purple-300 py-1 px-2 rounded-lg' : "font-bold hover:bg-purple-300 py-1 px-2 rounded-lg"}>Pairing</h1>
            <h1 onClick = {()=>setFocus("standings")} className={focus=="standings" ? 'font-bold bg-purple-300 py-1 px-2 rounded-lg' : "font-bold hover:bg-purple-300 py-1 px-2 rounded-lg"}>Standings</h1>
        </div>
    )
}