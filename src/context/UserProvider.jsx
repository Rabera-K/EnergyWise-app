import { useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("ew_user") || "{}");
    const storedName = JSON.parse(localStorage.getItem("ew_name") || "{}");

    const firstName =
      storedName.firstName ||
      storedUser.firstName ||
      storedUser.identifier ||
      "User";
    const lastName = storedName.lastName || storedUser.lastName || "";
    const initials =
      `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    return { name: firstName, lastName, initials };
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
