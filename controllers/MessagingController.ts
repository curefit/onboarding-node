import {controller, httpPost} from "inversify-express-utils"
import {Container, inject} from "inversify"
import {BASE_TYPES, ILogger} from "@curefit/base"
import {EventData, EVENTS_TYPES, IEventsService} from "@curefit/events-util"


export function MessagingControllerFactory(kernel: Container) {

    @controller("/messaging")
    class MessagingController {
        constructor(
            @inject(BASE_TYPES.ILogger) private logger: ILogger,
            @inject(EVENTS_TYPES.EventsService) private eventsService: IEventsService
        ) {
        }

        @httpPost("/sns")
        public async getKey(request): Promise<{ status: boolean }> {
            const {topic, payload, eventType} = request.body
            const eventData = new EventData(eventType, undefined, new Date().getTime(), payload)
            return {status: await this.eventsService.publishMessage(topic, eventData)}
        }
    }

    return MessagingController
}
