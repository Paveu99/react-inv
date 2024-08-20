import { FormEvent, useEffect, useState } from "react"
import { Transfer } from "../types";
import { useAuth } from "../AuthContext";

export const TransferView = () => {

    const [form, setForm] = useState<Transfer>({ amount: 0, recipient: "" });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { otherUsers, fetchOtherUsers, transferMoney, user } = useAuth()

    const gatherData = async () => {
        await fetchOtherUsers();
    }

    useEffect(() => {
        gatherData()
    }, [])

    const clear = () => {
        setForm({
            amount: 0,
            recipient: ''
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (form.recipient) {
            try {
                const res = await transferMoney(form.amount, form.recipient);

                if (res.newTransaction.id.length === 36 && res.newTransaction.sender_id === user?.id) {
                    setErrorMessage(null);
                    setSuccessMessage(res.message);
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000)
                    clear();
                }
            } catch (error) {
                setErrorMessage(error as string)
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000)
            }
        } else {
            setErrorMessage('No recipient was chosen!')
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000)
        }
    }

    const handleChange = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }));
    };

    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <h2>Transfer money between two users:</h2>
        {
            errorMessage && (
                <p className="checkAnswer" style={{ backgroundColor: 'red' }}>
                    {errorMessage}
                </p>
            )
        }
        {
            successMessage && (
                <p className="checkAnswer" style={{ backgroundColor: 'green' }}>
                    {successMessage}
                </p>
            )
        }
        <form onSubmit={handleSubmit}>
            <select className="select-user" value={form.recipient} name="recipient" onChange={e => handleChange(e.target.name, e.target.value)}>
                <option value="">Select a user to send money to...</option>
                {otherUsers?.map((el) => (
                    <option key={el.id} value={el.id}>{el.username}</option>
                ))}
            </select>
            <input type="number" name="amount" className="amount-input" style={{ width: "1182.67px" }} value={form.amount} onChange={e => handleChange(e.target.name, e.target.value)} />
            <button className="submit-transfer">Submit</button>
        </form>
    </div >
}