import axios from 'axios';

export const fetchHeroes = async (size: number, offset: number) => (await axios.get('/heroes', { params: { size, offset } })).data;

export const deleteHeroById = async (id: string) => (await axios.delete(`/heroes/${id}`)).data;
