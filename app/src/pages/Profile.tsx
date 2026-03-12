import { useContext, useState } from 'react';
import axios from 'axios';

import { AccountContext } from '../context/account-context';
import { serverURL } from '../utility/environment';
import { Button } from '../components/ui/Button';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const accountInfo = useContext(AccountContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .patch(`${serverURL}/account/update`, formData)
        .then(function (response) {
          console.log(response);
        });
    } catch (err) {
      console.error('Account failed to update', err);
    }
  };
  return (
    <>
      <h1>Profile</h1>
      <div>
        <Button name="edit" onClick={() => setIsEditing(true)} />
        {isEditing ? (
          editProfileForm(
            accountInfo,
            formData,
            setFormData,
            handleSubmit,
            setIsEditing,
          )
        ) : (
          <>
            <h3>First Name: {accountInfo?.accountInfo?.firstName}</h3>
            <h3>Last Name: {accountInfo?.accountInfo?.lastName}</h3>
            <h3>E-mail: {accountInfo?.accountInfo?.email}</h3>
          </>
        )}
      </div>
    </>
  );
};

const editProfileForm = (
  accountInfo,
  formData,
  setFormData,
  handleSubmit,
  setIsEditing,
) => (
  <form onSubmit={handleSubmit}>
    <input
      className="createtextbox"
      type="text"
      value={accountInfo?.accountInfo?.firstName}
      placeholder="First Name"
      required
      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
    />
    <input
      className="createtextbox"
      type="text"
      value={accountInfo?.accountInfo?.lastName}
      placeholder="Last Name"
      required
      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
    />
    <br></br>
    <br></br>
    <input
      className="createtextbox"
      type="email"
      value={accountInfo?.accountInfo?.email}
      placeholder="Email"
      required
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
    <input
      className="createtextbox"
      type="password"
      placeholder="Password"
      required
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
    <br></br>
    <br></br>
    <button className="accountbutton" type="submit">
      Submit
    </button>
    <Button name="CANCEL" onClick={() => setIsEditing(false)} />
  </form>
);
