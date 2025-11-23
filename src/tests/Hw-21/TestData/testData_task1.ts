interface ItestData {
    caseName: string;
    username: string;
    password: string;
    expectedmessage: string;
}

export const dataSetForTest: ItestData[] = [
    {
        caseName: "Empty Username",
        username: "",
        password: "Password",
        expectedmessage : "Username is required"
    },
    {
        caseName: "Short Username",
        username: "ki",
        password: "Password",
        expectedmessage : "Username should contain at least 3 characters"
    },
    {
        caseName: "Prefix space Username",
        username: " kirill",
        password: "Passwords",
        expectedmessage : "Prefix and postfix spaces are not allowed is username"
    },
     {
        caseName: "Postfix space Username",
        username: "kirill ",
        password: "Password",
        expectedmessage : "Prefix and postfix spaces are not allowed is username"
    },
     {
        caseName: "Only spaces Username",
        username: "         ",
        password: "Password",
        expectedmessage : "Prefix and postfix spaces are not allowed is username"
    },
     {
        caseName: "Empty Password",
        username: "kirill",
        password: "",
        expectedmessage : "Password is required"
    },
     {
        caseName: "Short Password",
        username: "kirill",
        password: "Passwor",
        expectedmessage : "Password should contain at least 8 characters"
    },
    {
        caseName: "Only capital case Password",
        username: "kirill",
        password: "PASSWROD",
        expectedmessage : "Password should contain at least one character in lower case"
    },
    {
        caseName: "Only lower case Password",
        username: "kirill",
        password: "passwrod",
        expectedmessage : "Password should contain at least one character in capital case"
    },
     {
        caseName: "Only spaces Password",
        username: "kirill",
        password: "         ",
        expectedmessage : "Password is required"
    }
]