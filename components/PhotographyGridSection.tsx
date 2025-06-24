import Image from 'next/image';
import Link from 'next/link';

const PhotographyGridSection = () => {
  const stories = [
    {
      title: "Morocco",
      description: "A journey through the vibrant streets and landscapes of Morocco, capturing the essence of its people and culture.",
      coverImage: "/images/Morocco_girlsBike_Natgeo.jpg",
      date: "2023",
      slug: "morocco",
      previewImages: [
        "/images/Morocco_boy_Natgeo.jpg",
        "/images/Morocco_womanWall_Natgeo.jpg"
      ]
    },
    {
      title: "Indonesia",
      description: "Exploring the dramatic landscapes and natural wonders of Indonesia, from the lush jungles to pristine beaches.",
      coverImage: "/images/GardenOfTheGods.jpg",
      date: "2023",
      slug: "indonesia",
      previewImages: [
        "/images/Morocco_womanWall_Natgeo.jpg",
        "/images/Morocco_girlsBike_Natgeo.jpg"
      ]
    }
  ];

  return (
    <section id="photography" className="hidden py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 pt-20">
          <h2 className="text-4xl font-bold text-black mb-4 font-sans">
            Photography Journal
          </h2>
          <p className="text-xl text-black/80 max-w-2xl font-sans">
            A collection of stills capturing global travels and the unfolding story of a start-up winery and its passionate founders, crafting dreams from the vine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="group">
              <Link href={`/photography/${story.slug}`} className="block">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black/60 font-medium">{story.date}</span>
                      <h3 className="text-xl font-bold text-black">{story.title}</h3>
                    </div>
                    <p className="text-sm text-black/80 line-clamp-2">{story.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Instagram Button */}
        <div className="mt-24 flex justify-center">
          <a
            href="https://www.instagram.com/dsmeier/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-black/10 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram Portfolio
          </a>
        </div>
      </div>
    </section>
  );
};

export default PhotographyGridSection; 