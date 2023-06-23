import { ArrowRightCircleIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { checkMatchSaved } from "./Pairing";

export default function Modal({createNextRound, disabled,saved,text}) {
  const [showModal, setShowModal] = React.useState(false);
  const [showTip, setShowTip] = useState(false)
  return (
    <>
      <button onMouseEnter={()=>{setShowTip(true)}} onMouseLeave = {()=>setShowTip(false)} onClick = {()=>{
        checkMatchSaved();
        setShowModal(true)
      }
        } className={`${disabled ? "opacity-25 cursor-default" : "hover:bg-blue-700 cursor-pointer"} flex space-x-2 items-center bg-blue-500 text-white font-bold py-2 px-4 rounded max-w-fit `}> 
        <ArrowRightCircleIcon className="h-5 w-5" />
        <p>{text}</p>
      </button>
      {disabled && 
        <div className={`${(!showTip) && "invisible"} flex items-center space-x-2`}>
          <InformationCircleIcon className="h-5 w-5" />
          <p>Save all changes.</p>
        </div>
      }
      
      {showModal ? (
        saved ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Finalize Round!
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <p className=" text-slate-500 text-lg leading-relaxed">
                    After finalizing the current round and creating the next round, results of this round cannot be changed! Make sure all pairings and results are correct for this round.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        setShowModal(false)
                        createNextRound();
                    }}
                  >
                    Finalize & Generate Next Round
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
        </>) : 
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Not Saved!
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-4 flex-auto">
              <p className=" text-slate-500 text-lg leading-relaxed">
                Make sure you have saved the matches before locking and generating the next round.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      ) : null}
    </>
  );
}