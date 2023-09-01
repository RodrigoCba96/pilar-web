import axios from 'axios';
import { BASE_URL, IMG_URL } from "../constants";

const headers = () => {
    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return headers
}

const errorMessage = {
    message: "Error en el servidor",
    name: "serverError",
    statusCode: 500
}

const POST = async (url, payload) => {
    let res = null;
    try {
    res = await axios.post(url, payload, headers());
    return (res && res.data) || null
    } catch (error) {
    throw (error && error.response.data.error) || errorMessage
    }
    };

    const GET = async (url) => {
        try {
          const res = await axios.get(url, headers()); // Cambia de axios.post a axios.get
          return (res && res.data) || null;
        } catch (error) {
          throw (error && error.response.data.error) || errorMessage;
        }
      };
      

const PATCH = async (url, payload) => {
    let res = null;
    try {
    res = await axios.post(url, payload, headers());
    return (res && res.data) || null
    } catch (error) {
    throw (error && error.response.data.error) || errorMessage
    }
    };

    const DELETE = async (url, payload) => {
        let res = null;
        try {
        res = await axios.post(url, payload, headers());
        return (res && res.data) || null
        } catch (error) {
        throw (error && error.response.data.error) || errorMessage
        }
        };

export default {
    POST,
    GET,
    PATCH,
    DELETE,   pokemons: `${BASE_URL}/pokemon`,

}