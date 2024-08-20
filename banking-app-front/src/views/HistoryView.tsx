import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { InboundTable } from "../components/tables/InboundTable";
import { OutboundTable } from "../components/tables/OutboundTable";

export const HistoryView = () => {
    const { user, fetchTransfers, history } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const gatherData = async () => {
        try {
            await fetchTransfers();
            setErrorMessage(null)
        } catch (error) {
            setErrorMessage('Failed to fetch transfers!')
        }
    }

    useEffect(() => {
        if (user) {
            gatherData();
        }
    }, [user]);

    return <div>
        <h2>History of transfers:</h2>
        <div>
            {!history && <p>{errorMessage}</p>}
            <InboundTable transfers={history?.filter(el => el.recipient_id === user?.id)} />
            <OutboundTable transfers={history?.filter(el => el.sender_id === user?.id)} />
        </div>
    </div>
}