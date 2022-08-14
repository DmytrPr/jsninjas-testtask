import {
  AnyAction,
  createAsyncThunk, createSlice, Middleware, PayloadAction,
} from '@reduxjs/toolkit';
import {
  deleteHeroById, fetchHeroes, createHero as crHero, editHero as edHero,
} from './heroesAPI';
import { Hero } from './interfaces/hero.interface';

export interface HeroesState {
    loadedHeroes: Hero[];
    page: number;
    total: number;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: HeroesState = {
  loadedHeroes: [],
  page: 1,
  total: 1,
  loading: 'idle',
};

export const loadHeroes = createAsyncThunk(
  'heroes/loadHeroes',
  async ({ size, offset }: {size: number, offset: number}) => fetchHeroes(size, offset),
);

export const createHero = createAsyncThunk(
  'heroes/createHero',
  async ({ heroData }: {heroData: FormData}) => crHero(heroData),
);

export const deleteHero = createAsyncThunk(
  'heroes/deleteHero',
  async ({ id }: {id: string}) => deleteHeroById(id),
);

export const editHero = createAsyncThunk(
  'heroes/editHero',
  async ({ heroData }: {heroData: FormData}) => edHero(heroData),
);

export const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    movePage: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= state.total) {
        state.page = action.payload;
      }
    },
    nextPage: (state) => {
      const nextPage = state.page + 1;
      if (state.total >= nextPage) {
        state.page = nextPage;
      }
    },
    previousPage: (state) => {
      const nextPage = state.page - 1;
      if (nextPage >= 1) {
        state.page = nextPage;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadHeroes.fulfilled, (state, action) => {
      state.loadedHeroes = action.payload.data;
      state.total = Math.ceil(action.payload.total / 5);
    });
  },
});

export const reloadHeroesMiddleware: Middleware = (store) => (next) => (action) => {
  if ([
    'heroes/movePage',
    'heroes/nextPage',
    'heroes/previousPage',
    'heroes/deleteHero/fulfilled',
    'heroes/createHero/fulfilled',
    'heroes/editHero/fulfilled',
  ].includes(action.type)) {
    const result = next(action);
    const { page } = store.getState().heroes;
    store.dispatch(loadHeroes({ size: 5, offset: (page - 1) * 5 }) as unknown as AnyAction);
    return result;
  }
  return next(action);
};

export const { movePage, nextPage, previousPage } = heroesSlice.actions;

export default heroesSlice.reducer;
