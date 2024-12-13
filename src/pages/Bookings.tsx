import { Booking } from "@/types/bookings.tsx";
import { RootState } from "@/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { Studio, StudioFeature, StudioSpecialty } from "@/types/studio.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Avatar } from "@mui/joy";
import { CalendarCheck, Check, X } from "lucide-react";
import { FaChevronLeft } from "react-icons/fa";
import CustomButton from "@/components/Buttons/CustomButton";
import {
  bookingSlice,
  cancelBookingById,
  fetchBookingOfUser,
} from "@/reducers/bookingReducer.ts";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Bookings() {
  const dispatch = useDispatch();
  dispatch(bookingSlice.actions.clearQuote());

  const handleCancelReservation = (id: number) => {
    dispatch(cancelBookingById(id));
    dispatch(fetchBookingOfUser());
  };

  const userBookingsFromStore = useSelector(
    (state: RootState) => state.bookings.bookingsUser
  );

  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const sortedBookings = [...userBookings].sort((a: Booking, b: Booking) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  useEffect(() => {
    dispatch(fetchBookingOfUser());
  }, []);

  useEffect(() => {
    setUserBookings(userBookingsFromStore);
  }, [userBookingsFromStore, dispatch]);

  const studios: Studio[] = useSelector(
    (state: RootState) => state.studios.studios
  ) as Studio[];

  const formatDate = (date: string) => {
    const utcDate = new Date(
      Date.UTC(
        Number(date.slice(0, 4)),
        Number(date.slice(5, 7)) - 1,
        Number(date.slice(8, 10)) + 1
      )
    );
    return utcDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="w-full p-4 min-h-[85vh] mt-20 bg-[#454243]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[#FFA987] font-bold text-4xl py-8">
            Reservations
          </h1>
          <CustomButton onClick={() => window.history.back()}>
            <FaChevronLeft className="text-white" />
            Back
          </CustomButton>
        </div>

        <div className="space-y-4 flex flex-col gap-4">
          {sortedBookings &&
            sortedBookings.map((booking: Booking) => {
              const studio: Studio = studios.find(
                (studio: Studio) => studio.id === booking.studioID
              ) as Studio;

              return (
                <Card
                  key={booking.id}
                  className={`overflow-hidden ${
                    booking.status === "COMPLETED" ||
                    booking.status === "CANCELED"
                      ? "opacity-60" // Hace el card más opaco
                      : "opacity-100" // Mantiene la opacidad normal
                  }`}
                  data-cy="booking-item"
                >
                  <CardContent className="p-6">
                    <div className="text-md text-gray-600 font-semibold">
                      <span data-cy="booking-date">
                        {formatDate(booking.date)} •{" "}
                      </span>
                      From {booking.startTime.slice(0, 5)} to{" "}
                      {booking.endTime.slice(0, 5)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 mt-2">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100">
                          <Avatar
                            alt="Studio Logo"
                            src={`${studio.profileImage}`}
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                            className="hidden "
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{studio.studioName}</h3>
                          <p className="text-sm text-red-500 font-semibold">
                            {
                              studio.studioSpecialties.find(
                                (specialty: StudioSpecialty) =>
                                  specialty.specialty.id === booking.specialtyID
                              )?.specialty.specialtyName
                            }
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold">
                          {Number(booking?.totalPrice).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                        <div className="flex justify-end items-center gap-1 text-sm">
                          {booking.status === "CONFIRMED" ? (
                            <>
                              <span className="text-green-600">Confirmed</span>
                              <CalendarCheck className="w-4 h-4 text-green-600" />
                            </>
                          ) : booking.status === "COMPLETED" ? (
                            <>
                              <span className="text-green-600">Completed</span>
                              <Check className="w-4 h-4 text-green-600" />
                            </>
                          ) : booking.status === "CANCELLED" ? (
                            <>
                              <span className="text-red-600">Canceled</span>
                              <X className="w-4 h-4 text-red-600" />
                            </>
                          ) : null}
                        </div>
                        {booking.status === "CONFIRMED" && (
                          <Button
                            onClick={() => handleCancelReservation(booking.id)}
                            className="mt-4"
                          >
                            Cancel Reservation
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </section>
  );
}
