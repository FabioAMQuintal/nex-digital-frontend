import { Logout } from '../../components/index'
import { Auth } from '../../services'
import axios from 'axios'
import { Button, Card } from 'react-bootstrap'
import { useState } from 'react'

import config from '../../config/index'

const Dashboard = () => {

    const [data, setData] = useState<any[]>([])

    const getToken = () => {
        return Auth.getCurrentUser();
    }
    const getProducts = async () => {
        try {
            const response = await axios.get(config.baseUrlLocal.concat(config.products), {
                headers: { 'x-access-token': getToken() }
            });
            return response.data.random;
        } catch (e: any) {
            const { response } = e;
            return response.data.error;
        }
    }

    const handleClick = async () => {
        setData(await getProducts())
    }

    return (
        <div>
            <div className="header">
                <Button variant="primary" onClick={handleClick}>Gerar Produtos</Button>
                <Logout />
            </div>
            <div className='container-data'>
                <div className='container-cards'>
                    {
                        data.map((item, i) => {
                            return (
                                <Card className="container-cards-item">
                                    <Card.Img variant="top" src={item.avatar} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.job}
                                            {item.adjective}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default Dashboard