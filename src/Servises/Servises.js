import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Servises = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: ({ page = 1 }) => `articles?limit=10&offset=${(page - 1) * 10}`,
        }),
        getArticle: builder.query({
            query: (slug) => `articles/${slug}`,
        }),
        updateArticle: builder.mutation({
            query: ({ slug, article, token }) => ({
                url: `articles/${slug}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: { article },
            }),
        }),
        deleteArticle: builder.mutation({
            query: ({ slug, token }) => ({
                url: `articles/${slug}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
})

export const { useGetArticlesQuery, useGetArticleQuery, useUpdateArticleMutation, useDeleteArticleMutation } = Servises
