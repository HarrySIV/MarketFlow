import { useContext, useEffect, useRef, useState, type Ref } from 'react';
import axios from 'axios';

import { AccountContext } from '../context/account-context';
import { serverURL } from '../utility/environment';
import { Button } from '../components/ui/Button';

import './css/Profile.css';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const accountInfo = useContext(AccountContext);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    console.log(accountInfo.accountInfo);
  }, [accountInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accountData = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      token: accountInfo?.accountInfo?.token,
    };
    let response = null;
    try {
      response = await axios.put(`${serverURL}/account/update`, accountData);
      const data = response?.data;
      accountInfo.setAccountInfo!({
        firstName: data.account.firstName,
        lastName: data.account.lastName,
        email: data.account.email,
        token: data.token,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Account failed to update', err);
    }
  };
return (
    <>
      <h1>Profile</h1>
      <div className="maincontainer">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profilecontainer">
            <input
              className="profiletextbox"
              type="text"
              placeholder="First Name"
              defaultValue={accountInfo.accountInfo.firstName || undefined}
              ref={firstNameRef as Ref<HTMLInputElement>}
              required
            />
            <input
              className="profiletextbox"
              type="text"
              placeholder="Last Name"
              defaultValue={accountInfo.accountInfo.lastName || undefined}
              ref={lastNameRef as Ref<HTMLInputElement>}
              required
            />
            <br></br>
            <br></br>
            <input
              className="profiletextbox"
              type="email"
              placeholder="Email"
              defaultValue={accountInfo.accountInfo.email || undefined}
              ref={emailRef as Ref<HTMLInputElement>}
              required
            />
            <input
              className="profiletextbox"
              type="password"
              placeholder="Password"
              ref={passwordRef as Ref<HTMLInputElement>}
              required
            />
            <br></br>
            <br></br>
            <button className="button" type="submit">
              Submit
            </button>
            <Button className="button" name="CANCEL" onClick={() => setIsEditing(false)} />
          </form>
        ) : (
          <>
            
            <h3>First Name: {accountInfo?.accountInfo?.firstName}</h3>
            <h3>Last Name: {accountInfo?.accountInfo?.lastName}</h3>
            <h3>E-mail: {accountInfo?.accountInfo?.email}</h3>
          <Button className="button" name="edit" onClick={() => setIsEditing(true)} />
            </>
        )}
      </div>
    </>
  );
};
