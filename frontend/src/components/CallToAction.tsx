import { Phone, Mail } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="w-full bg-gradient-to-r from-yellow-500 to-gray-900 py-16 px-6">
      <div className="text-center max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to start ?
        </h2>
        {/* Subtitle */}
        <p className="mt-3 text-lg text-gray-200">
          Join the hundreds of managers who trust our platform to manage their
          claims
        </p>
      </div>

      {/* Cards container */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Phone Card */}
        <div className="bg-white/80 rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
          <div className="bg-yellow-500 p-3 rounded-full mb-4">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Phone Number</h3>
          <p className="mt-2 text-gray-600">
            Available 24/7 for your emergencies
          </p>
          <a
            href="tel:+21670284500"
            className="mt-3 text-lg font-bold text-black hover:underline"
          >
            +216 70 284 500
          </a>
        </div>

        {/* Email Card */}
        <div className="bg-white/80 rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
          <div className="bg-yellow-500 p-3 rounded-full mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">E-mail</h3>
          <p className="mt-2 text-gray-600">
            Guaranteed response within 24 hours
          </p>
          <a
            href="mailto:boc@agil.com.tn"
            className="mt-3 text-lg font-bold text-black hover:underline"
          >
            boc@agil.com.tn
          </a>
        </div>
      </div>
    </section>
  );
}
