package com.thuanmu.traininglevelassessment.payload.response;


/**
 * A response in the form of a message.
 *
 */
public class MessageResponse {
	private String message;

	public MessageResponse(String message) {
	    this.message = message;
	  }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}