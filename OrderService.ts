import { AWSEmailService } from "./AWSEmailService"


export class OrderService {

	private emailService: AWSEmailService

	constructor() {
		this.emailService = new AWSEmailService()
	}

	public createOrder() {

		// Business Logic here
		this.sendInvoiceEmail()
	}

	private sendInvoiceEmail() {
		this.emailService.sendEmail()
	}
}