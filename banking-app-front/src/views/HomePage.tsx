export const HomePage = () => {
    return <div style={{ textAlign: "left" }}>
        <h2>Welcome to the Transaction App</h2>
        <p>
            Welcome to our simple yet functional Banking Application, designed to simulate basic banking operations.
        </p>
        <div>
            <h3>What You Can Do</h3>
            <ul>
                <li>
                    <strong>User Registration:</strong> Create a new user account with a username, password, and initial balance. This allows you to participate in various banking operations within the app.
                </li>
                <li>
                    <strong>User Login:</strong> Securely log in to your account to access your balance, make transactions, and view your transaction history. The session management ensures that your credentials remain safe during your logged-in period.
                </li>
                <li>
                    <strong>View Account Balance:</strong> Once logged in, you can view your current account balance. This helps you keep track of your funds.
                </li>
                <li>
                    <strong>Money Transfers:</strong> Transfer funds to other users in the system. The app allows you to specify the recipient and the amount you wish to send, making it easy to manage your finances.
                </li>
                <li>
                    <strong>Transaction History:</strong> Review a list of your past transactions, including details like the amount transferred, the recipient, and the date and time of each transaction.
                </li>
            </ul>
        </div>
        <div>
            <h3>Key Features</h3>
            <ul>
                <li>
                    <strong>Session Management:</strong> The app uses session management to keep your account information secure while you're logged in, eliminating the need to store sensitive data in cookies or local storage.
                </li>
                <li>
                    <strong>Basic Security Vulnerabilities:</strong> For educational purposes, this application includes known vulnerabilities from the OWASP Top 10, such as improper input validation and weak session management. These vulnerabilities are included to help developers learn about security issues and how to mitigate them.
                </li>
                <li>
                    <strong>Simple and Intuitive Interface:</strong> The app is built using React, Vite, and TypeScript, ensuring a fast and responsive user interface that is easy to navigate.
                </li>
            </ul>
        </div>
        <div>
            <h3>Security Notice</h3>
            <p>
                This application is intentionally designed with certain vulnerabilities to demonstrate common security pitfalls in web applications. It should not be used in a production environment or with real financial data.
            </p>
        </div>
    </div>

}