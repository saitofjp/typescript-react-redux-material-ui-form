
import { sample3Chain } from "./sample3"
import { environmentChain } from "./environment";
import { createActionChainMiddleware, combineActionChains } from "redux-action-chain";

export const actionChainMiddleware = createActionChainMiddleware(
    combineActionChains(
        environmentChain,
        sample3Chain
    )
)