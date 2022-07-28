import { Outlet, Link, useParams } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Main App Page</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/professor">Professor</Link>
      </nav>
      <Outlet />
    </div>
  );
}