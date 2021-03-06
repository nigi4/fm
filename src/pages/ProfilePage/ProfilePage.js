import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import FarmItem from "../../components/FarmItem/FarmItem";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [sname, setSName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [farms, setFarms] = useState([]);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isRedirectCreate, setIsRedirectCreate] = useState(false);

  const handleRedirect = () => {
    setIsRedirect(!isRedirect);
  };

  const filter = (id) => {
    let farmss = farms.filter((el) => el.Id !== id);
    setFarms(farmss);
  };
  useEffect(() => {
    fetch(`http://localhost:8080/v1/users/1`)
      .then((data) => data.json())
      .then((data) => {
        const { Email, FirstName, SecondName, Phone, Id } = data;
        setEmail(Email);
        setName(FirstName);
        setSName(SecondName);
        setPhone(Phone);
        setUserId(Id);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/v1/farms/`)
      .then((data) => data.json())
      .then((data) => {
        data.filter((el) => (el.UserId.Id = userId));
        setFarms(data);
      });
  }, []);

  if (isRedirectCreate) {
    return <Redirect to={{ pathname: `/farm/create/` }}></Redirect>;
  } else if (isRedirect) {
    return <Redirect to={{ pathname: `/farm/create/` }}></Redirect>;
  } else {
    return (
      <div className={styles.header}>
        <div className={styles.main}>
          <div>
            Name <span>{name}</span> <span>{sname}</span>
          </div>
          <div>
            Phone: <span>{phone}</span>
          </div>
          <div>
            Email: <span>{email}</span>
          </div>
        </div>
        <div>
          <button onClick={handleRedirect}>Create farm</button>
        </div>
        <div className={styles.products}>
          {farms.map((el) => {
            return (
              <FarmItem
                farm={el}
                key={el.Id}
                farms={farms}
                filter={filter}
              ></FarmItem>
            );
          })}
        </div>
      </div>
    );
  }
};

export default withRouter(ProfilePage);
