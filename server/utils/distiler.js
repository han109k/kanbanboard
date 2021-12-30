// Reconstructs response object into usable object in frontend React drag&drop
module.exports = distiller = (obj) => {
  const responseObj = {},
    taskList = {},
    cards = {},
    taskListOrder = [];
  responseObj["_id"] = obj["_id"];
  responseObj["name"] = obj["name"];
  responseObj["accessKey"] = obj["accessKey"];

  (obj["tasks"] && obj["tasks"].map((task) => {
    taskList[task._id] = task;
    taskListOrder.push(task._id);
  }));

  (obj["cards"] && obj["cards"].map((card) => {
    const o = {};
    o._id = card.id;
    o.title = card.title;
    o.description = card.description;
    o.position = card.position;
    o.color = card.color;
    cards[card._id] = o;
  }));

  responseObj["taskList"] = taskList;
  responseObj["cards"] = cards;
  responseObj["taskListOrder"] = taskListOrder;

  return responseObj;
};
