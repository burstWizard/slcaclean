import { useRouter } from 'next/router'
import Navigation from '../../components/navigation';
import Pairing from '../../components/Pairing';
import Roster from '../../components/Roster';
import SectionSelector from '../../components/SectionSelector';
import Standings from '../../components/Standings';
import TabBar from '../../components/TabBar';
import TournamentList from '../../components/TournamentList';

import { useState, useEffect } from "react";
import Head from 'next/head'
import { PuzzlePieceIcon, RocketLaunchIcon } from '@heroicons/react/20/solid';

const TournamentHome = () => {
    
    
    return(
        <div>
            <Head>
                <title>SLCA - Tournament System</title>
                <meta name="description" content="Student-Led Chess Association Tournament System" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation tab = "tournaments" />

            <div className='grid grid-cols-4 mt-4 mx-4'>
                <TournamentList  />
                
                {/* Only load when tournamentId loads */}
                <div className='p-2  w-full col-span-3 flex justify-center items-center h-64'>
                    <div>
                        <RocketLaunchIcon className='h-24 w-24' />
                        <p className='text-4xl font-bold'><span className = "text-purple-500">SLCA</span> Tournament Direction System.</p>
                        <p className='text-xl '>View the sidebar to get started.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TournamentHome