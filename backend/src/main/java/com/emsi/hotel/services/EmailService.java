package com.emsi.hotel.services;

import com.emsi.hotel.entities.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); // Enable HTML content

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Handle exception or log the error
        }
    }

    public void sendReservationConfirmationEmail(Reservation reservation) {
        String to = reservation.getUser().getEmail();
        String subject = "Reservation Confirmation";
        String body = "<h3>Dear " + reservation.getUser().getUsername() + ",</h3>"
                + "<p>Your reservation for room " + reservation.getRoom().getRoomNumber() + " has been confirmed.</p>"
                + "<p>Reservation details:</p>"
                + "<ul>"
                + "<li>Start Date: " + reservation.getStartDate() + "</li>"
                + "<li>End Date: " + reservation.getEndDate() + "</li>"
                + "</ul>"
                + "<p>Thank you for choosing our hotel.</p>";

        sendEmail(to, subject, body);
    }
}

