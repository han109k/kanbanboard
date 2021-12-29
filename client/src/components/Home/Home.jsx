import React, { useState } from "react";
import tw from "tailwind-styled-components/dist/tailwind";

// Icons
import { FcDataBackup, FcDataRecovery } from "react-icons/fc";

// Components
import Modal from "./Modal";

// Styled components
const Container = tw.div`
  flex
  flex-col
  justify-center
  items-center
  min-h-screen
`;

export default function Home() {
  const [show, setShow] = useState({
    isOpen: false,
    placeHolder: '',
    fun: ''
  });

  if(show.isOpen) {
    return <Modal show={show} setShow={setShow}/>
  }

  return (
    <Container>
      <p className="text-5xl font-bold pb-10">Kanban Board</p>
      <div className="flex flex-col md:flex-row border-4 rounded-xl p-8 mb-10">
        {/* Open an existing board modal */}
        <div className="order-3 md:order-1 md:mx-8">
          <button onClick={() => setShow({...show, isOpen:true, placeHolder: "Enter your access key here...", fun: "existing"})}>
            <FcDataBackup size={150} />
          </button>
          <p className="font-light mt-5 text-center">Open existing one</p>
        </div>
        {/* Create a new board modal */}
        <div className="hidden md:inline h-[180px] border order-2"></div>
        <div className="inline md:hidden w-[180px] border order-2 mt-4"></div>
        <div className="order-1 md:order-3 md:mx-8">
          <button onClick={() => setShow({...show, isOpen:true, placeHolder: "Give it a name", fun: "new"})}>
            <FcDataRecovery size={150} />
          </button>
          <p className="font-light mt-5 text-center">Create a new board</p>
        </div>
      </div>
    </Container>
  );
}
