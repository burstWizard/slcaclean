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

const Tournament = () => {
    const router = useRouter();
    const { tournamentId } = router.query

    const [selSection, setSelSection] = useState();
    const [focus, setFocus] = useState("roster")
    
    return(
        <div>
            <Head>
                <title>SLCA - Tournament System</title>
                <meta name="description" content="Student-Led Chess Association Tournament System" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation tab = "tournaments" />

            <div className='grid grid-cols-4 mt-4 mx-4'>
                <TournamentList active = {tournamentId} />
                
                {/* Only load when tournamentId loads */}
                {tournamentId && 
                    <div className={`col-span-3 px-4`} >
                        <SectionSelector activeTourney = {tournamentId} activeSection={selSection} setActiveSection={setSelSection}/>
                        <hr className='my-2'/>
                        
                        {selSection && <TabBar focus = {focus} setFocus={setFocus} />}
                        <hr className="my-2"/>
                        
                        {((focus == "roster")    && (selSection)) && <Roster section={selSection.value} />}
                        {((focus == "pairing")   && (selSection)) && <Pairing section={selSection.value}/>}
                        {((focus == "standings") && (selSection)) && <Standings section={selSection.value} />}
                    </div>
                }
            </div>
        </div>
    )
}

export default Tournament