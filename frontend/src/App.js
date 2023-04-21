import "./App.css";
import Main from "./componenets/Main";
import Popup from "reactjs-popup";
import Background from "./background.png";
import { useState } from "react";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const blur = () => {
    if (!isOpen) {
      document.getElementById("wrapper").style.filter = "blur(10px)";
      setIsOpen(true);
    } else {
      document.getElementById("wrapper").style.filter = "blur(0px)";
      setIsOpen(false);
    }
  };
  const blur_main = () => {
    if (isOpen) {
      document.getElementById("wrapper").style.filter = "blur(0px)";
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        id="wrapper"
        onClick={blur_main}
        className="main"
        style={{ background: `url(${Background})` }}
      ></div>
      <div>
        <Popup
          trigger={
            <div>
              <button>
                <img
                  className="image-size popup rounded-circle"
                  alt="Guru"
                  src="/ask_guru.png"
                  onClick={blur}
                  title="ASK GURU"
                />
              </button>
            </div>
          }
        >
          <Main className="component" />
        </Popup>
      </div>
    </>
  );
}

export default App;
