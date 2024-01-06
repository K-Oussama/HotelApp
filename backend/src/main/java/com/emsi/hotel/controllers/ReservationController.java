package com.emsi.hotel.controllers;

import com.emsi.hotel.entities.Reservation;
import com.emsi.hotel.entities.Room;
import com.emsi.hotel.entities.User;
import com.emsi.hotel.entities.User.UserRole;
import com.emsi.hotel.repositories.ReservationRepository;
import com.emsi.hotel.repositories.RoomRepository;
import com.emsi.hotel.repositories.UserRepository;
import com.emsi.hotel.services.EmailService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {


    private final ReservationRepository reservationRepository;
    private final EmailService emailService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public ReservationController(ReservationRepository reservationRepository, EmailService emailService) {
        this.reservationRepository = reservationRepository;
        this.emailService = emailService;
    }

    // CRUD methods for Reservation entity similar to UserController
    // GET, POST, PUT, DELETE mappings

    // Get all reservations
    @GetMapping
    @PreAuthorize("#id == principal.id")
    public ResponseEntity<List<Reservation>> getAllReservations() {

         // Get the current logged-in user
        User currentUser = userRepository.findByEmailOrUsername(SecurityContextHolder.getContext().getAuthentication().getName());

        // Get all reservations for the current user if the user is a CLIENT
         if (currentUser.getRole().toString().equals(UserRole.CLIENT.toString())) {
            List<Reservation> clientReservations = reservationRepository.findByUser(currentUser.getId());
            return ResponseEntity.ok(clientReservations);
        }

        List<Reservation> reservations = reservationRepository.findAll();
        return ResponseEntity.ok(reservations);
    }


    // GET /api/reservations/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            return ResponseEntity.ok(optionalReservation.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }    

    // Create a new reservation
    @PostMapping
    @PreAuthorize("#id == principal.id")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        // Get room and date range from the reservation request
        Room room = reservation.getRoom();
        LocalDate startDate = reservation.getStartDate();
        LocalDate endDate = reservation.getEndDate();
    
        // Check if the room is available for the specified date range
        boolean isRoomAvailable = roomRepository.isRoomAvailableForDates(room.getId(), startDate, endDate);
    
        if (!isRoomAvailable) {
            return ResponseEntity.badRequest().build(); // Room is not available, return 400 Bad Request
        }else{
            // Room is available, proceed with creating the reservation
            // Calculate total price based on the room's price and duration of stay
            double roomPrice = room.getRoomPrice();
            long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);
            double totalPrice = roomPrice * daysBetween;
            reservation.setTotalPrice(totalPrice);

            Reservation createdReservation = reservationRepository.save(reservation);

            // Send email notification to the user
            emailService.sendReservationConfirmationEmail(createdReservation);


            return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
        }
    
    }



    // Update reservation details
    @PutMapping("/{id}")
    @PreAuthorize("#id == principal.id")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation reservationDetails) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();

            // Update reservation details
            reservation.setStartDate(reservationDetails.getStartDate());
            reservation.setEndDate(reservationDetails.getEndDate());
            reservation.setRoom(reservationDetails.getRoom());
            reservation.setUser(reservationDetails.getUser());

            Reservation updatedReservation = reservationRepository.save(reservation);
            return ResponseEntity.ok(updatedReservation);
        } else {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
    }

    // Delete reservation
    @DeleteMapping("/{id}")
    @PreAuthorize("#id == principal.id")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();
            reservationRepository.delete(reservation);
            return ResponseEntity.ok().build();
        } else {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
    }


    // Custom methods for reservation-related operations
    @GetMapping("/findByCheckInDate/{checkInDate}")
    @PreAuthorize("#id == principal.id")
    public List<Reservation> findByCheckInDate(@PathVariable LocalDate checkInDate) {
        return reservationRepository.findByStartDate(checkInDate);
    }
    
    @GetMapping("/findByCheckOutDate/{checkOutDate}")
    @PreAuthorize("#id == principal.id")
    public List<Reservation> findByCheckOutDate(@PathVariable LocalDate checkOutDate) {
        return reservationRepository.findByEndDate(checkOutDate);
    }




}

