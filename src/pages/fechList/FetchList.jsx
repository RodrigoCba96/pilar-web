import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { startLoadingPokemons } from "../../redux/slices/todos/todosSlice";

import api from "../../services/api";
import { Card, CardContent, CardMedia, Grid, Typography, Modal, Box } from "@mui/material";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const IMG_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -70%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FetchList = () => {

    const [pokemons, setPokemons] = useState(null);
    const [next, setNext] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getPokemons()
    }, [])

    const getPokemons = async () => {
        try {
            dispatch(startLoadingPokemons({ isLoading: true }));
            const result = await api.GET(BASE_URL)
            if (result) {
                // console.log(result)
                console.log('poke: ', result.next)
                setPokemons(result.results);
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(startLoadingPokemons({ isLoading: false }))
        }
    }

    const loadMore = async () => {
        try {
            const result = await api.GET(next)
            if (result) {
                console.log('loadMore - poke: ', result.results)
                setPokemons(prev => [...prev, ...result.results])
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getPokemonImgId = (id) => {
        switch (id.length) {
            case 1:
                return `00${id}`
            case 2:
                return `0${id}`
            default:
                return id
        }
    }

    const renderItem = (item) => {

        const path = item.url.split('/')
        const imgID = getPokemonImgId(path[6]);
        const pokemonId = 0;

        return (
            <>

                <Card p={2} sx={{
                    display: 'flex', height: 100, cursor: 'pointer',
                    '&:hover': { backgroundColor: '#5acdbd', color: 'white' },
                }} onClick={() => {
                    handleCardClick(path[6])
                }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            N° {imgID}
                        </Typography>
                        <Typography component="div" variant="h5">
                            {item.name}
                        </Typography>
                    </CardContent>


                    <CardMedia
                        component="img"
                        sx={{ width: 100 }}
                        src={`${IMG_URL}/${path[6]}.png`}
                        alt="Live from space album cover"
                    />

                </Card >
            </>
        )

    }

    const handleClose = () => {
        setOpenModal(false);
        setSelectedPokemon(null);
        setPokemonData(null);
    }

    const handleCardClick = async (id) => {
        setSelectedPokemon(id);
        setOpenModal(true)
        if (selectedPokemon !== null) {

            try {
                const BASE_URL2 = BASE_URL + "/" + selectedPokemon;
                console.log(BASE_URL2)
                const pokemonResults = await api.GET(BASE_URL2)
                setPokemonData(pokemonResults);
            } catch (error) {
                console.log(error)
            }
        }

    }

    const renderModal = () => {
        let ability1 = ''
        let ability2 = ''
        if (pokemonData !== null) {
            if (pokemonData.abilities[0].ability.name && pokemonData.abilities[1].ability.name) {
                ability1 = pokemonData.abilities[0].ability.name;
                ability2 = pokemonData.abilities[1].ability.name;

            }
            const name = pokemonData.name;
            const imgPoke = pokemonData.sprites["front_shiny"];
            console.log("Habilidad 1: ", ability1);
            console.log("Habilidad 2: ", ability2);
            console.log(pokemonData.name)

            return (
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography component="div" variant="h5">
                                    Nombre: {name}
                                    <br />
                                    id:{pokemonData.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 100 }}
                                    src={imgPoke}
                                    alt="Live from space album cover"
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Typography component="div" variant="h5">
                                    Habilidad 1:
                                    <br />
                                    {ability1 ? ability1 : ''}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component="div" variant="h5">
                                    Habilidad 2:
                                    <br />
                                    {ability2 ? ability2 : ''}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            );
        }
        return null;
        console.log("Ta null")

    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography component="div" variant="h5">
                    My Pokedex
                </Typography>
            </Grid>
            {
                pokemons && pokemons.map((p, index) => {
                    return (
                        <Grid item xs={4} key={index}>
                            {renderItem(p)}
                        </Grid>
                    )
                })
            }
            <Grid item xs={4} >
                <Card p={2} sx={{
                    display: 'flex', height: 100, cursor: 'pointer',
                    backgroundColor: '#317b52', '&:hover': { backgroundColor: '#5acdbd' }
                }} onClick={() => loadMore()} >
                    <CardContent sx={{ flex: '1 0 auto' }} >
                        <Typography comment='div' variant='h5' sx={{ color: 'white' }}>
                            Cargar Mas
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {renderModal()}
        </Grid>
    )
}

export default FetchList;