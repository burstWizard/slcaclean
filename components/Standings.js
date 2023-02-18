import { TrophyIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export default function Standings({section}){
    const [stands, setStands] = useState([])

    useEffect(()=>{
        const grabStandings = () =>{
            fetch("/api/standings?sectionId=" + section)
            .then((res)=>res.json())
            .then((data)=>{
                setStands(data.standings)
            })
        }
        grabStandings()

    }, [])
    return(
        <table>
            <thead>
                <tr>
                <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Rank</th>
                <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Name</th>
                <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>School</th>
                <th className='bg-gray-200  border border-black border-2 border-r border-b py-1 px-4'>Record</th>
                </tr>
            
            </thead>
            <tbody>
            {stands.map((item, index)=> {
                let color = "text-black"
                if(index==0){
                    color = "text-yellow-500 animate-pulse"
                }
                if(index==1){
                    color = "text-gray-500"
                }
                if(index==2){
                    color = "text-orange-700"
                }
                
                return(
                <tr className = {"text-center font-bold p-2 " + color} key = {index}>
                    <td className="border border-black p-2 text-2xl">{index+1}</td>
                    {index!=0 ? 
                        <td className="border border-black p-2 ">{item.name}</td>
                        :
                        <td className="border border-black p-2 ">
                            <div className="flex w-full items-center justify-center space-x-2">
                                <TrophyIcon className="h-5 w-5"/>
                                <p>{item.name}</p>
                            </div>
                        </td>
                    }
                    
                    <td className="border border-black p-2 ">{item.school.name}</td>
                    <td className="border border-black p-2 ">{item.record/10}</td>
                </tr>
                )
            })}
            </tbody>
        </table>
    )
}
