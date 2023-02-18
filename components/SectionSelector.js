import { ArrowLeftIcon, PlusCircleIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import Select from 'react-select'


export default function SectionSelector({activeTourney, activeSection, setActiveSection}){

    const [sections, setSections] = useState();
    
    const [addNew, setAddNew] = useState(false);
    const [newSectionName, setNewSectionName] = useState("");

    async function fetchSections(){
        const res = await fetch("/api/sections?tournamentId=" + activeTourney)
        const data = await res.json()
        
        let temp = []

        for(const element of data.sectionList){
            temp.push({value: element.id, label: element.name})
        }
        setSections(temp)
        setActiveSection(temp[0])
    }

    useEffect(()=>{
        //first time setup
        fetchSections()

        //set active section to first of sections
    }, [])

    

    async function addNewSection(){
        // Add new section using newSectionName and regerence active Tourney
        // Request the list of sections
        // Pass it to setSections
        // set it as active, maybe
        await fetch("/api/sections", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({name: newSectionName, tournamentId: activeTourney}),
        })
        fetchSections();
        setAddNew(false)
    } 

    return(
        <div className='flex items-center space-x-2'>
            
            {sections && <h1 className='font-bold  rounded-lg'>Section:</h1>}
            {sections && <Select options={sections} value = {activeSection} onChange={setActiveSection} className = "w-40"/>}

            {(sections && addNew) && 
                <div>
                    <div className='flex items-center space-x-2'>
                        <input value = {newSectionName} onChange = {(e)=>setNewSectionName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="New Section Name" />
                        <button onClick={()=>addNewSection()} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                            <CheckIcon className='h-8 w-8' />
                        </button>
                        <button onClick = {()=>setAddNew(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded">
                            <XMarkIcon className='h-8 w-8' />
                        </button>
                    </div>
                    
                </div>
            }

            {(sections && !addNew) &&
                <div className="flex items-center">
                    <div onClick={()=>setAddNew(true)} className='flex items-center space-x-2 font-bold  py-2 px-2 pmb-4 bg-purple-500 hover:bg-purple-700 text-white transition ease-in-out cursor-pointer '>
                        <PlusCircleIcon className='h-6 w-6 '/>
                        <h1>Create New Section</h1>
                    </div>
                    {sections.length==0 && 
                    <div className="flex items-center mx-2 space-x-2 animate-pulse">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <p>This tournament has no sections. Create one!</p>
                    </div>
                    }
                </div>
            }
        </div>
    )
}