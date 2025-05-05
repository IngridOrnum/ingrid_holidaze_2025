import {Link} from "react-router-dom";
import {Hero} from "./Components/Hero/hero.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function App() {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    function handleSearchClick() {
        if (searchQuery.trim()) {
            navigate(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate("/search-results")
        }
    }

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <Hero/>
        <div>
            <input  type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search venues"
            />
            <button onClick={handleSearchClick} className={"bg-yellow-200 p-6"}>Search</button>
        </div>
      <Link to={"/single-venue/:id"}>
        <div className={"bg-blue-400 p-6"}>
          Single Venue
        </div>
      </Link>
    </div>
  )
}

export default App
