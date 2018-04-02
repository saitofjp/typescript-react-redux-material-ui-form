import { actionChainCreater } from "./support/actionChain";

import { sample3Binder } from "./sample3"
import { environmentBinder } from "./environment";

export const actionChain = actionChainCreater(
    environmentBinder,
    sample3Binder
)