import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { useGlobalContext } from "../../context/KanbanProvider";
import tw from "tailwind-styled-components/dist/tailwind";
import Popup from "reactjs-popup";

// api handler
import apiCaller from "../../api/apiCaller";

// icons
import { FaEllipsisH } from "react-icons/fa";

const Container = tw.div``;

function Card({ index, taskId, fetchBoard, _id, title, description, color }) {
  const { accessKey } = useParams();

  const handleEdit = () => {
    console.log("here");
  };

  const handleDelete = () => {
    apiCaller
      .delete(`/${accessKey}/cards`, { data: { _id, taskId } })
      .then((res) => {
        console.log("handleDelete");
        console.log(res.data);
        fetchBoard();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided, snapshot, renk) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
        >
          <div
            style={{ backgroundColor: `${color}` }}
            className={`flex flex-col p-4 mb-2 border rounded-xl border-[#757575]`}
          >
            <div className="flex justify-between flex-wrap">
              <h1 className="font-bold">{title}</h1>
              {/* Popup menu */}
              <CardMenu handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
            <p className="font-light text-sm">{description}</p>
          </div>
        </Container>
      )}
    </Draggable>
  );
}

const CardMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Popup
      trigger={
        <button>
          <FaEllipsisH />
        </button>
      }
      position="left top"
      contentStyle={{
        background: "#212121",
        border: "1px solid #757575",
        borderRadius: "5px",
        padding: "0.3em",
      }}
      arrowStyle={{ color: "#212121" }}
    >
      <div
        className="text-xs border-b border-[#757575] pb-1 cursor-pointer"
        onClick={() => handleEdit()}
      >
        Edit card
      </div>
      <div className="text-xs pt-1 cursor-pointer" onClick={handleDelete}>
        Delete card
      </div>
    </Popup>
  );
};

export default Card;
