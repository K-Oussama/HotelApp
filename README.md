# HotelApp

# Hotel App Setup Guide

This guide provides instructions on setting up the Hotel App project with MySQL database configuration and Outlook SMTP settings.

## MySQL Database Configuration

1. **Database Connection**

   Ensure MySQL is installed and running on your local machine.

2. **Update Application Properties**

   rename the `application.properties.template` file to `application.properties.template` in your Spring Boot project with the following properties:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hotelapp
   spring.datasource.username=root
   spring.datasource.password=root
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.generate-ddl=true
   ```

Note: Replace root with your MySQL username and password.


## SMTP Settings

### Outlook SMTP settings

   ```properties
   spring.mail.host=smtp.office365.com
   spring.mail.port=587
   spring.mail.username={email}
   spring.mail.password={password}
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   spring.mail.properties.mail.smtp.starttls.required=true
   ```


Note: Use your Outlook email credentials in place of {email} and {password}

## Running the Application

Build and Run

Use your preferred IDE or terminal to build and run the Spring Boot application.

Access the Application

Once the java application is running, access it via the specified URL (usually http://localhost:8080).

Check Postman collection for demonstration

## Frontend app

`npm i`

`npm start`


