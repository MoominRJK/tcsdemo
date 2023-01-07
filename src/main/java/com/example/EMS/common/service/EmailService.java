package com.example.EMS.common.service;

import com.example.EMS.common.QRGenBarcodeGenerator;
import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.activation.DataHandler;
import javax.mail.BodyPart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;
    private SimpleMailMessage mail = new SimpleMailMessage();
    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.emailSender = javaMailSender;
    }

    public void sendMailAboutEventRaffle(Participant participant, Event event) {
        mail.setTo(participant.getEmail());
        mail.setFrom("sophielinscl@gmail.com");
        mail.setSubject("CONGRATULATIONS ! " + event.getName() + " You have won the lottery for the event");
        mail.setText("Dear " + participant.getName() + " " +
                    participant.getSurname() + " Please contact us for detailed information." +
                    " contact");
        emailSender.send(mail);
    }
    
    public void sendEmailWithQrCode(Participant participant,Event event) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(participant.getEmail());
        helper.setFrom("sophielinscl@gmail.com");
        helper.setSubject(participationSuccessMessage(participant));

        MimeMultipart multipart = new MimeMultipart("related");
        createMessageBodyPartOfEmail(multipart);
        ByteArrayDataSource qrImageDataSource =
                QRGenBarcodeGenerator.createQrCodeWith(participant,event);
        putQrCodeAsImageToEmail(multipart,qrImageDataSource);
        message.setContent(multipart);
        //TODO: email the QR code
        try {
         //   emailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String participationSuccessMessage(Participant participant) {
        return "Dear " + participant.getName() + " " + participant.getSurname() +
                " we made your participation in the event.";
    }

    private void createMessageBodyPartOfEmail(MimeMultipart multipart) throws MessagingException {
        BodyPart messageBodyPart = new MimeBodyPart();
        String htmlText = "<H3>You can access the event information by scanning the QR Code whenever you want." +
                "and you can access your own information.</H3><img src=\"cid:image\">";
        messageBodyPart.setContent(htmlText, "text/html");
        multipart.addBodyPart(messageBodyPart);
    }

    public ByteArrayDataSource createQrCodeWith(Participant participant,Event event) throws IOException, WriterException {
        String url = "http://localhost:3000/" + participant.getUsername() +
                "/and/" +  event.getName() + "/information";
        byte[] qrImageBytes = QRGenBarcodeGenerator.getQRCodeImage(url, 250, 250);
        ByteArrayDataSource qrImageDataSource = new ByteArrayDataSource(qrImageBytes, "image/png");
        return qrImageDataSource;

    }

    private void putQrCodeAsImageToEmail(MimeMultipart multipart,
                                         ByteArrayDataSource qrImageDataSource) throws MessagingException {
        BodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart = new MimeBodyPart();
        messageBodyPart.setDataHandler(new DataHandler(qrImageDataSource));
        messageBodyPart.setHeader("Content-ID", "<image>");
        multipart.addBodyPart(messageBodyPart);
    }

}
