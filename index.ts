import QueueConsumer from "./consumers/QueueConsumer";

require("reflect-metadata")
import kernel from "./ioc/kernel"
import { ServerConfig } from "@curefit/server"
import { CFBaseServer, SERVER_TYPES } from "@curefit/server"
import {TYPES} from "./ioc/types";

const serverConfigOptions = kernel.get<ServerConfig>(SERVER_TYPES.ServerConfig)
const server = new CFBaseServer(kernel, serverConfigOptions)
server.start()
kernel.get<QueueConsumer>(TYPES.QueueConsumer)
