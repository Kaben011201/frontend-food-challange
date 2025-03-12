import { writable } from 'svelte/store';
import data from '/src/lib/data.json';

export const desserts = writable(data);
export const result = writable({price: 0, total: 0});