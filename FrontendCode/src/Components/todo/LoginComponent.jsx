import { useState } from "react"
import './TodoApp.css'
import { useNavigate} from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent(){

    const [username, setUsername] = useState('ghanashyam')

    const [password, setPassword] = useState('test')
    
    const [showErrorMessage, setErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext =  useAuth()


    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    async function handleSubmit(){
        if(await authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        }
        else{
            setErrorMessage(true)
        }
    }

    return(
        <div className="Login">
            <h1>Time to login!</h1>
            {showErrorMessage && <div className="errorMessage">Authentication Failed. Please check your credentials</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" className="myClass" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;