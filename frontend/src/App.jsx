import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Notifications from './pages/Notifications.jsx'
import OnBoardingPage from './pages/OnBoardingPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import { Toaster } from 'react-hot-toast'
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.jsx'

const App = () => {
  const { theme } = useThemeStore()
  const { isLoading, authUser } = useAuthUser()
  const isAuthenticated = Boolean(authUser)
  const isOnBoarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />

  return (
    <div className='h-screen bg-base-100 text-base-content' data-theme={theme}>
      {/* Theme toggle (simple + clean) */}
      {/* <button onClick={() => setTheme("light")} className="btn btn-primary">
        Switch to LIGHT
      </button>

      <button onClick={() => setTheme("cupcake")} className="btn btn-secondary">
        Switch to CUPCAKE
      </button>

      <button onClick={() => setTheme("cyberpunk")} className="btn btn-accent">
        Switch to CYBERPUNK
      </button>

      <button onClick={() => setTheme("dracula")} className="btn btn-warning">
        Switch to DRACULA
      </button> */}
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/signup'
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnBoarded ? '/' : '/onboarding'} />
            )
          }
        />

        <Route
          path='/login'
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnBoarded ? '/' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/notifications'
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={true}>
                <Notifications />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />

        <Route
          path='/onboarding'
          element={
            isAuthenticated ? (
              !isOnBoarded ? (
                <OnBoardingPage />
              ) : (
                <Navigate to='/' />
              )
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route
          path='/chat/:id'
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />

        <Route
          path='/call/:id'
          element={
            isAuthenticated && isOnBoarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
