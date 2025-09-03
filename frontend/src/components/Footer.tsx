import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
        <br />
        <p>© 2025 SNDP Claim Management Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;