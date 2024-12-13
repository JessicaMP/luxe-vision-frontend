import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { QuoteDTO } from "@/types/quote";
import { Avatar } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { StudioFeature } from "@/types/studio";
import { Icon } from "@iconify/react/dist/iconify.js";
import { BookingDTO } from "@/types/bookings";
import { makeBooking } from "@/reducers/bookingReducer";
import { SuccessModal } from "@/components/pages/bookings/modals/SuccessModal";
import { ErrorModal } from "@/components/pages/bookings/modals/ErrorModal";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  specialRequests: string;
}

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quote = useSelector(
    (state: RootState) => state.bookings.quote
  ) as QuoteDTO;

  useEffect(() => {
    const checkQuote = () => {
      if (!quote || Object.keys(quote).length === 0 || !quote.studio) {
        console.log("No quote data, redirecting...");
        navigate("/");
      } else {
        setIsLoading(false);
      }
    };

    checkQuote();
  }, [quote, navigate]);

  // Si no hay quote válido, no renderizamos nada
  if (!quote || Object.keys(quote).length === 0 || !quote.studio) {
    return null;
  }

  const user = useSelector((state: RootState) => state.users.user);
  const studio = quote.studio;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    specialRequests: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data: BookingDTO = {
      date: quote.date,
      startTime: quote.startTime,
      endTime: quote.endTime,
      studioID: quote.studio.id,
      specialtyID: quote.specialty.id,
      // TODO Preguntar a jere si agregaremos los comentarios
      // specialRequests: formData.specialRequests,
    };

    try {
      const resultAction = await dispatch(makeBooking(data));
      if (makeBooking.fulfilled.match(resultAction)) {
        setShowSuccessModal(true);
      } else {
        setErrorMessage(resultAction.error.message || "Booking failed");
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = () => {
    const totalTime = quote.totalHours;
    if (totalTime === 0) return "Select hours";

    const hours = Math.floor(totalTime);
    const minutes = Math.round((totalTime - hours) * 60);

    if (minutes === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minutes`;
  };

  const formatTotal = () => {
    return Number(
      quote.costPerHour * parseFloat(quote.totalHours)
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="min-h-[90svh] bg-gray-50 p-4 md:p-8 flex justify-center items-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-red-500">
            Confirm reservation
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              window.history.back();
            }}
            className="text-gray-600"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar
                  alt={studio.studioName}
                  src={`${studio.profileImage}?t=${studio.lastUpdate}`}
                  sx={{
                    "--Avatar-size": { xs: "90px", md: "170px" },
                  }}
                />
                <div>
                  <h2 className="text-xl font-semibold">{studio.studioName}</h2>
                  <p className="text-red-500">
                    {quote.specialty.specialtyName}
                  </p>
                  <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-6 gap-4 md:max-w-xl py-8">
                    {studio.studioFeatures?.length > 0 &&
                      studio.studioFeatures.map(
                        ({ feature }: StudioFeature) => (
                          <div
                            key={feature.id}
                            className="flex gap-2 items-center"
                          >
                            {feature.icon && (
                              <Icon icon={feature.icon} className="w-6 h-6" />
                            )}
                            <span className="text-sm">
                              {feature.featureName}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Your details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name:</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name:</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail:</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">
                    Special requests to the photography studio:
                  </Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          <div
            className="flex flex-col justify-between gap-4"
            data-cy="quote-reservation"
          >
            <Card className="py-8">
              <CardHeader>
                <CardTitle>Your reservation details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between">
                  <span className="font-medium">Specialty:</span>
                  <span>{quote.specialty.specialtyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{formatDate(quote.date.toString())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Hours:</span>
                  <span>
                    From {quote.startTime} to {quote.endTime}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="py-8">
              <CardHeader>
                <CardTitle>Pricing Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between">
                  <span className="font-medium">Total hours:</span>
                  <span>{formatTime()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Cost per hour:</span>
                  <span>
                    {quote.costPerHour?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatTotal()}</span>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-red-500 hover:bg-red-600"
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm reservation"
              )}
            </Button>
          </div>
        </div>

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          bookingDetails={{
            date: formatDate(quote.date.toString()),
            time: quote.startTime,
            duration: formatTime(),
            studioName: studio.studioName,
            specialty: quote.specialty.specialtyName,
          }}
        />

        <ErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
