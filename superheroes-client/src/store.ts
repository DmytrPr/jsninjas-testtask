import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import heroesReducer, { reloadHeroesMiddleware } from './features/heroes/heroesSlice';

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
  middleware: (gDM) => gDM().concat(reloadHeroesMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
