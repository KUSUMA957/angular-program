import { createAction, props } from "@ngrx/store";
export const updateUser = createAction(
    '[User] Update User',
    props<{name: string; role: string}>()
);
export const resetUser = createAction(
    '[User] Reset User',
);