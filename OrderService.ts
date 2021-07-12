import { IEmailService } from "./IEmailService"
import { inject, injectable } from "inversify"
import { TYPES } from "./types"
import { IOrderService } from "./IOrderService"

@injectable()
export class OrderService implements IOrderService {

	constructor(
		@inject(TYPES.AWSEmailService) private emailService: IEmailService
	) {
	}

	public createOrder() {

		// Business Logic here
		this.sendInvoiceEmail("pravesh@curefit.com")
	}

	private sendInvoiceEmail(email: string) {
		this.emailService.sendEmail(email)
	}
}