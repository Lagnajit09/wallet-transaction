import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../store/user";

function Dashboard() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return <div>Dashboard</div>;
}

export default Dashboard;
