import type { GetRequest } from "../types/types";

/**
 * 
 * @param request fetch GET endpoint 
 * @returns parsed Response Object
 */
export async function getItem(request: GetRequest) {
    const response = await fetch(request.url + `&apiKey=${import.meta.env.VITE_API_KEY}`);
    
    if(response.status === 429) {
        alert('Send to many requests through Polygons free API Tier. Please wait a minute :)')
    }
    return response.json();

}