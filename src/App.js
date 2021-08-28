import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    const loadusers = async () => {
      const resp = await axios.get("https://reqres.in/api/users?page=1");
      setUsers(resp.data.data);
    };
    loadusers();
  }, []);

  const onChangeHandler = (text) => {
    let emails = [];
    if (text.length > 0) {
      emails = users.filter((users) => {
        const regex = new RegExp(`${text}`, "gi");
        return users.email.match(regex);
      });
    }
    setUserInput(text);
    setSuggestion(emails);
  };
  const changeValue = (email) => {
    setUserInput(email);
    setSuggestion([]);
  };
  return (
    <div className="App">
      <input
        type="text"
        value={userInput}
        onChange={(e) => onChangeHandler(e.target.value)}
        placeholder="Type G or j or e or t or c"
        onBlur={() => {
          setTimeout(() => {
            setSuggestion([]);
          }, 100);
        }}
      />
      <br />
      {suggestion &&
        suggestion.map((user) => (
          <div
            className="listItem"
            key={user.id}
            onClick={() => changeValue(user.email)}
          >
            {user.email}
          </div>
        ))}
    </div>
  );
}
