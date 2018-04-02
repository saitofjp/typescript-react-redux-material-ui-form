import {sample3Binder} from "./sample3"
import { environmentBinder } from "./environment";
import { bindActionDispatcherCreater } from "./support/bindActionDispacher";

export const bindActionDispatcher = bindActionDispatcherCreater([
    environmentBinder,
    sample3Binder
])