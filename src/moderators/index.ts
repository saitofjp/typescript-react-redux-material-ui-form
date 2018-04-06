import { createActionChainMiddleware, combineActionChains } from "./support/actionChain";

import { sample3Chain } from "./sample3"
import { environmentChain } from "./environment";

export const actionChainMiddleware = createActionChainMiddleware(
    combineActionChains(
        environmentChain,
        sample3Chain
    )
)