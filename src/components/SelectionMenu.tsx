import { User } from "./App";
import "./SelectionMenu.css";
import { FiUsers, FiShoppingCart } from "react-icons/fi";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { RxGear } from "react-icons/rx";
import classNames from "classnames";

export default function SelectionMenu({
    user,
    active,
}: {
    user: User;
    active: string;
}) {
    return (
        <div className="selection-menu">
            <div
                className={classNames(
                    "selection-menu-item",
                    active == "home" ? "active" : ""
                )}
            >
                <AiOutlineHome className="selection-menu-item-icon" />
                <div className="selection-menu-item-title">Shrnutí</div>
            </div>
            <div
                className={classNames(
                    "selection-menu-item",
                    active == "invoices" ? "active" : ""
                )}
            >
                <TbFileInvoice className="selection-menu-item-icon" />
                <div className="selection-menu-item-title">Faktury</div>
            </div>
            <div
                className={classNames(
                    "selection-menu-item",
                    active == "crafting" ? "active" : ""
                )}
            >
                <RxGear className="selection-menu-item-icon" />
                <div className="selection-menu-item-title">Crafting</div>
            </div>
            <div
                className={classNames(
                    "selection-menu-item",
                    active == "shop" ? "active" : ""
                )}
            >
                <FiShoppingCart className="selection-menu-item-icon" />
                <div className="selection-menu-item-title">Samoobsluha</div>
            </div>
            {user.role === "admin" ? (
                <div
                    className={classNames(
                        "selection-menu-item",
                        active == "users" ? "active" : ""
                    )}
                >
                    <FiUsers className="selection-menu-item-icon" />
                    <div className="selection-menu-item-title">
                        Správa uživatelů
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
