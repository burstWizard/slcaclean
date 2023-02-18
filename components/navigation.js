import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession} from "next-auth/react"
import { useRouter } from 'next/router'

export default function Navigation({tab}){
  
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div></div>
  }

  /*if (status === "unauthenticated") {
    router.push("/")
  }*/


    return(
      <div className='px-4 py-4 bg-black'>
        <nav className='flex justify-between mb-2  items-center font-bold cursor-pointer text-white'>
          {/* Logo */}
          <Image src = "/slca_logo.png" height = {75} width = {123.75}/>

          {/* Contain all site page links */}
          <div className='flex items-center space-x-8'>

            {/* Tournaments Link */}
            <Link href = "/tournaments">
              <div className='text-center justify-center flex flex-col items-center'>
                <TournamentIcon selected = {tab == "tournaments"}/>
                <h1 className={tab == "tournaments" ? "text-purple-500" : ""}>Tournaments</h1>
              </div>
            </Link>

            {/* Chapter Link */}
            <Link href = "/chapter">
              <div className='text-center justify-center flex flex-col items-center'>
                <ChapterIcon selected = {tab == "chapter"}/>
                <h1 className={tab == "chapter" ? "text-purple-500" : ""}>Chapter</h1>
              </div>
            </Link>

            {/* Play Link */}
            <Link href = "/player">
              <div className='text-center justify-center flex flex-col items-center'>
                <PlayerIcon selected = {tab == "play"}/>
                <h1 className={tab == "play" ? "text-purple-500" : ""}>Play</h1>
              </div>
            </Link>

            <Link href = "/account">
              <div className='text-center justify-center flex flex-col items-center'>
                {session && <img src={session.user.image} width={45} style={{padding:2}} referrerPolicy="no-referrer"/>}
                <h1 className={tab == "account" ? "text-purple-500" : ""}>Account</h1>
              </div>
            </Link>
          </div>
        </nav>
      </div>
    )
}

function TournamentIcon({selected}){

  if(!selected){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45">
        <g fill="none" fillRule="evenodd" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path strokeLinejoin="miter" d="M22.5 11.63V6M20 8h5"/>
          <path fill="#fff" strokeLinecap="butt" strokeLinejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/>
          <path fill="#fff" d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7"/>
          <path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0"/>
        </g>
      </svg>
    )
  }
  else{
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45">
        <g fill="none" fillRule="evenodd" stroke="#A020F0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path strokeLinejoin="miter" d="M22.5 11.63V6M20 8h5"/>
          <path fill="#fff" strokeLinecap="butt" strokeLinejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/>
          <path fill="#fff" d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7"/>
          <path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0"/>
        </g>
      </svg>
    )
  }
}

function ChapterIcon({selected}){
  if(!selected){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
        <g style={{"fill":"#ffffff", "stroke":"#000000","strokeWidth":"1.5","strokeLinejoin":"round"}}>
          <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"/>
          <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"/>
          <path d="M 11.5,30 C 15,29 30,29 33.5,30" style={{"fill":"none"}}/>
          <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style={{"fill":"none"}}/>
          <circle cx="6" cy="12" r="2" />
          <circle cx="14" cy="9" r="2" />
          <circle cx="22.5" cy="8" r="2" />
          <circle cx="31" cy="9" r="2" />
          <circle cx="39" cy="12" r="2" />
        </g>
      </svg>
    )
  
  }
  else{
    return(
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
        <g style={{"fill":"#ffffff", "stroke":"#A020F0" ,"strokeWidth":"1.5","strokeLinejoin":"round"}}>
          <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"/>
          <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"/>
          <path d="M 11.5,30 C 15,29 30,29 33.5,30" style={{"fill":"none"}}/>
          <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style={{"fill":"none"}}/>
          <circle cx="6" cy="12" r="2" />
          <circle cx="14" cy="9" r="2" />
          <circle cx="22.5" cy="8" r="2" />
          <circle cx="31" cy="9" r="2" />
          <circle cx="39" cy="12" r="2" />
        </g>
      </svg>
    )
  }
}

function PlayerIcon({selected}){

  if(!selected){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
        <g style={{"opacity":"1", "fill":"none", "fillOpacity":"1", "fillRule":"evenodd", "stroke":"#000000", "strokeWidth":"1.5", "strokeLinecap":"round","strokeLinejoin":"round","strokeMiterlimit":"4", "strokeDasharray":"none", "strokeOpacity":"1"}} transform="translate(0,0.3)">
          <path
            d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
            style={{"fill":"#ffffff", "stroke":"#000000"}} />
          <path
            d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
            style={{"fill":"#ffffff", "stroke":"#000000"}}  />
          <path
            d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
            style={{"fill":"#ffffff", "stroke":"#000000"}}  />
          <path
            d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
            transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
            style={{"fill":"#ffffff", "stroke":"#000000"}}  />
        </g>
      </svg>
    )
  }
  else{
    return(
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
        <g style={{"opacity":"1", "fill":"none", "fillOpacity":"1", "fillRule":"evenodd", "stroke":"#A020F0", "strokeWidth":"1.5", "strokeLinecap":"round","strokeLinejoin":"round","strokeMiterlimit":"4", "strokeDasharray":"none", "strokeOpacity":"1"}} transform="translate(0,0.3)">
          <path
            d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
            style={{"fill":"#ffffff", "stroke":"#A020F0"}} />
          <path
            d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
            style={{"fill":"#ffffff", "stroke":"#A020F0"}}  />
          <path
            d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
            style={{"fill":"#ffffff", "stroke":"#A020F0"}}  />
          <path
            d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
            transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
            style={{"fill":"#ffffff", "stroke":"#A020F0"}}  />
        </g>
      </svg>
    )
  }
}