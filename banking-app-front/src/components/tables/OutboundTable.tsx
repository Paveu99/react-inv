import { useEffect } from "react"
import { useAuth } from "../../AuthContext"
import { Investment } from "../../types"

type OutboundTransfersProps = {
    transfers: Investment[] | undefined
}

export const OutboundTable = ({ transfers }: OutboundTransfersProps) => {

    const { otherUsers, user, fetchOtherUsers } = useAuth()

    useEffect(() => {
        fetchOtherUsers()
    }, [])

    const noRecord = <h3>No records of inbound transactions</h3>

    const tableOut = <table>
        <thead>
            <tr>
                <th>Amount $</th>
                <th>Timestamp</th>
                <th>Sender</th>
                <th>Recipient</th>
            </tr>
        </thead>
        <tbody>
            {transfers?.map(el => (
                <tr>
                    <td>{el.amount}</td>
                    <td>{String(el.timestamp).split('T')[0]} {String(el.timestamp).split('T')[1].slice(0, -5)}</td>
                    <td style={{ color: "blue" }}>{user?.username}</td>
                    <td>{otherUsers?.find(other => other.id === el.recipient_id)?.username}</td>
                </tr>
            ))}
        </tbody>
    </table>

    return <div style={{ textAlign: "left" }}>
        <h3><span style={{ color: "red" }}>Outbound</span> transactions:</h3>
        {transfers?.length === 0 ? noRecord : tableOut}
    </div>
}