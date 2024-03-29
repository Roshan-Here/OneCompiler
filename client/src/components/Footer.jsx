import React from 'react'

function Footer() {
    const d = new Date()
    let year = d.getFullYear()
  return (
    <footer className="footer footer-center p-6 bg-base-300 text-base-content bg-gray-900 mb-9">
      <aside>
        <p>Copyright © {year} - All right reserved by OneCompiler</p>
      </aside>
    </footer>
  )
}

export default Footer
