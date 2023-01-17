import { ChangeEvent, useState } from "react";
import logo from "./logo.svg";
import Navbar from "./components/Navbar";
import Draggable, { DraggableCore } from "react-draggable";
import { UilPlus, UilMapPinAlt, UilTrashAlt } from "@iconscout/react-unicons";
import TextareaAutosize from "react-textarea-autosize";

export interface INote {
  id: number;
  note: string;
  tag: string;
  color: "blue" | "green" | "red" | "yellow";
  isPinned: boolean;
  // zindex: number;
}

const dataNotes: INote[] = [
  {
    color: "blue",
    id: 1,
    isPinned: false,
    note: "first note",
    tag: "work",
  },
  {
    color: "green",
    id: 2,
    isPinned: true,
    note: "second note",
    tag: "school",
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [pinOn, setPinOn] = useState<Boolean>(false);
  const [tasks, setTasks] = useState<INote[]>(dataNotes);
  const [position, setPosition] = useState(tasks.length)

  const eventHandler = () => {};

  const changeNoteHandler = (
    ev: ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    const newArray = tasks.map((item, i) => {
      if (id === item.id) {
        return { ...item, note: ev.target.value };
      } else {
        return item;
      }
    });
    setTasks(newArray);
  };
  

  const changeNotePin = (id: number) => {
    const newArray = tasks.map((item, i) => {
      if (id === item.id) {
        return { ...item, isPinned: !item.isPinned };
      } else {
        return item;
      }
    });
    setTasks(newArray);
  };

  const deleteNote = (id: number) => {
    const newArray = tasks.filter((item, i) => item.id !== id);
    setTasks(newArray);
  };

  const dragHandler = (id:number) => {

  }

  return (
    <div className="h-screen flex flex-col">
      <div className="z-0">
        <Navbar />
      </div>

      <div className="flex-1 flex z-50 h-50 w-50">
        <div className="w-16 flex flex-col items-center gap-4 py-4 h-full bg-base-300 border-r-[1.3px] border-r-neutral">
          <button
            onClick={() =>
              setTasks((current) => [
                ...current,
                {
                  color: "blue",
                  id: new Date().valueOf(),
                  isPinned: false,
                  note: "",
                  tag: "",
                },
              ])
            }
            className="bg-accent-content hover:bg-accent-focus hover:text-accent-content transition-all text-accent w-9 h-9 rounded-full flex items-center justify-center"
          >
            <UilPlus />
          </button>
          <button
            onClick={() => setPinOn(!pinOn)}
            className={`${
              pinOn ? "bg-secondary text-white" : "bg-gray-400 opacity-80 text-gray-200"
            } h-9 w-9 flex items-center justify-center rounded-full`}
          >
            <UilMapPinAlt size="18" />
          </button>
        </div>
        {tasks.length ? (
          <div className="p-4 flex flex-wrap gap-3 overflow-y-auto overflow-x-hidden containerKu">
            {tasks.map((d, i) => (
              <Draggable
                onStart={()=>dragHandler(d.id)}
                key={i}
                bounds="parent"
                // bounds={{left: 1, right: 0, bottom: 10, top:20}}
                // grid={25}
                // defaultPosition={{ x: 100, y: 400 }}
              >
                <div
                  className={`bg-accent flex flex-col justify-between gap-1 cursor-move parentK shadow-xl rounded text-neutral p-3 pb-2 pr-2 font-bold h-56 text-sm w-52 ${
                    pinOn && !d.isPinned ? "opacity-30 z-0" : "opacity-100 z-10"
                  }`}
                >
                  <TextareaAutosize
                    placeholder="Type here"
                    className="w-full placeholder:text-gray-500 p-1  dragen bg-transparent outline-none resize-none max-h-full"
                    value={d.note}
                    onChange={(ev) => changeNoteHandler(ev, d.id)}
                  />
                  <div className="flex items-center justify-end gap-2 childK text-transparent">
                    <div
                      onClick={() => deleteNote(d.id)}
                      className="w-5 h-5 rounded cursor-pointer bg-transparent flex items-center justify-center hover:bg-gray-200 hover:text-red-800"
                    >
                      <UilTrashAlt size="18" />
                    </div>

                    <div
                      onClick={() => changeNotePin(d.id)}
                      className={`w-5 h-5 rounded cursor-pointer bg-transparent flex items-center justify-center hover:bg-gray-200 hover:text-gray-800 ${
                        d.isPinned ? "text-accent-content" : ""
                      } `}
                    >
                      <UilMapPinAlt size="18" />
                    </div>
                  </div>
                </div>
              </Draggable>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full h-96 items-center justify-center m-12">
            <div className=" animate-bounce flex items-center flex-col gap-3">
              <div className="bg-accent w-48 h-48 rounded mr-4 text-neutral flex items-center justify-center font-semibold">
                Your Note Here {":>"}
              </div>
              <h5 className="font-bold text-accent tracking-widest text-xl">
                Tap <span className="text-5xl">+</span> to add new note
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
