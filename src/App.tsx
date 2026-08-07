import BenefitsBar from './components/BenefitsBar'
import CartDrawer from './components/CartDrawer'
import FeaturedCollection from './components/FeaturedCollection'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import MobileMenu from './components/MobileMenu'
import QuickViewModal from './components/QuickViewModal'
import RoomCategories from './components/RoomCategories'
import RoomInspiration from './components/RoomInspiration'
import SearchOverlay from './components/SearchOverlay'
import Shop from './components/Shop'
import Toasts from './components/Toasts'
import WishlistDrawer from './components/WishlistDrawer'

function App() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <Hero />
        <div className="divider" aria-hidden="true" />
        <RoomCategories />
        <FeaturedCollection />
        <RoomInspiration />
        <BenefitsBar />
        <Shop />
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <Toasts />
    </>
  )
}

export default App
