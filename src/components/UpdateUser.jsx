import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUser } from "../api/userApi";

const UpdateUser = ({ setShowUpdate, showUpdate }) => {
  const queryClient = useQueryClient();
  const id = showUpdate.id;

  const { mutate } = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
      queryClient.invalidateQueries(["users"]);
      setShowUpdate("");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowUpdate({ ...showUpdate, [name]: value });
  };

  const editUser = (e) => {
    e.preventDefault();

    const updateUser = showUpdate;
    mutate({ ...updateUser });
  };

  return (
    <section className="addUser">
      <form onSubmit={editUser}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={showUpdate.name}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="details">Details</label>
          <input
            type="text"
            id="details"
            name="details"
            value={showUpdate.details}
            onChange={handleChange}
          />
        </fieldset>

        <button>Update User</button>
      </form>
    </section>
  );
};

export default UpdateUser;
