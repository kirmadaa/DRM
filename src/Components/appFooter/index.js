import { useEffect, useState } from "react";
import { Edit } from "react-feather";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactStickies from "react-stickies";
import { addNotes, notesList, updateNotes } from "../../Redux/actions/user";
const AppFooter = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.user.Notes);
  const token = useSelector((state) => state.user.token);
  const [notesLocal, setNotesLocal] = useState([]);
  //const [tempNotes, setTempNotes] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(notesList());
    }
  }, [dispatch]);

  useEffect(() => {
    // Calculate the number of rows and columns
    const numColumns = 12;
    const numRows = Math.ceil(notes?.length / numColumns);
    // Set notesLocal with grid layout for multiple rows and columns
    const temp = notes?.map((item, index) => ({
      title: item.title,
      text: item.text,
      id: item._id,
      color: "#FBE4BE",
      contentEditable: true,
      //grid layout
      grid: {
        i: "chart" + index,
        x: (index * 2) % numColumns,
        y: Math.floor(index / (numColumns / 2)),
        w: 2,
        h: 2,
        minW: 2,
        minH: 2,
      },
      //timestamp
      timestamp: item.timestamp,
    }));

    setNotesLocal(temp);
  }, [notes]);

  const onAddNote = (newNote) => {
    dispatch(addNotes(newNote));
  };

  const onUpdateNote = (updatedarrayofnotes) => {
    setNotesLocal(updatedarrayofnotes);
  };

  const updateNotesOnHide = () => {
    //create array of data with title text and timestamp
    const data = notesLocal?.map((item, index) => ({
      title: item.title,
      text: item.text,
      timestamp: item.timestamp ? item.timestamp : new Date().getTime(),
    }));

    //dispatch update notes
    dispatch(updateNotes(data));
  };
  return (
    <div className="w-full bg-white fixed bottom-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        {show && (
          <div className="sticky1">
            <ReactStickies
              notes={notesLocal}
              onAdd={onAddNote}
              onChange={onUpdateNote}
              titlePlaceholder="Title"
              editorPlaceholder="Take a note..."
              titleStyle={{ fontSize: "1.5em" }}
              editorStyle={{ fontSize: "1.2em" }}
            />
          </div>
        )}
        <div className="py-5 grid gap-1 grid-cols-2 font-normal text-xs text-[#18181B]">
          <div className="font-normal text-xs text-[#18181B] flex items-center">
            All © copyright reserved by Altrr.
          </div>

          <div className="flex justify-end items-center space-x-3 ">
            <div className="fixed top-[34px] right-[190px]">
              <Edit
                onClick={() => {
                  if (show) {
                    updateNotesOnHide();
                  }
                  setShow(!show);
                }}
              />
            </div>

            <Link
              to="/web/terms-and-conditions"
              className="mr-4 font-normal text-xs text-[#18181B]"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/web/privacy-policy"
              className="font-normal text-xs text-[#18181B]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
