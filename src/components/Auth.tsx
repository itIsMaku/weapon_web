import axios from "axios";
import "./Auth.css";

export default function Auth({
    success,
}: {
    success: (key: string, body: any, factions: any) => void;
}) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let form = e.currentTarget;
        let formData = new FormData(form);
        let formJson = Object.fromEntries(formData.entries());
        let text = formJson["auth-key"] as string;
        axios
            .get("http://188.75.130.253:27801/api/auth", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: text,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    let user = res.data;
                    axios
                        .get("http://188.75.130.253:27801/api/factions")
                        .then((res) => {
                            success(text, user, res.data);
                        });
                } else {
                    alert(`Nepodařilo se přihlásit. (${res.data})`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert(`Nepodařilo se přihlásit.`);
            });
    };

    return (
        <form className="auth-form" method="post" onSubmit={handleSubmit}>
            <p className="header-title">Autentizace</p>

            <input
                type="password"
                name="auth-key"
                className="auth-key"
                placeholder="Přihlašovací klíč"
            />
            <button className="auth-button">Přihlásit</button>
        </form>
    );
}
