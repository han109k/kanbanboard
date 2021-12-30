import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import tw from "tailwind-styled-components/dist/tailwind";
import apiCaller from "../../api/apiCaller";

// Context API wrapper
import { useGlobalContext } from "../../context/KanbanProvider";

// Icons
import { FcUndo, FcFlashOn } from "react-icons/fc";

// Components
import Loading from "../Loading";

// Styled components
const Container = tw.div`
  flex
  justify-center
  items-center
  min-h-screen
`;

function Modal({ show, setShow }) {
  const { setBoard } = useGlobalContext();
  const [accessName, setAccessName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const searchValue = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (show) {
      if (show.fun === "existing") {  // existing board
        apiCaller
          .get(`/${accessName}`)
          .then((res) => {
            // console.log(res.data);
            setBoard(res.data);
            setLoading(false);
            navigate(`/${res.data.accessKey}`);
          })
          .catch((error) => {
            // console.log(error.response.data.message);
            setErrorMsg(error.response.data.message);
            notify(error.response.data.message);
            setLoading(false);
            setTimeout(() => {
              setErrorMsg("");
            }, 5000);
          });
      } else {  // new board
        apiCaller
          .post('/', {name: accessName})
          .then((res) => {
            // console.log(res.data.message);
            setBoard(res.data.data);
            setLoading(false);
            navigate(`/${res.data.data.accessKey}`);
          })
          .catch((error) => {
            // console.log(error.response.data.message);
            setErrorMsg(error.response.data.message);
            notify(error.response.data.message);
            setLoading(false);
            setTimeout(() => {
              setErrorMsg("");
            }, 5000);
          });
      }
    }
  };

  // Toastify configuration
  const notify = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
      hideProgressBar: true,
    });
  };

  const handleCancellation = (e) => {
    e.preventDefault();
    setShow({ ...show, isOpen: false });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      {/* Toastify container */}
      <ToastContainer limit={1} />
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex justify-center">
          <input
            type="text"
            name="boardname"
            id="boardname"
            placeholder={show.placeHolder}
            ref={searchValue}
            value={accessName}
            className="text-md bg-inherit rounded-md border p-2 focus:outline-none"
            onChange={(e) => setAccessName(e.target.value)}
            required
          />
          <button className="ml-2">
            <FcFlashOn size={35} />
          </button>
        </div>
        <button onClick={handleCancellation} className="mx-auto mt-10 mb-1">
          <FcUndo size={50} />
        </button>
      </form>
    </Container>
  );
}

export default Modal;
