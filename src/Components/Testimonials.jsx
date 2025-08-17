import { Star } from "lucide-react";


const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tennis Player, 3 years member",
    image: "https://i.ibb.co/99Lmx8fb/images-13.jpg",
    text: "The facilities are absolutely world-class. The tennis courts are maintained perfectly, and the coaching staff is incredibly knowledgeable. I’ve improved my game tremendously!",
  },
  {
    name: "Michael Chen",
    role: "Basketball Enthusiast, 2 years member",
    image: "https://i.ibb.co/cc87XVHL/download-18.jpg",
    text: "Amazing community and top-notch equipment. The group classes are fantastic, and I’ve made so many friends here. It’s more than just a sports club!",
  },
  {
    name: "Emma Davis",
    role: "Fitness Member, 1 year member",
    image: "https://i.ibb.co/g0xvfWN/360-F-584652599-s89ly-Uh-PSMf-X5-Ys-Rl-Ksa1-Agl-JT7v-Nio-O.jpg",
    text: "The personal training program helped me achieve goals I never thought possible. The trainers are professional, motivating, and truly care about your progress.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl text-primary font-bold mb-2">
          What Our Members Say
        </h2>
        <p className="text-gray-600 mb-12">
          Hear from our community of dedicated athletes and fitness enthusiasts
        </p>

        {/* Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-left"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 italic mb-6">"{t.text}"</p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-black">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
