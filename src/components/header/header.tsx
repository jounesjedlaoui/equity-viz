import SearchBar from "./searchBar"
import UserBubble from "./userBubble"
import "./header.css";

export default function Header() {
    
    return (
        <div className="header">
            <h2>AD</h2>
            
            <SearchBar />
            {/* <UserBubble /> */}
        </div>
    )

}