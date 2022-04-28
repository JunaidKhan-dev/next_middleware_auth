import axios from "axios"
import React, { useState } from "react"
import { useRouter } from "next/router"

const login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "560px",
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const credentials = { username, password }

    const user = await axios.post("/api/auth/login", credentials)
    console.log(user)
    if (user.status === 200) {
      router.push("/dashboard/user")
    }
  }
  return (
    <div>
      {" "}
      <form style={formStyle} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password"> Password </label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button> Log in </button>
      </form>
    </div>
  )
}

export default login
