import "./FactionSelect.css";

export default function FactionSelect({
    factions,
    select,
    currentFaction,
}: {
    factions: any;
    select: (faction: string) => void;
    currentFaction: string;
}) {
    return (
        <div className="faction-select">
            <select className="faction-select-menu">
                {Object.keys(factions).map((faction) => {
                    return (
                        <option
                            key={faction}
                            value={faction}
                            className="faction-select-item"
                            selected={faction === currentFaction}
                            onClick={() => {
                                select(faction);
                            }}
                        >
                            Frakce: {faction}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
