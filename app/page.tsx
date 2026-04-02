'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior for navigation
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', handleNavClick as any);
    });

    return () => {
      document.querySelectorAll('nav a').forEach(link => {
        link.removeEventListener('click', handleNavClick as any);
      });
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 bg-white shadow-md z-100 border-b border-gray-200">
        <ul className="flex justify-center flex-wrap gap-6 py-4 px-4 max-w-7xl mx-auto">
          <li><a href="#home" className="text-gray-800 font-semibold hover:text-blue-700 transition">Home</a></li>
          <li><a href="#about" className="text-gray-800 font-semibold hover:text-blue-700 transition">About</a></li>
          <li><a href="#events" className="text-gray-800 font-semibold hover:text-blue-700 transition">Events</a></li>
          <li><a href="#testimonials" className="text-gray-800 font-semibold hover:text-blue-700 transition">Testimonials</a></li>
          <li><a href="#branches" className="text-gray-800 font-semibold hover:text-blue-700 transition">Branches</a></li>
          <li><a href="#gallery" className="text-gray-800 font-semibold hover:text-blue-700 transition">Gallery</a></li>
          <li><a href="#resources" className="text-gray-800 font-semibold hover:text-blue-700 transition">Resources</a></li>
          <li><a href="#blog" className="text-gray-800 font-semibold hover:text-blue-700 transition">Blog</a></li>
          <li><a href="#contact" className="text-gray-800 font-semibold hover:text-blue-700 transition">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-32"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://picsum.photos/id/1015/1920/1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-5xl md:text-7xl font-bold text-blue-700 mb-4">TASA</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Evolution Through Christ</h1>
        <p className="text-2xl md:text-3xl italic text-gray-700 my-4">Twelve Apostles&apos; Students Association</p>
        <p className="max-w-2xl text-lg md:text-2xl text-gray-700 mx-auto mb-8">
          A vibrant community of students growing together in spirit and purpose.
          Rooted in the Twelve Apostles&apos; Church in Christ (TACC) since 1993.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://mytasa.org/#join" className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-white transition">
            Join TASA Now
          </a>
          <a href="#events" className="inline-block bg-blue-700 text-white px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-blue-800 transition">
            Explore Events
          </a>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 px-4 max-w-6xl mx-auto bg-white">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Who We Are</h2>
        <p className="text-center max-w-3xl mx-auto text-lg text-gray-700 mb-20">
          Established by divine revelation in 1993 and officially registered in 1995 at the University of Western Cape.
          Today TASA is international, open to all students with no prejudice of background or affiliation.
          We serve under the leadership of the Twelve Apostles&apos; Church in Christ while being student-driven.
        </p>

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12 mt-20">Vision • Mission • Motto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Vision</h3>
            <p className="text-gray-700">
              To be the Mass Based Christian Association of Choice in Institutions of Higher Learning.
              <br />
              <strong>Matthew 28:19</strong>
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Mission</h3>
            <p className="text-gray-700">
              Value-adding and comprehensive Spiritual, Social, Economic and Academic development to students and communities.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Motto</h3>
            <p className="text-gray-700">
              <strong>Evolution Through Christ</strong>
              <br />
              <em>Philippians 4:13</em>
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Our CHRIST Values</h2>
        <div className="bg-white rounded-xl p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <span className="text-5xl font-bold text-yellow-500 min-w-fit">C</span>
              <div>
                <strong className="text-lg text-gray-800">Christian Enlightenment & Spiritual Transformation</strong>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-5xl font-bold text-yellow-500 min-w-fit">H</span>
              <div>
                <strong className="text-lg text-gray-800">Human Wellness & Morality</strong>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-5xl font-bold text-yellow-500 min-w-fit">R</span>
              <div>
                <strong className="text-lg text-gray-800">Restoration of Peace and Unity</strong>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-5xl font-bold text-yellow-500 min-w-fit">I</span>
              <div>
                <strong className="text-lg text-gray-800">Intensive Promotion of Education</strong>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-5xl font-bold text-yellow-500 min-w-fit">S</span>
              <div>
                <strong className="text-lg text-gray-800">Sustainable Spiritual Development</strong>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-5xl font-bold text-yellow-500 min-w-fit">T</span>
              <div>
                <strong className="text-lg text-gray-800">Thriving in God&apos;s Love and Fellowship</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developmental Focus */}
      <section id="pillars" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Developmental Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Academics</h3>
              <p className="text-gray-700">Bursaries, study groups, career guidance → Competitive graduates</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Spirituality</h3>
              <p className="text-gray-700">Revivals, Bible studies, evangelism, choir, services → God-loving citizens</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Social (Ubuntu)</h3>
              <p className="text-gray-700">Interfaith harmony, community outreach, teamwork → Peace and unity</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Health Awareness</h3>
              <p className="text-gray-700">HIV/AIDS, wellness, substance abuse education → Healthy generation</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Economic Empowerment</h3>
              <p className="text-gray-700">Entrepreneurship, financial mentoring, job support → Contributors to national growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emblem Section */}
      <section className="py-20 px-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">The Meaning of Our Emblem</h2>
          <div className="space-y-4 text-gray-700 text-center">
            <p><strong>Gold Chain</strong> – Unity, peace and love that binds us together</p>
            <p><strong>Red Cross</strong> – Source of our responsibilities and life</p>
            <p><strong>Blood</strong> – Christian teachings from the Apostles and sacrifices through tithes & offerings</p>
            <p><strong>Open Hands</strong> – Acceptance and appreciation of the teachings</p>
            <p className="italic font-semibold mt-6">Chain of Unity • Peace • Love</p>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section id="whyjoin" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Why Be Part of TASA?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
            <p className="text-gray-700">Spiritual transformation and growth</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
            <p className="text-gray-700">Academic excellence & study buddies</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
            <p className="text-gray-700">Lifelong brothers and sisters who guide you</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
            <p className="text-gray-700">Fun yet fulfilling worship and fellowship</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center">
            <p className="text-gray-700">Leadership development for campus and beyond</p>
          </div>
        </div>
        <div className="text-center">
          <a href="https://mytasa.org/#join" className="inline-block bg-yellow-500 text-gray-900 px-12 py-4 rounded-full font-bold text-xl hover:scale-105 hover:bg-white transition">
            Join TASA Today →
          </a>
        </div>
      </section>

      {/* Weekly Activities */}
      <section id="events" className="py-20 px-4 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Weekly Rhythm – Daily Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition">Monday – Bible Studies & Cell Groups</div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition">Tuesday – Worship & Music Practice</div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition">Wednesday – Church Service</div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition">Thursday – Academic & Development Day</div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition">Friday – TASA Social / Fellowship</div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition">Saturday – Evangelism & Crusades</div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition">Sunday – Church Service</div>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section id="structure" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Organisational Structure</h2>
        <div className="text-center max-w-3xl mx-auto text-gray-700 space-y-2">
          <div>National Conference → National Executive Committee → Provincial Executive Committees → Branch Executive Committees → Members</div>
          <div className="text-sm mt-4">Supported by: Educational Fund Committee | Alumni Committee | Resource Mobilization Committee</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-800 py-16 px-4 text-center border-t border-gray-200">
        <p className="text-xl font-bold mb-2">TASA — Twelve Apostles&apos; Students Association</p>
        <p className="mb-6">Proudly serving under the Twelve Apostles&apos; Church in Christ (TACC)</p>
        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          <a href="https://x.com/tasa_int" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 font-semibold">
            𝕏 @tasa_int
          </a>
          <a href="https://instagram.com/tasa_int" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 font-semibold">
            Instagram @tasa_int
          </a>
          <a href="https://facebook.com/nationaltasa" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 font-semibold">
            Facebook @nationaltasa
          </a>
        </div>
        <p>&copy; 2026 TASA. All rights reserved. | <a href="#home" className="text-yellow-500 hover:text-yellow-400">Home</a></p>
      </footer>
    </>
  );
}
