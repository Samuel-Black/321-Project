import { useState } from 'react'
import { Auth } from 'aws-amplify';

export default async function CurrentUser() {
    const [thisUser, setUser] = useState('')

    setUser(await Auth.currentSession())
  
    return thisUser
  }