import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Loading from '@component/loading'
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@page/Home'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>,
    loader: Loading,
  },
  {
    path: '*',
    element: <Suspense fallback={<Loading />}>
      <Navigate to="/" replace />
    </Suspense>,
    loader: Loading
  }
])

export default router