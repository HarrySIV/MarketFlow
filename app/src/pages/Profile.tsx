import { useContext, useRef, useState, type Ref } from 'react';
import axios from 'axios';

import { AccountContext } from '../context/account-context';
import { serverURL, testServerURL } from '../utility/environment';
import { Button } from '../components/ui/Button';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const accountInfo = useContext(AccountContext);
  const firstNameRef = useRef(accountInfo.accountInfo.firstName);
  const lastNameRef = useRef(accountInfo.accountInfo.lastName);
  const emailRef = useRef(accountInfo.accountInfo.email);
  const passwordRef = useRef(accountInfo.accountInfo.firstName);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(accountInfo.accountInfo);
    try {
      const data = {
        ...formData,
        token: accountInfo?.accountInfo?.token,
      };
      console.log(data);
      await axios
        .put(`${testServerURL}/account/update`, data)
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
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              className="createtextbox"
              type="text"
              placeholder="First Name"
              ref={firstNameRef as Ref<HTMLInputElement>}
              required
            />
            <input
              className="createtextbox"
              type="text"
              placeholder="Last Name"
              ref={lastNameRef as Ref<HTMLInputElement>}
              required
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <br></br>
            <br></br>
            <input
              className="createtextbox"
              type="email"
              placeholder="Email"
              ref={emailRef as Ref<HTMLInputElement>}
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              className="createtextbox"
              type="password"
              placeholder="Password"
              ref={passwordRef as Ref<HTMLInputElement>}
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <br></br>
            <br></br>
            <button className="accountbutton" type="submit">
              Submit
            </button>
            <Button name="CANCEL" onClick={() => setIsEditing(false)} />
          </form>
        ) : (
          <>
            <Button name="edit" onClick={() => setIsEditing(true)} />
            <h3>First Name: {accountInfo?.accountInfo?.firstName}</h3>
            <h3>Last Name: {accountInfo?.accountInfo?.lastName}</h3>
            <h3>E-mail: {accountInfo?.accountInfo?.email}</h3>
          </>
        )}
      </div>
    </>
  );
};
