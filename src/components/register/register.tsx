import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Register as RegisterService } from "../../services";


const Register: React.FC = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true)
            const user = await RegisterService.register(name, email, senha)
            return navigate('/')
        } catch (e: any) {
            setLoading(false)
            alert(`Dados inválidos.\nErro: ${e.name}`)
        }
    }

    return (
        <div className="form-container">
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
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
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