import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
const url = "http://localhost:3001/speakit/";


export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl: url}),
    endpoints: (builder)=> ({
        getIfFollowingUser: builder.mutation({
            query: (reqbody)=> ({
                url: "checkFollowStatus",
                method: "POST",
                body: ReportBody,
            })
        })
    })

})