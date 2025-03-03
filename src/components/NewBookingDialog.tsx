import { Dayjs } from "dayjs";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FunctionComponent } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@/hooks/useDisclosure";

type NewBookingDialogProps = {
  startTime: Dayjs;
  endTime: Dayjs;
} & Omit<ReturnType<typeof useDisclosure>, "onOpen">;

const newBookingSchema = z.object({
  object: z.string().min(1, "Please enter a name for your event"),
});

type NewBookingFormSchema = z.infer<typeof newBookingSchema>;

export const NewBookingDialog: FunctionComponent<NewBookingDialogProps> = ({
  startTime,
  endTime,
  isOpen,
  onClose,
  onToggle,
}) => {
  const form = useForm<NewBookingFormSchema>({
    resolver: zodResolver(newBookingSchema),
    defaultValues: {
      object: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = (data: NewBookingFormSchema) => {
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New event</DialogTitle>
          <DialogDescription>
            Please choose a name for your new event.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="font-medium mb-1">Date</div>
              <div>{startTime.format("MMM D, YYYY")}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Start time</div>
              <div>{startTime.format("h:mm A")}</div>
            </div>
            <div>
              <div className="font-medium mb-1">End time</div>
              <div>{endTime.format("h:mm A")}</div>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="object"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event object</FormLabel>
                  <FormControl>
                    <Input placeholder="My new event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
