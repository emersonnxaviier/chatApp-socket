import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { v4 } from "uuid";
import { handleGetCurrentHour } from "../utils/utils";

const myId = v4();

const socket = io("http://192.168.1.5:4000");

socket.on("connect", () => {
  console.log("New connection...");
});

const Chat = () => {
  const [message, updateMessage] = useState("");
  const [messages, updateMessages] = useState([]);

  setInterval(handleGetCurrentHour(), 1000);

  useEffect(() => {
    const handleNewMessage = (newMessage) =>
      updateMessages([...messages, newMessage]);
    socket.on("chat-message", handleNewMessage);
    return () => socket.off("chat-message", handleNewMessage);
  }, [messages]);

  //PEGAR O VALOR DO INPUT
  function handleInputChange(event) {
    updateMessage(event.target.value);
  }

  // ENVIAR MENSAGEM
  function handleFormSubmit(event) {
    event.preventDefault(); // PARA O BROWSER NÃO FICAR RECARREGANDO.

    //VERIFICAR SE TEM MENSAGEM
    if (message.trim()) {
      socket.emit("chat-message", {
        id: myId,
        message,
        time: handleGetCurrentHour(),
      });
      updateMessage(""); // SE TIVER MENSAGEM ELE VAI ENVIAR E EM SEGUIDA ADICIONAR O VALOR DE VAZIO PARA LIMPAR O INPUT.
    }
  }

  return (
    <div className="container">
      <ul className="list">
        {messages.map((m, index) => (
          <li
            className={`list__item list__item--${
              m.id === myId ? "mine" : "other"
            }`}
            key={index}
          >
            <span
              className={`message message--${myId === m.id ? "mine" : "other"}`}
            >
              <p className="messageText">{m.message}</p>
              <p>{m.time}</p>
            </span>
          </li>
        ))}
      </ul>

      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form__field"
          placeholder="Digite uma mensagem"
          onChange={handleInputChange}
          value={message}
          type="text"
        />
      </form>
    </div>
  );
};

export { Chat };
