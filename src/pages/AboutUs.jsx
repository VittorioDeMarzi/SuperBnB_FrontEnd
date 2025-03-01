import { Link } from "react-router-dom";

export default function AboutUs() {
    return (
        <>
            
            <section className="min-h-screen p-12">
                <h1 className="text-ocra text-5xl p-5">Welcome to SuperBnB</h1>
                <h2 className="text-ocra text-2xl mb-3 p-2">Our Unique Offering</h2>
                <p className="mb-5">SuperBnB specializes in long-term rentals in carefully curated apartments across European capitals. Whether you're a digital nomad, a seasoned expatriate, or simply looking to immerse yourself in a new culture, we provide the perfect home base for your extended stay.</p>

                <h2 className="text-ocra text-2xl mb-3 p-2">More Than Just Accommodation</h2>
                <p className="mb-5">We understand that when you're staying somewhere for months, you need more than just a place to sleep. Our apartments are thoughtfully selected and equipped to be your home away from home. Each space is designed to offer comfort, functionality, and a genuine local experience.</p>

                <h2 className="text-ocra text-2xl mb-3 p-2">Embracing Sustainability</h2>
                <p className="mb-5">What sets us apart is our unwavering commitment to sustainability. Every apartment in our collection is chosen not just for its prime location and comfort, but also for its eco-friendly features. By choosing SuperBnB, you're not just selecting a place to stay – you're making a choice that aligns with a more sustainable future.</p>

                <p className="mb-5">Join us on this journey to explore Europe's capitals in a way that's comfortable for you and kinder to our planet. Welcome to SuperBnB – where long-term stays meet long-term thinking.</p>

                {/* Disclaimer Section */}
                <section className="bg-yellow-200 text-yellow-900 p-6 mt-12 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-3">⚠️ Important Disclaimer</h3>
                    <p className="mb-3">SuperBnB is a **demo project** created for educational and development purposes. The listings on this site are **fictional** and not real apartments available for rent. No actual bookings or payments can be made through this website.</p>
                    <p className="mb-3">This platform is built to demonstrate a booking system, not to provide real rental services. We do not process any personal data or payment information. Any interactions on the site are purely for demonstration purposes and will not result in any real transactions.</p>
                    <p className="mb-3">If you have any questions or concerns, please feel free to contact us. Thank you for exploring SuperBnB!</p>
                    <Link to="/disclaimer" className="underline font-bold text-yellow-700 hover:text-yellow-800">Read Full Disclaimer</Link>
                </section>
            </section>
        </>
    );
}
