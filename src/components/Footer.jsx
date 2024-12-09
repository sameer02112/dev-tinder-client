import React from 'react'

const Footer = () => {
  return (
    <footer className="footer flex justify-center bg-base-200 text-neutral-content items-center p-4 fixed bottom-0">
      <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    </footer>
  );
}

export default Footer