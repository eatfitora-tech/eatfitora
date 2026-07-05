import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Address as StoreAddress } from "@/store/useStore";

// Type that matches our frontend StoreAddress exactly
export type Address = StoreAddress;

export function useAddresses() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["addresses", userId],
    queryFn: async (): Promise<Address[]> => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Map database snake_case to frontend camelCase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.map((item: any) => ({
        id: item.id,
        fullName: item.full_name,
        phone: item.phone,
        house: item.house,
        street: item.street,
        area: item.area,
        landmark: item.landmark,
        city: item.city,
        state: item.state,
        pincode: item.pincode,
        notes: item.notes,
      }));
    },
    enabled: !!userId,
  });

  const addAddress = useMutation({
    mutationFn: async (address: Omit<Address, "id">) => {
      if (!userId) throw new Error("Must be logged in");

      const { data, error } = await supabase
        .from("addresses")
        .insert({
          user_id: userId,
          full_name: address.fullName,
          phone: address.phone,
          house: address.house,
          street: address.street,
          area: address.area,
          landmark: address.landmark,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          notes: address.notes,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
    },
  });

  const deleteAddress = useMutation({
    mutationFn: async (addressId: string) => {
      const { error } = await supabase.from("addresses").delete().eq("id", addressId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
    },
  });

  return {
    addresses,
    isLoading,
    addAddress: addAddress.mutateAsync,
    isAdding: addAddress.isPending,
    deleteAddress: deleteAddress.mutateAsync,
    isDeleting: deleteAddress.isPending,
  };
}
