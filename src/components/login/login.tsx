import React, { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Register } from '../../components/index'
import { Auth } from "../../services";


const Login: React.FC = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failLogin, setFailLogin] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true)
            const user = await Auth.login(email, password)
            if (user.status < 400) {
                setLoading(false)
                navigate('/home')
            } else {
                setFailLogin(true);
                setLoading(false);
            }
        } catch (e: any) {
            setFailLogin(true);
            setLoading(false)
        }
    }

    const handleFail = () => {
        setFailLogin(false);
        setEmail("");
        setPassword("");
    }

    return (
        <div className="form-container">
            {
                failLogin &&
                <Alert variant="danger">
                    <Alert.Heading>Algo deu errado!</Alert.Heading>
                    <hr />
                    <p>
                        Email ou password inválidos
                    </p>
                    <Button variant="danger" onClick={handleFail}>
                        Tentar Novamente
                    </Button>
                </Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="form-container-register">
                    <Form.Text>
                        Não possui uma conta? Clique para <Link to='/signup'>registrar</Link>
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Entrar
                </Button>
                {
                    loading &&
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className='p-2 ms-3'
                    />
                }
            </Form>
        </div>
    )
}

export default Login;
