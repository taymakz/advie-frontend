import {ApiResponse} from "~/models/api/ApiResponse";


export const SubmitNewsletter = (email: string): Promise<ApiResponse<null>> => {
    return FetchApi("/newsletter/submit/", {
        method: "POST",
        body: {
            email
        }
    });
};
