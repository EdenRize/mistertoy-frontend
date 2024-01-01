
export function MsgsTable({ msgs }) {

    if (!msgs.length) return <div>No messages yet</div>
    return (
        <table className="msgs-table general-table">
            <thead>
                <tr>
                    <td>Username:</td>
                    <td>Message:</td>
                </tr>
            </thead>

            <tbody>
                {msgs.map(msg => {
                    return <tr key={msg.id}>
                        <td>{msg.by.fullname}</td>
                        <td>{msg.txt}</td>
                    </tr>
                })}
            </tbody>

        </table>
    )
}
