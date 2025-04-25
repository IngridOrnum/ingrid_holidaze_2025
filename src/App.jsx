import {Link} from "react-router-dom";

function App() {

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <h1>Home</h1>
        <Link to={"/search-results"}>
            <button className={"bg-yellow-200 p-6"}>Search</button>
        </Link>
      <Link to={"/single-venue/:id"}>
        <div className={"bg-blue-400 p-6"}>
          Single Venue
        </div>
      </Link>
    </div>
  )
}

export default App
