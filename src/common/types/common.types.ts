import { SORT_DIRECTION, SORT_DIRECTION_AS_NUMBER } from '../constants';

export type SortingCondition<T> = { [key in keyof T]?: SORT_DIRECTION };
export type SortingConditionWithDirectionAsNumber<T> = { [key in keyof T]?: SORT_DIRECTION_AS_NUMBER };
