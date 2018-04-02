import { actionBinderDispatcherCreater } from "./support/actionBinder";

import { sample3Binder } from "./sample3"
import { environmentBinder } from "./environment";

export const actionBinderDispatcher = actionBinderDispatcherCreater([
    environmentBinder,
    sample3Binder
])