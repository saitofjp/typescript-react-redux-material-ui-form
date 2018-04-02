import {sample3Binder} from "./sample3.moderator"
import { environmentBinder } from "./environment.moderator";
import { bindActionDispatcherCreater } from "./support/bindActionDispacher";

export const bindActionDispatcher = bindActionDispatcherCreater([
    environmentBinder,
    sample3Binder
])