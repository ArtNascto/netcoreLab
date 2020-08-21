"use strict";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("/pollHub")
  .build();
let chartBlock = "\u22C4";
var messages = [];

connection.on("ReceiveMessage", function (user, pollId, pollVal, time) {
  saveOnLocalStorage(pollVal, user, "poll", pollId, time);
  getOnLocalStorage("poll");

  let pollResultMsg = `"${user}" votou em "${pollVal}" em ${time}.`;
  let ulPoll = document.getElementById("messagesList");
  let liPollResult = document.createElement("li");
  liPollResult.textContent = pollResultMsg;

  ulPoll.insertBefore(liPollResult, ulPoll.childNodes[0]);

  document.getElementById(pollId + "Block").innerHTML += chartBlock;
});

connection.start().catch(function (err) {
  return console.error(err.toString());
});
const send = function () {
  let user = document.getElementById("userInput").value;
  if (!user) {
    user = `anonimo`;
  }

  if ($("input:radio[name=poll]").is(":checked")) {
    let pollId = $("input[name=poll]:checked").attr("id");
    let pollVal = $("input[name=poll]:checked").val();
    connection
      .invoke("SendMessage", user, pollId, pollVal)
      .catch(function (err) {
        return console.error(err.toString());
      });
    var ele = document.getElementsByName("poll");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  } else {
    return alert("nenhuma opção selecionada.");
  }
};
const saveOnLocalStorage = function (message, user, type, projectId, time) {
  let messagesObj = { user, message, projectId, time };
  messages.push(messagesObj);
  localStorage.setItem(type, JSON.stringify(messages));
};
const getOnLocalStorage = function (type) {
  let messagesStorage = localStorage.getItem(type);
  if (messagesStorage) {
    let messagesParsedJson = JSON.parse(messagesStorage);
    messages = messagesParsedJson;
  }else{
    localStorage.setItem(type, JSON.stringify([]));
  }
};
const initList = function () {
  getOnLocalStorage("poll");
  if (messages) {
    messages.forEach((m) => {
      let pollResultMsg = `"${m.user}" votou em "${m.message}" em ${m.time}.`;
      let ulPoll = document.getElementById("messagesList");
      let liPollResult = document.createElement("li");
      liPollResult.textContent = pollResultMsg;

      ulPoll.insertBefore(liPollResult, ulPoll.childNodes[0]);
      document.getElementById(m.projectId + "Block").innerHTML += chartBlock;
    });
  }
};

window.addEventListener("load", function () {
  initList();
});
