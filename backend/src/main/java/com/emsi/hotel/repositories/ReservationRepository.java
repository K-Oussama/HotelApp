package com.emsi.hotel.repositories;

import com.emsi.hotel.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // Add custom methods for reservation-related operations

    // find by id


    //@Override
    //@Query("SELECT r FROM Reservation r WHERE r.user.id = ?1")
    //public List<Reservation> findByUser(Long userId);

    //public List<Reservation> findByUserId(Long userId);

    public List<Reservation> findByStartDate(LocalDate startDate);

    public List<Reservation> findByEndDate(LocalDate endDate);

    @Query("SELECT r FROM Reservation r WHERE r.room.id = ?1")
    public List<Reservation> findByRoomId(Long roomId);

    @Query("SELECT r FROM Reservation r WHERE r.user.id = ?1")
    public List<Reservation> findByUser(Long userId);

}

