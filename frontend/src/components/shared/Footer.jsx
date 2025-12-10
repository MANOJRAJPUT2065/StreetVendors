import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-900/70">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-200">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">StreetVendors</h3>
            <p className="text-slate-300">
              Empowering local businesses through digital transformation.
            </p>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-white" href="/">Browse Vendors</a></li>
              <li><a className="hover:text-white" href="/about">About Us</a></li>
              <li><a className="hover:text-white" href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">Contact</h4>
            <p className="mt-3 text-slate-300">Email: support@streetvendors.com</p>
            <p className="text-slate-300">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-4 text-center text-slate-400">
          &copy; 2024 StreetVendors. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
