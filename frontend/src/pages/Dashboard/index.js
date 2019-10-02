import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {

    const [spots, setSpots] = useState([]);

    useEffect(() => { //executa a função toda vez que o que está dentro do array for alterado :3  (array vazio = executa uma unica vez)
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    return(
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    );
}