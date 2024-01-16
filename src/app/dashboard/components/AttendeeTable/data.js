// import React from "react";
const columns = [
  // {name: "id", uid: "eventId", sortable: true},
  {name: "Title", uid: "eventTitle", sortable: true},
  {name: "Name", uid: "name", sortable: true},
  // {name: "EImage", uid: "eventImage"},
  {name:"Ticket", uid:"ticketName"},
  {name: "Price", uid: "ticketPrice"},
  // {name: "email", uid: "email"},
  {name: "Status", uid: "status", sortable: true},
  // {name: "Actions", uid: "actions"},

];

const statusOptions = [
  {name: "paid", uid: "paid"},
  {name: "paymentOwing", uid: "paymentOwing"},
  {name: "free", uid: "free"},
  {name: "savedEvent", uid: "se"},
];


export {columns, statusOptions};
