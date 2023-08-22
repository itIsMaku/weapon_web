import "./UserInfo.css";
import { User } from "./App";

export default function UserInfo({ user }: { user: User }) {
    return (
        <div className="user-info">
            <div className="user-info-content">
                <div className="user-info-item">
                    <span className="user-info-item-title">Jméno: </span>
                    <span className="user-info-item-content">{user.name}</span>
                </div>
                <div className="user-info-item">
                    <span className="user-info-item-title">Discord: </span>
                    <span className="user-info-item-content">
                        {user.discord_id}
                    </span>
                </div>
                <div className="user-info-item">
                    <span className="user-info-item-title">Role: </span>
                    <span className="user-info-item-content">{user.role}</span>
                </div>
            </div>
        </div>
    );
}
