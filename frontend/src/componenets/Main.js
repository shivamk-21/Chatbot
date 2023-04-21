import React, { useState } from "react";
import "./Main.css";
const Main = () => {
  const [message, setMessage] = useState("");
  // Function to add answer to chat
  function add_answer(data) {
    let elm = document.getElementById("chat");
    let data_content = "";
    let link_content = "";
    // Data Portion of Chat
    if (data.Data) {
      data_content += `<p
              class="small p-2 ms-3 mb-3 rounded-3"
              style="background-color: #f5f6f7;">
              ${data.Data}</p>`;
    }
    // Link Portion of Chat
    if (data.Links) {
      link_content += `<p class="small p-2 ms-3 mb-3
        rounded-3" style="background-color: #f5f6f7;">
         Links for your Reference :
       </p><p class="links small p-2 ms-3 mb-3
       rounded-3" style="background-color: #f5f6f7;">`;
      for (const key in data.Links) {
        link_content += `
                <a class='fill-div' target='_blank'>${key}</a></hr>
               `;
      }
      link_content += "</p>";
    }
    //Finally adding the chat
    elm.innerHTML += `<div class="d-flex justify-content-between">
                    <p class="small mb-1">Guru</p>
                </div>
                <div class="d-flex flex-row justify-content-start">
                    <img
                      src="/guruDP.png"
                      alt="avatar 1"
                      class="image"
                    >
                    <div>
                        ${data_content}
                        ${link_content}
                    </div>
                </div>`;
  }
  // Function to send message to backend and get response
  const Intent = async (g) => {
    g.preventDefault();
    if (!message) {
      alert("Enter Message");
    } else {
      let elm = document.getElementById("chat");
      // Adding the user's message to chat
      elm.innerHTML += `
                  <div class="d-flex justify-content-between">
                      <p class="small mb-1 text-muted"></p>
                      <p class="small mb-1">You</p>
                  </div>
                  <div class="d-flex flex-row justify-content-end mb-4 pt-1">
                      <div>
                          <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                            ${message}
                          </p>
                      </div>
                    <img
                        src="https://w7.pngwing.com/pngs/1008/377/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-black-hair-computer.png"
                        alt="avatar 1"
                        class="image"
                    />
                  </div>`;
      elm.scrollTop = elm.scrollHeight;
      // Sending the message to backend
      await fetch("http://127.0.0.1:5000", {
        method: "POST",
        body: JSON.stringify({
          sentence: message,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Action on response
          add_answer(data.msg[0]);
          setMessage("");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  // Returning the chat UI
  return (
    <section styles="background-color: #eee;">
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="card">
              <div className="heading d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <h2>IIIT's Guru</h2>
                </h5>
                <div className="d-flex flex-row align-items-center">
                  <img src="/guru.png" alt="avatar 1" className="logo" />
                </div>
              </div>
              <div id="chat" className="scroll">
                <div className="d-flex justify-content-between">
                  <p className="small mb-1">Guru</p>
                </div>
                <div className="d-flex flex-row justify-content-start">
                  <img src="/guruDP.png" alt="avatar 1" className="image" />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-3 rounded-3"
                      styles="background-color: #f5f6f7;"
                    >
                      How can I help You?
                    </p>
                  </div>
                </div>
              </div>
              <div className="form floex text-muted d-flex justify-content-start align-items-center p-3">
                <form className="input-group" onSubmit={Intent}>
                  <input
                    className="form form-control"
                    type="text"
                    placeholder="Enter Query"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="form btn btn-warning"
                    type="submit"
                    id="button-addon2"
                    styles="padding-top: .55rem;"
                  >
                    Ask 🔎
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
