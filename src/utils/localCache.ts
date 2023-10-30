import type {Receiver} from "~/utils/receivers";

export const cacheReceivers = (receivers: Receiver[]) => {
	localStorage.setItem("receivers", JSON.stringify(receivers));
}

export const getCachedReceivers = (): Receiver[] => {
	const cachedReceivers = localStorage.getItem("receivers");
	if (cachedReceivers) {
		return JSON.parse(cachedReceivers) as Receiver[];
	}
	return [];
}
