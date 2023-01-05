import React, { useState } from "react";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUsers, deleteUser } from "./api/userApi";
import AddUser from "./components/AddUser";
import UserDetails from "./components/UserDetails";
import UpdateUser from "./components/UpdateUser";

function App() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery("users", getUsers);

  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const [user, setUser] = useState();
  const [showForm, setShowForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState("");

  const deletes = (e) => {
    mutate(e);
  };

  const forms = useMemo(() => {
    return <>{showForm && <AddUser setShowForm={setShowForm} />}</>;
  });

  if (isError) return <p>Error..</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="App">
      <h1>{showForm ? "Add User" : showUpdate ? "Edit User" : "User List"}</h1>
      {!showForm && !showUpdate ? (
        <>
          {data.map((user, idx) => (
            <div key={user.id} className="userList">
              <p onClick={() => setUser(user.id)}>
                {idx + 1}) {user.name}
              </p>

              {showUpdate.id === user.id ? (
                <span onClick={() => setShowUpdate("")}>Cancel</span>
              ) : (
                <span
                  onClick={() => {
                    setShowUpdate(user);
                  }}
                >
                  Edit
                </span>
              )}
              <p className="delete" onClick={() => deletes(user.id)}>
                Delete
              </p>
            </div>
          ))}
        </>
      ) : (
        ""
      )}

      {!showUpdate && (
        <>
          {!showForm && <UserDetails id={user} />}

          {showForm ? (
            <h2 onClick={() => setShowForm(false)}>Cancel</h2>
          ) : (
            <h2 onClick={() => setShowForm(true)}>Add User</h2>
          )}
          {forms}
        </>
      )}

      {showUpdate && <h2 onClick={() => setShowUpdate("")}>Cancel</h2>}

      {showUpdate && (
        <UpdateUser setShowUpdate={setShowUpdate} showUpdate={showUpdate} />
      )}
    </main>
  );
}

export default App;
