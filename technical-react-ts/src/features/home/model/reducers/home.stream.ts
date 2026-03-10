import type { Observable } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import homeReducer from '.';
import type { HomeState, HomeAction } from '../home.types';

export function createHomeStateStream(
  actions$: Observable<HomeAction>,
  initialState: HomeState
): Observable<HomeState> {
  return actions$.pipe(
    scan((state, action) => homeReducer(state, action), initialState),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
