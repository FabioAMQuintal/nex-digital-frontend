import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Register } from '../../components/index'
import { Auth } from "../../services";


const Login: React.FC = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true)
            const user = await Auth.login(email, senha)
            if (user) {
                setLoading(false)
                navigate('/home')
            }
        } catch (e: any) {
            setLoading(false)
            alert(`Dados inválidos.\nErro: ${e.name}`)
        }
    }

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
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
