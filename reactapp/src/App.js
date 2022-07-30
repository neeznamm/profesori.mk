import { Outlet, Link, useParams } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>profesori.mk</h1>
      <Outlet />
    </div>
  );
}
