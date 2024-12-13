import { TimeSelect } from "@/components/TimeSelect";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { RootState } from "@/store";
import { Specialty } from "@/types/specialty";

const generateFixedTimeSlots = (start: string, end: string) => {
  const startHour = parseInt(start.split(":")[0]);
  const endHour = parseInt(end.split(":")[0]);
  const slots = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const SearchSection = ({ onSearch }: { onSearch: (values: any) => void }) => {
  const specialtiesFromStore = useSelector(
    (state: RootState) => state.specialties.specialties
  ) as Specialty[];

  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  useEffect(() => {
    setSpecialties(specialtiesFromStore);
  }, [specialtiesFromStore]);

  const formSchema = z.object({
    specialtyId: z.number().min(1, "Please select a specialty."),
    specialtyName: z.string(),
    startTime: z.string().min(3, "Please select a start time."),
    endTime: z.string().min(3, "Please select an end time."),
    date: z.date().min(new Date("1900-01-01"), "Please select a date"),
  });

  const [open, setOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const roundUpToNextHour = () => {
    const now = new Date();
    if (now.getMinutes() > 0) {
      now.setHours(now.getHours() + 1);
    }
    now.setMinutes(0);

    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Format the date as YYYY-MM-DD
    const formattedDate = format(values.date, "yyyy-MM-dd");

    onSearch({
      ...values,
      specialty: specialties.find(
        (specialty) => specialty.id === values.specialtyId
      ),
      date: formattedDate,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialtyId: 0,
      specialtyName: "",
      startTime: "",
      endTime: "",
      date: new Date("1111-11-11"),
    },
  });
  const fixedTimeSlots = () => {
    try {
      const date = form.getValues("date");
      if (!date) return generateFixedTimeSlots("06:00", "23:00");

      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      if (isToday) {
        return generateFixedTimeSlots(roundUpToNextHour(), "23:00");
      }
      return generateFixedTimeSlots("06:00", "23:00");
    } catch (error) {
      console.error("Error in fixedTimeSlots:", error);
      return generateFixedTimeSlots("06:00", "23:00"); // valor por defecto
    }
  };

  // Añade watch al inicio del componente
  form.watch("startTime");

  return (
    <>
      <div className=" py-10 flex flex-col items-center justify-center bg-[#444243] rounded-[20px] max-sm:w-full md:w-[80vw] xl:w-[65vw] max-w-[800px] px-10 ">
        <h3 className="text-white text-lg sm:text-xl md:text-2xl mb-6 font-bold ">
          Find the photographer you need
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col lg:grid max-lg:grid-cols-2 lg:gap-4 gap-4 min-[1028px]:w-[600px] grid-cols-2 w-full"
          >
            {/* // Seleccion de especialidad */}
            <FormField
              control={form.control}
              name="specialtyName"
              render={({ field }) => (
                <FormItem className="min-w-[250px] max-h-[45px] mb-4">
                  <FormControl>
                    <Command className="rounded-lg border shadow-md">
                      <CommandInput
                        placeholder="Search by specialty..."
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setOpen(true);
                        }}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setTimeout(() => setOpen(false), 200)}
                        className="relative"
                      />

                      <CommandList
                        className={
                          open
                            ? cn(
                                "mt-12 absolute bg-white rounded-lg min-w-[300px] z-50"
                              )
                            : cn("hidden")
                        }
                      >
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Specialties">
                          {specialties.length > 0
                            ? specialties
                                .filter((specialty) =>
                                  specialty.specialtyName
                                    .toLowerCase()
                                    .includes(
                                      form
                                        .getValues()
                                        .specialtyName.toLowerCase()
                                    )
                                )
                                .map((specialty) => (
                                  <CommandItem
                                    key={specialty.id}
                                    value={specialty.specialtyName}
                                    onSelect={() => {
                                      form.setValue(
                                        "specialtyId",
                                        specialty.id
                                      );
                                      form.setValue(
                                        "specialtyName",
                                        specialty.specialtyName
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    {specialty.specialtyName}
                                  </CommandItem>
                                ))
                            : null}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* // Seleccion de fecha */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="max-h-[45px] mb-4">
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild className="h-full w-full">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value.getFullYear() === 1111 ? (
                            <span>Pick a date</span>
                          ) : (
                            <span>{format(field.value, "dd/MM/yyyy")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(e) => {
                          field.onChange(e);
                          setOpenCalendar(false);
                          form.setValue("startTime", "");
                          form.setValue("endTime", "");
                        }}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* // Seleccion de horarios inicio */}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="max-h-[45px] mb-4">
                  <FormControl>
                    <TimeSelect
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("endTime", "");
                      }}
                      timeSlots={fixedTimeSlots() || []}
                      disabled={false}
                      placeholder="From what hours?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* // Seleccion de horarios fin */}
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="max-h-[45px] mb-4">
                  <FormControl>
                    <TimeSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      timeSlots={(fixedTimeSlots() || []).filter(
                        (time) => time > (form.getValues().startTime || "")
                      )}
                      disabled={!form.getValues("startTime")}
                      placeholder="Until what hours?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-full px-8 bg-[#F69D7B] hover:bg-[#f38a61] text-white font-bold text-md rounded-md py-3 max-h-[45px] lg:col-span-2"
              id="specialty-search-button"
              onClick={() => {
                form.handleSubmit(handleSubmit)();
              }}
            >
              <IoMdSearch size={70} />
              Search
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SearchSection;
