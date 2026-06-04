import { createReducer, on } from "@ngrx/store";
import { updateUser, resetUser } from "./user.action";
import { UserState, initialUserState } from '../user/user.state';
export const userReducer = createReducer(
    initialUserState,
    on(updateUser, (state, action) => ({
        ...state,
        name: action.name,
        role: action.role
    })),
    on(resetUser, () => initialUserState)
);