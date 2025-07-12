const Footer = () => (
  <footer className="bg-base-200 text-base-content py-8 px-4 md:px-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="font-bold text-lg">CourtMate</h3>
        <p>Your premier sports booking hub.</p>
      </div>
      <div>
        <h4 className="font-semibold">Contact</h4>
        <p>Email: info@courtmate.com</p>
        <p>Phone: +880 123 456 789</p>
      </div>
      <div>
        <h4 className="font-semibold">Follow Us</h4>
        <div className="flex gap-4 mt-2">
          <a href="#"><i className="text-xl fab fa-facebook"></i></a>
          <a href="#"><i className="text-xl fab fa-twitter"></i></a>
          <a href="#"><i className="text-xl fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </footer>
)
export default Footer
