const exampleData = {
  name: "Test Board",
  boardId: "123",
  accessKey: "q0wQzEFWHE",
  taskList: {
    "0": {
      _id: "0",
      name: "Backlog",
      cardIds: ['0','1'],
    },
    "1": {
      _id: "1",
      name: "To Do",
      cardIds: ['2','3','4']
    },
    "2": {
      _id: "2",
      name: "In Progress",
      cardIds: ['5','6','7']
    },
    "3": {
      _id: "3",
      name: "Done",
      cardIds: ['8','9'],
    },
  },
  cards: {
    "0": {
      _id: "0",
      title: "Twilio integration",
      description: "Create a new note via SMS.",
      color: "#aaaa00",
      task: "Backlog",
    },
    "1": {
      _id: "1",
      title: "Markdown support",
      description: "",
      color: "#ff0000",
      task: "Backlog",
    },
    "2": {
      _id: "2",
      title: "Audio recording",
      description: "Show audio in a note and playback UI",
      color: "#ffaa00",
      task: "To Do",
    },
    "3": {
      _id: "3",
      title: "Tablet View",
      description: "",
      color: "#ff0000",
      task: "To Do",
    },
    "4": {
      _id: "4",
      title: "Bookmark in note",
      description: "Show rich link UI in a note",
      color: "#ffaa00",
      task: "To Do",
    },
    "5": {
      _id: "5",
      title: "Mobile view",
      description: "Functions for both web responsive and native apps.",
      color: "#ff0000",
      task: "In Progress",
    },
    "6": {
      _id: "6",
      title: "Desktop view",
      description: "PWA for website and native apps.",
      color: "#ffaa00",
      task: "In Progress",
    },
    "7": {
      _id: "7",
      title: "Formatting options",
      description:
        "Mobile formatting bar expands and collapses when tapping the format icon",
      color: "#ffaa00",
      task: "In Progress",
    },
    "8": {
      _id: "8",
      title: "Audio recording",
      description: "Interface for when recording a new audio note",
      color: "#00aa11",
      task: "Done",
    },
    "9": {
      _id: "9",
      title: "Bookmarking",
      description: "Interface for when creating a new link note",
      color: "#00aa11",
      task: "Done",
    },
  },
  taskListOrder: ["0", "1", "2", "3"],
};

export default exampleData;
