import { createActionChainMiddleware, combineChains } from "./support/actionChain";

import { sample3Chain } from "./sample3"
import { environmentChain } from "./environment";

export const actionChainMiddleware = createActionChainMiddleware(
    combineChains(
        environmentChain,
        sample3Chain
    )
)