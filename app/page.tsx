import Link from 'next/link';
import NewsletterSignup from './components/NewsletterSignup';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-32"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://picsum.photos/id/1015/1920/1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-5xl md:text-7xl font-bold text-blue-700 mb-4">TASA</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Evolution Through Christ</h1>
        <p className="text-2xl md:text-3xl italic text-gray-700 my-4">
          Twelve Apostles&apos; Students Association
        </p>
        <p className="max-w-2xl text-lg md:text-2xl text-gray-700 mx-auto mb-8">
          A vibrant community of students growing together in spirit and purpose.
          Rooted in the Twelve Apostles&apos; Church in Christ (TACC) since 1993.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-yellow-400 transition"
          >
            Join TASA Now
          </Link>
          <Link
            href="/events"
            className="inline-block bg-blue-700 text-white px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-blue-800 transition"
          >
            Explore Events
          </Link>
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
            {[
              { letter: 'C', text: 'Christian Enlightenment & Spiritual Transformation' },
              { letter: 'H', text: 'Human Wellness & Morality' },
              { letter: 'R', text: 'Restoration of Peace and Unity' },
              { letter: 'I', text: 'Intensive Promotion of Education' },
              { letter: 'S', text: 'Sustainable Spiritual Development' },
              { letter: 'T', text: "Thriving in God's Love and Fellowship" },
            ].map(({ letter, text }) => (
              <div key={letter} className="flex items-start gap-6">
                <span className="text-5xl font-bold text-yellow-500 min-w-fit">{letter}</span>
                <div>
                  <strong className="text-lg text-gray-800">{text}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developmental Focus */}
      <section id="pillars" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Developmental Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Academics', desc: 'Bursaries, study groups, career guidance → Competitive graduates' },
              { title: 'Spirituality', desc: 'Revivals, Bible studies, evangelism, choir, services → God-loving citizens' },
              { title: 'Social (Ubuntu)', desc: 'Interfaith harmony, community outreach, teamwork → Peace and unity' },
              { title: 'Health Awareness', desc: 'HIV/AIDS, wellness, substance abuse education → Healthy generation' },
              { title: 'Economic Empowerment', desc: 'Entrepreneurship, financial mentoring, job support → National growth' },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center"
              >
                <h3 className="text-xl font-bold text-blue-700 mb-4">{title}</h3>
                <p className="text-gray-700 text-sm">{desc}</p>
              </div>
            ))}
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
            <p><strong>Blood</strong> – Christian teachings from the Apostles and sacrifices through tithes &amp; offerings</p>
            <p><strong>Open Hands</strong> – Acceptance and appreciation of the teachings</p>
            <p className="italic font-semibold mt-6">Chain of Unity • Peace • Love</p>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section id="whyjoin" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Why Be Part of TASA?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[
            'Spiritual transformation and growth',
            'Academic excellence & study buddies',
            'Lifelong brothers and sisters who guide you',
            'Fun yet fulfilling worship and fellowship',
            'Leadership development for campus and beyond',
          ].map((text) => (
            <div
              key={text}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition text-center"
            >
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/register"
            className="inline-block bg-yellow-500 text-gray-900 px-12 py-4 rounded-full font-bold text-xl hover:scale-105 hover:bg-yellow-400 transition"
          >
            Join TASA Today →
          </Link>
        </div>
      </section>

      {/* Weekly Activities */}
      <section id="events" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">Weekly Rhythm – Daily Activities</h2>
          <p className="text-center text-gray-600 mb-12">
            Our structured week keeps you spiritually fed, academically sharp, and socially connected.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {[
              { day: 'Mon', activity: 'Bible Studies & Cell Groups' },
              { day: 'Tue', activity: 'Worship & Music Practice' },
              { day: 'Wed', activity: 'Church Service' },
              { day: 'Thu', activity: 'Academic & Development Day' },
              { day: 'Fri', activity: 'TASA Social / Fellowship' },
              { day: 'Sat', activity: 'Evangelism & Crusades' },
              { day: 'Sun', activity: 'Church Service' },
            ].map(({ day, activity }) => (
              <div
                key={day}
                className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md hover:-translate-y-1 transition"
              >
                <div className="text-blue-700 font-bold text-lg mb-2">{day}</div>
                <p className="text-gray-700 text-sm">{activity}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
            >
              View All Upcoming Events →
            </Link>
          </div>
        </div>
      </section>

      {/* Organisational Structure */}
      <section id="structure" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Organisational Structure</h2>
        <div className="text-center max-w-3xl mx-auto text-gray-700 space-y-2">
          <div className="text-lg">
            National Conference → National Executive Committee → Provincial Executive Committees → Branch Executive Committees → Members
          </div>
          <div className="text-sm mt-4 text-gray-500">
            Supported by: Educational Fund Committee | Alumni Committee | Resource Mobilization Committee
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Testimonials</h2>
          <p className="text-gray-600 mb-10">Hear from students whose lives have been transformed through TASA.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="bg-white rounded-xl p-8 shadow-lg text-left">
              <p className="text-gray-700 italic mb-4">
                &ldquo;TASA gave me a spiritual family on campus when I felt alone. I graduated with distinction
                while growing deeper in faith.&rdquo;
              </p>
              <footer className="text-blue-700 font-semibold">— Former member, UWC</footer>
            </blockquote>
            <blockquote className="bg-white rounded-xl p-8 shadow-lg text-left">
              <p className="text-gray-700 italic mb-4">
                &ldquo;The leadership training through TASA shaped who I am today as a professional and as a
                servant of God.&rdquo;
              </p>
              <footer className="text-blue-700 font-semibold">— TASA alumni, Gauteng</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Branches placeholder */}
      <section id="branches" className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Branches Across South Africa</h2>
        <p className="text-gray-600 mb-8">
          With branches in all major provinces and internationally, there is a TASA community near you.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State'].map(
            (province) => (
              <div key={province} className="bg-white rounded-xl p-4 shadow border border-gray-100 text-sm font-medium text-gray-700">
                {province}
              </div>
            )
          )}
        </div>
        <p className="text-gray-500 text-sm">Full branch directory with contacts coming soon.</p>
      </section>

      {/* Gallery placeholder */}
      <section id="gallery" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Gallery</h2>
          <p className="text-gray-600 mb-10">Moments from conferences, worship, outreach, sports, and fellowship.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1015, 1016, 1018, 1019, 1020, 1021].map((id) => (
              <div
                key={id}
                className="aspect-video rounded-xl overflow-hidden bg-gray-200 shadow"
                style={{
                  backgroundImage: `url(https://picsum.photos/id/${id}/600/400)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label="Gallery image"
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-6">Full photo gallery with albums coming soon.</p>
        </div>
      </section>

      {/* Resources placeholder */}
      <section id="resources" className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Resources</h2>
        <p className="text-gray-600 mb-8">
          Devotionals, Bible study guides, academic support, health awareness, and financial literacy — all in one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Devotionals', desc: 'Daily reflections and spiritual growth materials' },
            { title: 'Academic Support', desc: 'Study guides, career resources, bursary info' },
            { title: 'Health & Wellness', desc: 'HIV awareness, mental health, and wellness guides' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <h3 className="font-bold text-blue-700 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-6">Full resources library coming soon.</p>
      </section>

      {/* Blog placeholder */}
      <section id="blog" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Blog & Articles</h2>
          <p className="text-gray-600 mb-10">
            Insights on faith, academics, leadership, and student life from TASA community voices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Building a Uniform TASA Identity', category: 'Leadership' },
              { title: 'Faith & Academics: Finding Balance', category: 'Faith & Spirituality' },
              { title: 'Leadership Lessons from the Apostles', category: 'Leadership' },
            ].map(({ title, category }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow text-left hover:shadow-md transition">
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">{category}</span>
                <h3 className="font-bold text-gray-800 mt-2 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm">Full blog platform coming soon.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </>
  );
}
