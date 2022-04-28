import { useRouter } from "next/router"
import React from "react"

const user = () => {
  const router = useRouter()
  return (
    <div>
      <h1>Sensitive Data</h1>
      <button onClick={() => router.push("/")}>Home</button>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
export default user
