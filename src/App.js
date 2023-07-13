import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";

import api from "./api/api";

// import PopUp from "./components/PopUp";

import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState(null);

  const getUser = async () => {
    try {
      const response = await api.get(
        `users?user_uuid=aa2902ac-b250-48bd-af47-0b8dcc141b8d`
      );
      console.log("MASSA USER", response.data[0]);

      setUser(response.data[0]);
    } catch (error) {
      console.error("POUXA USER", error);
    }
  };

  const getThreads = async () => {
    try {
      const response = await api.get(
        `threads?thread_from=aa2902ac-b250-48bd-af47-0b8dcc141b8d`
      );
      console.log("SHOWW THREADS", response.data);
      setThreads(response.data);
    } catch (error) {
      console.error("POUXA THREADS", error);
    }
  };

  const getThreadsFeed = async (
    viewThreadsFeed,
    threads,
    setFilteredThreads
  ) => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter(
        (thread) => thread.reply_to === null
      );
      setFilteredThreads(standAloneThreads);
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(
        (thread) => thread.reply_to !== null
      );
      setFilteredThreads(replyThreads);
    }
  };

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed(viewThreadsFeed, threads, setFilteredThreads);
  }, [user, threads, viewThreadsFeed]);

  console.log(filteredThreads);

  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed user={user} filteredThreads={filteredThreads} />
          {/* <PopUp /> */}
        </div>
      )}
    </>
  );
};

export default App;
