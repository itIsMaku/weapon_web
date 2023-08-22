import { useState } from "react";
import "./App.css";
import Auth from "./Auth";
import UserInfo from "./UserInfo";
import SelectionMenu from "./SelectionMenu";
import FactionSelect from "./FactionSelect";
import Summary from "./Summary";
import axios from "axios";

export interface User {
    auth_key: string;
    id: number;
    name: string;
    role: string;
    discord_id: string;
}

export default function App() {
    const [authenticationKey, setAuthenticationKey] = useState<
        string | undefined
    >(undefined);
    const [user, setUser] = useState<User>({
        auth_key: "",
        id: 0,
        name: "",
        role: "",
        discord_id: "",
    });
    const [factions, setFactions] = useState<any>();
    const [faction, setFaction] = useState<string>("weapon");
    const [factionData, setFactionData] = useState<any>();

    const handleAuth = (key: string, body: any, factions: any) => {
        setAuthenticationKey(key);
        setUser(body.user);
        setFactions(factions);
        handleFactionSelect("weapon");
    };

    const handleFactionSelect = async (faction: string) => {
        setFaction(faction);

        let newData: any = {};
        for (let property of ["invoices", "crafting", "shop"]) {
            console.log(property);
            console.log(
                `http://54.38.215.63:8080/api/faction/${faction}/${property}`
            );
            let p = new Promise((resolve, reject) => {
                axios
                    .get(
                        `http://54.38.215.63:8080/api/faction/${faction}/${property}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((res) => {
                        resolve(res.data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
            newData[property] = await p;
        }
        setFactionData(newData);
    };

    return (
        <>
            {authenticationKey === undefined ? (
                <div className="center-container">
                    <Auth success={handleAuth} />
                </div>
            ) : (
                <>
                    <UserInfo user={user} />
                    <FactionSelect
                        factions={factions}
                        select={handleFactionSelect}
                        currentFaction={faction}
                    />
                    <SelectionMenu user={user} active="home" />
                    <Summary
                        faction={factions[faction]}
                        factionData={factionData}
                    />
                </>
            )}
            {/* <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p> */}
        </>
    );
}
