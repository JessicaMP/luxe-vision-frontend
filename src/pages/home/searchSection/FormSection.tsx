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
import { selectSpecialties } from "@/selectors/studioSelector";
import { StudioSpecialty } from "@/types";
import { useEffect, useMemo, useState } from "react";
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
    selectSpecialties
  ) as StudioSpecialty[];

  const [specialties, setSpecialties] = useState<string[]>([]);

  useEffect(() => {
    const specialtyNames = specialtiesFromStore.map(
      (specialty: any) => specialty.specialtyName
    );
    setSpecialties(specialtyNames);
  }, [specialtiesFromStore]);

  const formSchema = z.object({
    specialty: z
      .string()
      .min(5, "Specialty must be at least 5 characters.")
      .max(40, "Specialty must be at most 40 characters.")
      .refine((val) => specialties.includes(val), {
        message: "Please select a valid specialty.",
      }),
    startTime: z.string().min(3, "Please select a start time."),
    endTime: z.string().min(3, "Please select an end time."),
    date: z.date().min(new Date("1900-01-01"), "Please select a date"),
  });

  const [open, setOpen] = useState(false);

  const fixedTimeSlots = useMemo(
    () => generateFixedTimeSlots("06:00", "23:00"),
    []
  );

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSearch(values);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialty: "",
      startTime: "",
      endTime: "",
      date: new Date("1111-11-11"),
    },
  });

  return (
    <>
      <div className=" py-10 flex flex-col items-center justify-center bg-[#444243] rounded-[20px] max-sm:w-full md:w-[65vw] 2xl:w-[50vw] ">
        <h3 className="text-white text-lg sm:text-xl md:text-2xl mb-6 font-bold ">
          Find the photographer you need
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col lg:grid max-lg:grid-cols-2 lg:gap-4 gap-4 min-[1028px]:w-[600px] grid-cols-2"
          >
            <FormField
              control={form.control}
              name="specialty"
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
                                "mt-12 fixed bg-white rounded-lg min-w-[300px] z-50"
                              )
                            : cn("hidden")
                        }
                      >
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Specialties">
                          {specialties.length > 0
                            ? specialties
                                .filter((specialty) =>
                                  specialty
                                    .toLowerCase()
                                    .includes(
                                      form.getValues().specialty.toLowerCase()
                                    )
                                )
                                .map((specialty) => (
                                  <CommandItem
                                    key={specialty}
                                    value={specialty}
                                    onSelect={() => {
                                      field.onChange(specialty); // Actualizar el valor seleccionado
                                      setOpen(false); // Cerrar la lista
                                    }}
                                  >
                                    {specialty}
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

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="max-h-[45px] mb-4">
                  <Popover>
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
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      timeSlots={fixedTimeSlots}
                      disabled={false}
                      placeholder="From what hours?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="max-h-[45px] mb-4">
                  <FormControl>
                    <TimeSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      timeSlots={fixedTimeSlots.filter(
                        (time) => time > (form.getValues().startTime || "")
                      )}
                      disabled={!form.getValues().startTime}
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
