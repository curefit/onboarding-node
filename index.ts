require("reflect-metadata")
import kernel from "./ioc/kernel"
import { ServerConfig } from "@curefit/server"
import { CFBaseServer, SERVER_TYPES } from "@curefit/server"

const serverConfigOptions = kernel.get<ServerConfig>(SERVER_TYPES.ServerConfig)
const server = new CFBaseServer(kernel, serverConfigOptions)
server.start()