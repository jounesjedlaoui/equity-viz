import type { User } from '../../types/types';
import "./header.css";

export default function UserBubble() {
    const user: User = {
        username: 'testperson'
    };

    return (
        <div className="userBubble">
            <p>{user.username}</p>
            <div className="bubble"></div>
        </div>
    )
}