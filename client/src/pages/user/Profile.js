import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { getUserProfile } from "../../functions/user";
import { isAuth } from "../../functions/auth";
const Profile = ({ match }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const token = isAuth() && isAuth().data.token

  const init = (userId) => {
    getUserProfile(userId,token)
    .then(response => {
      if(response.error) {
        setUser({ ...user, error: response.error })
      } else {
        console.log(response)
        setUser({ ...user, name: response.name, email: response.email,  })
      }
    })
  }

  useEffect(() => {
    init(match.params.userId)
  },[])
  
  return (
    <Layout title="User Profile" className="container">
      hello there
    </Layout>
  );
};

export default Profile;
