import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className=" text-red-500 text-5xl font-bold">TechwebLabs Dashboard  :  </p>
      <br></br>
      {user && <h2>Hi Welcome {user.fullname}</h2>}
    </div>
  );
}
