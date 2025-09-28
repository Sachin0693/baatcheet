import React from "react";
import SideBar from "../components/SideBar";
import MessageArea from "../components/MessageArea";

function Home() {
  return <div className="flex w-full h-[100vh]">
    <SideBar/>
    <MessageArea/>
  </div>;
}

export default Home;
