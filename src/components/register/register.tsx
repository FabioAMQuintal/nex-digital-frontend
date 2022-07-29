import React, { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Register as RegisterService } from "../../services";


const Register: React.FC = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [failRegister, setFailRegister] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true)
            const user = await RegisterService.register(name, email, password)
            if (user.status < 400) {
                setRegistered(true);
                setLoading(false);
                return;
            } else {
                setFailRegister(true);
                setLoading(false);
                return
            }
        } catch (e: any) {
            setLoading(false)
        }
    }

    const handleFail = () => {
        setFailRegister(false);
        setName("");
        setEmail("");
        setPassword("");
    }

    const handleSuccess = () => {
        navigate('/')
    }

    return (
        <div className="form-container">
            {registered &&
                    <Alert variant="success">
                        <Alert.Heading>Deu certo!</Alert.Heading>
                        <hr />
                        <p>
                            Usuário cadastrado com sucesso
                        </p>
                        <Button onClick={handleSuccess} variant="outline-success">
                            Login
                        </Button>
                    </Alert>
            }
            {
                failRegister &&
                    <Alert variant="danger">
                        <Alert.Heading>Algo deu errado!</Alert.Heading>
                        <hr />
                        <p>
                            Usuário não foi cadastrado
                        </p>
                        <Button variant="danger" onClick={handleFail}>
                            Tentar Novamente
                        </Button>
                    </Alert>
            }

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="form-container-register">
                </Form.Group>
                <Button variant="primary" type="submit">
                    Cadastrar
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

export default Register;