import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-16 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-3">TASA</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Twelve Apostles&apos; Students Association. Evolution Through Christ.
              Serving under TACC since 1993.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="text-gray-600 hover:text-blue-700 transition">About</Link></li>
              <li><Link href="/events" className="text-gray-600 hover:text-blue-700 transition">Events</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-700 transition">Contact</Link></li>
              <li><Link href="/#resources" className="text-gray-600 hover:text-blue-700 transition">Resources</Link></li>
              <li><Link href="/#blog" className="text-gray-600 hover:text-blue-700 transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/register" className="text-gray-600 hover:text-blue-700 transition">Join TASA</Link></li>
              <li><Link href="/login" className="text-gray-600 hover:text-blue-700 transition">Member Login</Link></li>
              <li><Link href="/#testimonials" className="text-gray-600 hover:text-blue-700 transition">Testimonials</Link></li>
              <li><Link href="/#branches" className="text-gray-600 hover:text-blue-700 transition">Find a Branch</Link></li>
              <li><Link href="/#gallery" className="text-gray-600 hover:text-blue-700 transition">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://x.com/tasa_int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-500 transition"
                >
                  𝕏 @tasa_int
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/tasa_int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-500 transition"
                >
                  Instagram @tasa_int
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/nationaltasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-500 transition"
                >
                  Facebook @nationaltasa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 TASA &mdash; Twelve Apostles&apos; Students Association. All rights reserved.</p>
          <p className="mt-1">Proudly serving under the Twelve Apostles&apos; Church in Christ (TACC).</p>
        </div>
      </div>
    </footer>
  );
}
