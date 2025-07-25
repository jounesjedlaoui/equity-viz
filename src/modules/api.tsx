import type { GetRequest } from "../types/types";

export async function getItem(request: GetRequest) {
    const response = await fetch(request.url + '&apiKey=FkWqVMJsI09MUDdKC2T50_Mq8IxNCzRR');
    
    return response.json();

}