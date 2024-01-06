package com.emsi.hotel.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    private String message;

    public ResourceNotFoundException(String message) {
        this.message = message;
        displayMessage(this.message);
    }

    private void displayMessage(String message) {
        System.out.println(message);
    }


}
