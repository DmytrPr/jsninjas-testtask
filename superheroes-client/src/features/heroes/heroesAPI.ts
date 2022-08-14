import axios from 'axios';

export const fetchHeroes = async (size: number, offset: number) => (await axios.get('/heroes', { params: { size, offset } })).data;

export const deleteHeroById = async (id: string) => (await axios.delete(`/heroes/${id}`)).data;

export const createHero = async (heroData: FormData) => (await axios.post('/heroes', heroData)).data;

export const editHero = async (heroData: FormData) => (await axios.patch('/heroes', heroData)).data;
