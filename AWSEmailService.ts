import { IEmailService } from "./IEmailService"
import { injectable } from "inversify"

@injectable()
export class AWSEmailService implements IEmailService {

	public sendEmail(email: string) {
		console.log("AWS Service Send email to " + email)
	}
}