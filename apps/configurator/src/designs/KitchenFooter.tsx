import logo from './assets/casen-logo.svg';
import s from './KitchenPage.module.css';

export function KitchenFooter() {
  return <footer id="site-footer" className={s.footer}>
    <div className={s.footerMain}><div><a href="https://casen-doors.com/" target="_blank" rel="noreferrer"><img src={logo} alt="Casen Doors" /></a><p>Doors and spaces.<br />Considered in every detail.</p></div>
      <nav aria-label="Explore Casen Doors"><h3>Explore</h3><a href="#concept-configure">Kitchens</a><a href="https://casen-doors.com/collections/all-doors" target="_blank" rel="noreferrer">All doors</a><a href="#features">Materials & specifications</a><a href="#faq">Frequently asked questions</a></nav>
      <div><h3>Let’s talk about your space</h3><p>Share your ideas with the Casen Doors team.</p><a className={s.outlineButton} href="https://casen-doors.com/pages/contact" target="_blank" rel="noreferrer">Contact us <span aria-hidden="true">↗</span></a></div>
    </div>
    <div className={s.footerBottom}><span>© {new Date().getFullYear()} Casen Doors</span><nav aria-label="Store policies"><a href="https://casen-doors.com/policies/privacy-policy" target="_blank" rel="noreferrer">Privacy policy</a><a href="https://casen-doors.com/policies/terms-of-service" target="_blank" rel="noreferrer">Terms & conditions</a><a href="https://casen-doors.com/policies/shipping-policy" target="_blank" rel="noreferrer">Shipping policy</a><a href="https://casen-doors.com/pages/contact" target="_blank" rel="noreferrer">Contact</a></nav></div>
  </footer>;
}
