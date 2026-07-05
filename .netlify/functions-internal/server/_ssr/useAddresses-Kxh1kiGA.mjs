import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./supabase-3TxsKobz.mjs";
import { t as useAuth } from "./useAuth-QGxqvN1h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAddresses-Kxh1kiGA.js
function useAddresses() {
	const { session } = useAuth();
	const queryClient = useQueryClient();
	const userId = session?.user?.id;
	const { data: addresses = [], isLoading } = useQuery({
		queryKey: ["addresses", userId],
		queryFn: async () => {
			if (!userId) return [];
			const { data, error } = await supabase.from("addresses").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data.map((item) => ({
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
				notes: item.notes
			}));
		},
		enabled: !!userId
	});
	const addAddress = useMutation({
		mutationFn: async (address) => {
			if (!userId) throw new Error("Must be logged in");
			const { data, error } = await supabase.from("addresses").insert({
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
				notes: address.notes
			}).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
		}
	});
	const deleteAddress = useMutation({
		mutationFn: async (addressId) => {
			const { error } = await supabase.from("addresses").delete().eq("id", addressId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
		}
	});
	return {
		addresses,
		isLoading,
		addAddress: addAddress.mutateAsync,
		isAdding: addAddress.isPending,
		deleteAddress: deleteAddress.mutateAsync,
		isDeleting: deleteAddress.isPending
	};
}
//#endregion
export { useAddresses as t };
