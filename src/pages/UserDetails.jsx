import { useSelector } from "react-redux"

export function UserDetails() {
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    console.log('user', user)
    return (
        <section className="page user-details">
            <h1>Profile</h1>
            <h2>Name: {user.fullname}</h2>
        </section>
    )
}
