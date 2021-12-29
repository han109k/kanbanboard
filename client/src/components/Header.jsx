import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ name }) {

  const navigate = useNavigate();

  const takeMeHome = () => {
    navigate("/");
  }

  return (
    <nav className="sticky h-[48px] flex shadow-md bg-[#111111]">
      <button onClick={takeMeHome} className="hidden md:inline self-start my-auto ml-2 font-thin">Kanban Board</button>
      <p className="m-auto text-xl font-bold">{name}</p>
      <p className="hidden md:inline font-thin text-[#111111]">Kanban Board</p>
    </nav>
  );
}

export default Header;
