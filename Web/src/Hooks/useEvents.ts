import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEvents, getEvents } from "../API/AdminApi";
import type { Event } from "../Types/Events";

type CreateEventData = Omit<Event, "event_id">;

export function useEvents() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["Events"],
    queryFn: getEvents,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const AddMutation = useMutation({
    mutationFn: addEvents,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Events"],
      });
    },
  });

  const addEvent = (data: CreateEventData) => {
    console.log("here");
    AddMutation.mutate({
      event_name: data.event_name,
      event_description: data.event_description,
      event_type: data.event_type,
      event_imgLink: data.event_image,
      event_duration: data.event_duration,
      released_at: data.released_at,
      min_age: data.min_age,
      genre: data.genere,
      language: data.language,
    });
  };

  return { isLoading, error, data, addEvent, isAdding: AddMutation.isPending };
}
