import type { GetRequest } from "../types/types";

export async function getItem(request: GetRequest) {
    const response = await fetch(request.url + '&apiKey=FkWqVMJsI09MUDdKC2T50_Mq8IxNCzRR');
    
    if(response.status === 429) {
        alert('Send to many requests through Polygons free API Tier. Please wait a minute :)')
    }
    return response.json();

}